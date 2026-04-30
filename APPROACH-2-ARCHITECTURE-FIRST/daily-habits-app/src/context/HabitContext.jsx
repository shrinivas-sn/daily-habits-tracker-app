import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const HabitContext = createContext();

export function useHabit() {
  return useContext(HabitContext);
}

export function HabitProvider({ children }) {
  const { currentUser } = useAuth();
  const [habits, setHabits] = useState([]);
  const [isLoadingHabits, setIsLoadingHabits] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setHabits([]);
      setIsLoadingHabits(false);
      return;
    }

    const q = query(
      collection(db, 'arch_habits'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const habitsData = [];
      snapshot.forEach((doc) => {
        habitsData.push({ habitId: doc.id, ...doc.data() });
      });
      setHabits(habitsData);
      setIsLoadingHabits(false);
    }, (error) => {
      console.error("Error fetching habits:", error);
      setIsLoadingHabits(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const value = {
    habits,
    isLoadingHabits
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
}
