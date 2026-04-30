import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { Plus, Check, Flame } from 'lucide-react';

export default function Dashboard({ user }) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [habits, setHabits] = useState([]);
  const [loadingHabits, setLoadingHabits] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'story_habits'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
      setHabits(data.sort((a,b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()));
      setLoadingHabits(false);
    });
    return unsubscribe;
  }, [user.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'story_habits'), {
        title: title,
        userId: user.uid,
        streak: 0,
        completedDates: [],
        createdAt: serverTimestamp()
      });
      setTitle('');
      setMessage('Habit saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage('Failed to add habit.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = async (habit) => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const isCompleted = habit.completedDates?.includes(todayStr);

    let newDates = [];
    let newStreak = habit.streak || 0;

    if (isCompleted) {
      newDates = habit.completedDates.filter(d => d !== todayStr);
      newStreak = Math.max(0, newStreak - 1);
    } else {
      newDates = [...(habit.completedDates || []), todayStr];
      newStreak += 1;
    }

    try {
      await updateDoc(doc(db, 'story_habits', habit.id), {
        completedDates: newDates,
        streak: newStreak
      });
    } catch (err) {
      console.error("Error updating habit:", err);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-2xl mx-auto mt-8">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-800">My Habits</h1>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
          <button 
            onClick={() => signOut(auth)}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Create a New Habit</h2>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='e.g., "Read 10 pages"'
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              disabled={isSubmitting}
            />
            <button 
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus size={20} />
              <span>Add</span>
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-emerald-600 font-medium">{message}</p>}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Today's Goals</h2>
          {loadingHabits ? (
            <p className="text-slate-500">Loading habits...</p>
          ) : habits.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No habits yet. Create one above!</p>
          ) : (
            <div className="space-y-3">
              {habits.map(habit => {
                const isCompletedToday = habit.completedDates?.includes(todayStr);
                return (
                  <div key={habit.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isCompletedToday ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleToggle(habit)}
                        className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors border ${isCompletedToday ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-transparent hover:border-indigo-400'}`}
                      >
                        <Check size={16} strokeWidth={3} />
                      </button>
                      <span className={`text-base font-medium ${isCompletedToday ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                        {habit.title}
                      </span>
                    </div>
                    {habit.streak > 0 && (
                      <div className="flex items-center gap-1.5 text-orange-500 bg-orange-50 px-3 py-1 rounded-full text-sm font-semibold border border-orange-100">
                        <Flame size={16} />
                        {habit.streak}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
