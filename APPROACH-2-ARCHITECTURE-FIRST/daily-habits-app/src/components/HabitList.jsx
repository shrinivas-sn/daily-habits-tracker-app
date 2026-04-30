import React from 'react';
import { useHabit } from '../context/HabitContext';
import HabitItem from './HabitItem';

export default function HabitList() {
  const { habits, isLoadingHabits } = useHabit();

  if (isLoadingHabits) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-800 rounded-2xl border border-slate-700 border-dashed">
        <p className="text-slate-400">No habits added yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 text-left">
      {habits.map(habit => (
        <HabitItem key={habit.habitId} habit={habit} />
      ))}
    </div>
  );
}
