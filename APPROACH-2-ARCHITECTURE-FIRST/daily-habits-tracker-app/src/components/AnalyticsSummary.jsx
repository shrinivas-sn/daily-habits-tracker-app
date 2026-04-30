import React from 'react';
import { useHabit } from '../context/HabitContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsSummary() {
  const { habits } = useHabit();

  // Generate last 7 days strings
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const displayStr = `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
    return { dateStr, displayStr };
  });

  const chartData = last7Days.map(({ dateStr, displayStr }) => {
    const completionsOnDate = habits.filter(h => h.completedDates?.includes(dateStr)).length;
    return {
      date: displayStr,
      completions: completionsOnDate
    };
  });

  const totalCompletions = habits.reduce((acc, habit) => acc + (habit.completedDates?.length || 0), 0);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-md mt-8 text-left">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Weekly Summary</h3>
        <span className="bg-indigo-500/20 text-indigo-300 text-sm font-medium px-3 py-1 rounded-full border border-indigo-500/30">
          {totalCompletions} Total Completions
        </span>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
              itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
              cursor={{ fill: '#334155', opacity: 0.4 }}
            />
            <Bar dataKey="completions" name="Completed Habits" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
