"use client";
// pages/habit-tracker.js
import { useState, useEffect } from 'react';
import Head from 'next/head';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [habit, setHabit] = useState('');
  const [completedDays, setCompletedDays] = useState({});

  // Load habits from local storage on component mount
  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    setHabits(savedHabits);
    const savedCompletedDays = JSON.parse(localStorage.getItem('completedDays')) || {};
    setCompletedDays(savedCompletedDays);
  }, []);

  // Function to add a new habit
  const addHabit = () => {
    if (habit) {
      const newHabit = { id: Date.now(), name: habit, days: [] };
      const updatedHabits = [...habits, newHabit];
      setHabits(updatedHabits);
      localStorage.setItem('habits', JSON.stringify(updatedHabits));
      setHabit('');
    }
  };

  // Function to mark a habit as completed for today
  const markAsCompleted = (habitId) => {
    const today = new Date().toDateString();
    const updatedCompletedDays = { ...completedDays };
    if (!updatedCompletedDays[habitId]) {
      updatedCompletedDays[habitId] = [];
    }

    if (!updatedCompletedDays[habitId].includes(today)) {
      updatedCompletedDays[habitId].push(today);
      setCompletedDays(updatedCompletedDays);
      localStorage.setItem('completedDays', JSON.stringify(updatedCompletedDays));
    }
  };

  // Function to delete a habit
  const deleteHabit = (habitId) => {
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
    
    // Remove completed days for the deleted habit
    const updatedCompletedDays = { ...completedDays };
    delete updatedCompletedDays[habitId];
    setCompletedDays(updatedCompletedDays);
    localStorage.setItem('completedDays', JSON.stringify(updatedCompletedDays));
  };

  return (
    <>
      <Head>
        <title>Habit Tracker - Mental Health Assistant</title>
      </Head>

      <div className="bg-gray-100 min-h-screen pt-16 px-6 flex flex-col items-center">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-black mb-6 text-center">Habit Tracker</h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              placeholder="Add a new habit..."
              className="border border-gray-300 p-3 rounded-md flex-grow shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={addHabit}
              className="ml-2 bg-blue-600 text-white py-3 px-4 rounded-md transition duration-300 hover:bg-blue-500"
            >
              Add
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-black mb-4">Your Habits</h2>
          <ul className="space-y-4 mb-8">
            {habits.map((habit) => (
              <li key={habit.id} className="p-4 border-l-4 border-blue-600 rounded-lg shadow-sm bg-white flex justify-between items-center">
                <span className="text-lg text-black">{habit.name}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => markAsCompleted(habit.id)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-500 transition mr-2"
                  >
                    Mark Complete
                  </button>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-black mt-8 mb-4">Completion History</h2>
          <div className="space-y-4">
            {habits.map((habit) => (
              <div key={habit.id} className="p-4 border rounded-lg shadow-sm bg-white">
                <h3 className="text-lg font-semibold">{habit.name}</h3>
                <p className="text-black">
                  Completed on: {completedDays[habit.id]?.length > 0 ? completedDays[habit.id].join(', ') : 'No completions yet.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HabitTracker;
