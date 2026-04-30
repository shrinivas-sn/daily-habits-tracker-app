import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Auth from './Auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;

  return (
    <>
      {user ? (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center max-w-md w-full">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Dashboard</h1>
            <p className="text-slate-500 mb-6">Authenticated as {user.email}</p>
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg text-indigo-700 text-sm mb-6">
              Story 1 Complete. Awaiting Story 2 (Habit Creation)
            </div>
            <button 
              onClick={() => signOut(auth)}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
