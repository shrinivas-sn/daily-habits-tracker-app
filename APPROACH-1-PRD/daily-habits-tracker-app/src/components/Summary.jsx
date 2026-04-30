import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';

export default function Summary() {
  const { currentUser } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Generate data for the last 7 days chart
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = subDays(new Date(), 6 - i);
    return format(d, 'yyyy-MM-dd');
  });

  const chartData = last7Days.map(dateStr => {
    const completionsOnDate = habits.filter(h => h.completions?.includes(dateStr)).length;
    return {
      date: format(new Date(dateStr), 'MMM dd'),
      completions: completionsOnDate
    };
  });

  const totalCompletions = habits.reduce((acc, habit) => acc + (habit.completions?.length || 0), 0);
  const totalHabits = habits.length;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Your Progress</h1>
        <p className="text-slate-400 mt-2">See how you're doing over time.</p>
      </header>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
              <h3 className="text-slate-400 text-sm font-medium mb-1">Total Habits</h3>
              <div className="text-4xl font-bold text-white">{totalHabits}</div>
            </div>
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
              <h3 className="text-slate-400 text-sm font-medium mb-1">Total Completions</h3>
              <div className="text-4xl font-bold text-indigo-400">{totalCompletions}</div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl h-96">
            <h3 className="text-white font-medium mb-6">Last 7 Days Activity</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis allowDecimals={false} stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="completions" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
