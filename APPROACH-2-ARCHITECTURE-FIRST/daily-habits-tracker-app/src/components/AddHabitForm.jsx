import React, { useState } from 'react';
import { useHabit } from '../context/HabitContext';
import { Plus } from 'lucide-react';

export default function AddHabitForm() {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addHabit } = useHabit();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await addHabit(title);
      setTitle('');
    } catch (error) {
      console.error("Failed to add habit", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g., Drink 8 glasses of water"
        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        disabled={isSubmitting}
      />
      <button 
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-500/50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20"
      >
        <Plus size={20} />
        <span className="hidden sm:inline">{isSubmitting ? 'Adding...' : 'Add Habit'}</span>
      </button>
    </form>
  );
}
