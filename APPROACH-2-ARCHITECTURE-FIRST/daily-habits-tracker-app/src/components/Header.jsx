import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export default function Header() {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-slate-800 border-b border-slate-700 shadow-sm py-4 px-6">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white shadow-lg">
            H
          </div>
          <h1 className="text-xl font-bold text-white hidden sm:block">Habit Tracker</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-slate-300 text-sm font-medium">{currentUser?.email}</span>
          <button 
            onClick={logout}
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors border border-slate-600"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
