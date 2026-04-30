import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
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
      // Sorting by creation date
      setHabits(habitsData.sort((a,b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()));
      setIsLoadingHabits(false);
    }, (error) => {
      console.error("Error fetching habits:", error);
      setIsLoadingHabits(false);
    });

    return unsubscribe;
  }, [currentUser]);

  async function addHabit(title) {
    if (!currentUser) return;
    
    try {
      await addDoc(collection(db, 'arch_habits'), {
        title: title,
        userId: currentUser.uid,
        streak: 0,
        completedDates: [],
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }

  async function toggleHabit(habit) {
    if (!currentUser) return;
    
    // Format date properly like 2026-04-30
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const isCompletedToday = habit.completedDates?.includes(todayStr);
    
    let newCompletedDates = [];
    let newStreak = habit.streak || 0;

    if (isCompletedToday) {
      newCompletedDates = habit.completedDates.filter(d => d !== todayStr);
      newStreak = Math.max(0, newStreak - 1);
    } else {
      newCompletedDates = [...(habit.completedDates || []), todayStr];
      newStreak += 1;
    }

    try {
      const habitRef = doc(db, 'arch_habits', habit.habitId);
      await updateDoc(habitRef, {
        completedDates: newCompletedDates,
        streak: newStreak
      });
    } catch (error) {
      console.error("Error toggling habit:", error);
    }
  }

  const value = {
    habits,
    isLoadingHabits,
    addHabit,
    toggleHabit
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
}
