import React from 'react';
import Header from './Header';
import AddHabitForm from './AddHabitForm';
import HabitList from './HabitList';
import { useHabit } from '../context/HabitContext';

export default function Dashboard() {
  const { isLoadingHabits, habits } = useHabit();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="bg-slate-800 border border-slate-700 border-dashed rounded-xl p-8 text-center text-slate-400">
          <h2 className="text-2xl font-semibold text-white mb-2">Dashboard Main View</h2>
          <p className="mb-6 text-indigo-400">
            Habits loaded from Context: {isLoadingHabits ? 'Loading...' : habits.length}
          </p>
          
          <div className="mt-8 flex flex-col space-y-4">
            <div className="text-left mb-4">
              <AddHabitForm />
            </div>
            <div className="mb-4">
              <HabitList />
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
              [ Placeholder for AnalyticsSummary ]
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
