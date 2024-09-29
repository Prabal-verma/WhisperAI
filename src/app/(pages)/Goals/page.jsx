"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar"; // Make sure to install react-calendar package
import "react-calendar/dist/Calendar.css"; // Import styles for the calendar
import Head from "next/head";
import Sidebar from "@/components/ui/Sidebar";

const GoalsPage = () => {
  const [goal, setGoal] = useState("");
  const [goalDetails, setGoalDetails] = useState("");
  const [dailyTask, setDailyTask] = useState("");
  const [goalList, setGoalList] = useState([]);
  const [date, setDate] = useState(new Date());

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (goal && goalDetails) {
      const newGoal = { goal, details: goalDetails, tasks: [] };
      setGoalList([...goalList, newGoal]);
      setGoal("");
      setGoalDetails("");
    }
  };

  const handleAddTask = (index) => {
    if (dailyTask) {
      const updatedGoals = [...goalList];
      updatedGoals[index].tasks.push(dailyTask);
      setGoalList(updatedGoals);
      setDailyTask("");
    }
  };

  return (
    <>
    <div>
        <Sidebar/>
    
      <Head>
        <title>Goals - Mental Health Assistant</title>
      </Head>
      <div className="bg-gradient-to-r from-green-200 to-blue-300 min-h-screen flex flex-col items-center p-6 pt-[100px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 mb-6"
        >
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Set Your Goals</h1>
          <form onSubmit={handleAddGoal} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="goal">
                What is your goal?
              </label>
              <input
                type="text"
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your goal"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="goalDetails">
                How do you plan to achieve it?
              </label>
              <textarea
                id="goalDetails"
                value={goalDetails}
                onChange={(e) => setGoalDetails(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Describe your plan"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              Add Goal
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Goals</h2>
          <ul className="space-y-4">
            {goalList.length > 0 ? (
              goalList.map((goalItem, index) => (
                <li key={index} className="border border-gray-300 rounded-md p-4 shadow-sm bg-gray-50">
                  <h3 className="text-xl font-bold">{goalItem.goal}</h3>
                  <p className="text-gray-700">{goalItem.details}</p>
                  <div className="mt-4">
                    <input
                      type="text"
                      value={dailyTask}
                      onChange={(e) => setDailyTask(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Add a daily task"
                    />
                    <button
                      onClick={() => handleAddTask(index)}
                      className="mt-2 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                    >
                      Add Task
                    </button>
                    <ul className="mt-2 space-y-1">
                      {goalItem.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-gray-600">{task}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No goals added yet. Start setting your goals!</p>
            )}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 mt-6"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Calendar</h2>
          <Calendar
            onChange={setDate}
            value={date}
            className="rounded-md border border-gray-300"
          />
        </motion.div>
      </div>
      </div>
    </>
  );
};

export default GoalsPage;
