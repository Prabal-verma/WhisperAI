"use client";
// pages/habit-tracker.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { FiCheckCircle, FiTrash2 } from "react-icons/fi";
import Sidebar from "@/components/ui/Sidebar";

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [habit, setHabit] = useState("");
  const [completedDays, setCompletedDays] = useState({});

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(savedHabits);
    const savedCompletedDays =
      JSON.parse(localStorage.getItem("completedDays")) || {};
    setCompletedDays(savedCompletedDays);
  }, []);

  const addHabit = () => {
    if (habit) {
      const newHabit = { id: Date.now(), name: habit, days: [] };
      const updatedHabits = [...habits, newHabit];
      setHabits(updatedHabits);
      localStorage.setItem("habits", JSON.stringify(updatedHabits));
      setHabit("");
    }
  };

  const markAsCompleted = (habitId) => {
    const today = new Date().toDateString();
    const updatedCompletedDays = { ...completedDays };
    if (!updatedCompletedDays[habitId]) {
      updatedCompletedDays[habitId] = [];
    }

    if (!updatedCompletedDays[habitId].includes(today)) {
      updatedCompletedDays[habitId].push(today);
      setCompletedDays(updatedCompletedDays);
      localStorage.setItem(
        "completedDays",
        JSON.stringify(updatedCompletedDays)
      );
    }
  };

  const deleteHabit = (habitId) => {
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));

    const updatedCompletedDays = { ...completedDays };
    delete updatedCompletedDays[habitId];
    setCompletedDays(updatedCompletedDays);
    localStorage.setItem(
      "completedDays",
      JSON.stringify(updatedCompletedDays)
    );
  };

  return (
    <>
      <Head>
        <title>Habit Tracker - Mental Health Assistant</title>
      </Head>
      <Sidebar/>

      <div className="bg-gradient-to-r from-indigo-200 to-purple-400 min-h-screen pt-16 px-6 flex flex-col items-center pt-[100px] pb-[100px]">
        <motion.div
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Habit Tracker
          </h1>

          <div className="flex mb-6 space-x-4">
            <motion.input
              type="text"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              placeholder="Add a new habit"
              className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.button
              onClick={addHabit}
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Add
            </motion.button>
          </div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Habits</h2>
            <ul className="space-y-4">
              {habits.length > 0 ? (
                habits.map((habit) => (
                  <motion.li
                    key={habit.id}
                    className="p-4 bg-gray-50 rounded-lg flex justify-between items-center border-l-4 border-indigo-600 shadow-sm"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-lg font-medium text-gray-700">{habit.name}</span>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={() => markAsCompleted(habit.id)}
                        className="text-indigo-600"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiCheckCircle size={24} />
                      </motion.button>
                      <motion.button
                        onClick={() => deleteHabit(habit.id)}
                        className="text-red-600"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiTrash2 size={24} />
                      </motion.button>
                    </div>
                  </motion.li>
                ))
              ) : (
                <p className="text-gray-600">No habits added yet. Start by adding a new habit!</p>
              )}
            </ul>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Completion History</h2>
            <div className="space-y-4">
              {habits.length > 0 ? (
                habits.map((habit) => (
                  <motion.div
                    key={habit.id}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{habit.name}</h3>
                    <p className="text-gray-600">
                      Completed on:{" "}
                      {completedDays[habit.id]?.length > 0
                        ? completedDays[habit.id].join(", ")
                        : "No completions yet."}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-600">No completion history yet.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default HabitTracker;
