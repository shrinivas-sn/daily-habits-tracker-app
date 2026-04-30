import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Plus, Check, Flame } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [loading, setLoading] = useState(true);

  const todayStr = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    fetchHabits();
  }, [currentUser]);

  async function fetchHabits() {
    if (!currentUser) return;
    try {
      const q = query(collection(db, 'prd_habits'), where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const habitsData = [];
      querySnapshot.forEach((doc) => {
        habitsData.push({ id: doc.id, ...doc.data() });
      });
      setHabits(habitsData);
    } catch (error) {
      console.error('Error fetching habits:', error);
    } finally {
      setLoading(false);
    }
  }

  function calculateStreak(completions) {
    if (!completions || completions.length === 0) return 0;
    
    // Sort completions descending
    const sorted = [...completions].sort((a, b) => new Date(b) - new Date(a));
    let streak = 0;
    let currentDate = new Date();
    
    // Reset to start of day for accurate day difference
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < sorted.length; i++) {
      const compDate = new Date(sorted[i]);
      compDate.setHours(0, 0, 0, 0);
      
      const diff = differenceInDays(currentDate, compDate);
      
      if (diff === 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (diff === 1) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break; // Streak broken
      }
    }
    return streak;
  }

  async function addHabit(e) {
    e.preventDefault();
    if (!newHabit.trim()) return;
    
    try {
      const docRef = await addDoc(collection(db, 'prd_habits'), {
        name: newHabit,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        completions: [],
      });
      setHabits([...habits, { id: docRef.id, name: newHabit, userId: currentUser.uid, completions: [] }]);
      setNewHabit('');
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  }

  async function toggleHabit(habit) {
    const isCompletedToday = habit.completions?.includes(todayStr);
    let newCompletions = [];
    
    if (isCompletedToday) {
      newCompletions = habit.completions.filter(date => date !== todayStr);
    } else {
      newCompletions = [...(habit.completions || []), todayStr];
    }

    try {
      const habitRef = doc(db, 'prd_habits', habit.id);
      await updateDoc(habitRef, {
        completions: newCompletions
      });
      
      setHabits(habits.map(h => {
        if (h.id === habit.id) {
          return { ...h, completions: newCompletions };
        }
        return h;
      }));
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  }

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Your Daily Habits</h1>
        <p className="text-slate-400 mt-2">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
      </header>

      <form onSubmit={addHabit} className="flex gap-4">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="e.g., Drink 8 glasses of water"
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button 
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Habit</span>
        </button>
      </form>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : habits.length === 0 ? (
        <div className="text-center py-12 bg-slate-800 rounded-2xl border border-slate-700 border-dashed">
          <p className="text-slate-400">No habits added yet. Start by adding one above!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {habits.map(habit => {
            const isCompletedToday = habit.completions?.includes(todayStr);
            const currentStreak = calculateStreak(habit.completions);
            
            return (
              <div 
                key={habit.id} 
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isCompletedToday ? 'bg-indigo-500/10 border-indigo-500/50' : 'bg-slate-800 border-slate-700 hover:border-slate-600'}`}
              >
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleHabit(habit)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isCompletedToday ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-transparent hover:bg-slate-600'}`}
                  >
                    <Check size={16} />
                  </button>
                  <span className={`text-lg ${isCompletedToday ? 'text-indigo-200 line-through' : 'text-slate-200'}`}>
                    {habit.name}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {currentStreak > 0 && (
                    <div className="flex items-center gap-1 text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full text-sm font-medium">
                      <Flame size={16} />
                      {currentStreak} day streak
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
