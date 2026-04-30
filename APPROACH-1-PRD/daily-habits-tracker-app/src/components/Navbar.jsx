import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { LogOut, LayoutDashboard, BarChart3 } from 'lucide-react';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-slate-800 border-b border-slate-700 shadow-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold">H</div>
            <span className="font-bold text-xl tracking-tight text-white">HabitTrack</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 hover:text-indigo-400 transition-colors ${isActive('/') ? 'text-indigo-400 font-medium' : 'text-slate-300'}`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/summary" 
              className={`flex items-center space-x-1 hover:text-indigo-400 transition-colors ${isActive('/summary') ? 'text-indigo-400 font-medium' : 'text-slate-300'}`}
            >
              <BarChart3 size={18} />
              <span>Summary</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-1 text-slate-300 hover:text-red-400 transition-colors ml-4 pl-4 border-l border-slate-600"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
