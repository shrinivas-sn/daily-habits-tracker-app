import React from 'react';
import { useAuth } from './context/AuthContext';
import { HabitProvider } from './context/HabitContext';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';

function App() {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser ? (
        <HabitProvider>
          <Dashboard />
        </HabitProvider>
      ) : (
        <AuthScreen />
      )}
    </>
  );
}

export default App;
