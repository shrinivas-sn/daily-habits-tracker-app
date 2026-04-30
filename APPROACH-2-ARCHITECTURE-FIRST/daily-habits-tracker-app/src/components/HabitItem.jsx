import React from 'react';
import { useHabit } from '../context/HabitContext';
import { Check, Flame } from 'lucide-react';

export default function HabitItem({ habit }) {
  const { toggleHabit } = useHabit();
  
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const isCompletedToday = habit.completedDates?.includes(todayStr);

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isCompletedToday ? 'bg-indigo-500/10 border-indigo-500/50' : 'bg-slate-800 border-slate-700 hover:border-slate-600'}`}>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => toggleHabit(habit)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isCompletedToday ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-transparent hover:bg-slate-600'}`}
        >
          <Check size={16} />
        </button>
        <span className={`text-lg ${isCompletedToday ? 'text-indigo-200 line-through' : 'text-slate-200'}`}>
          {habit.title}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        {habit.streak > 0 && (
          <div className="flex items-center gap-1 text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full text-sm font-medium">
            <Flame size={16} />
            {habit.streak} day streak
          </div>
        )}
      </div>
    </div>
  );
}
