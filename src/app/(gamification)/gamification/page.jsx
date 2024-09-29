"use client";
// pages/gamification.js
import { useState, useEffect } from 'react';
import Head from 'next/head';

const Gamification = () => {
  const [points, setPoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Tasks and Games Data
  const tasksAndGames = [
    {
      id: 1,
      title: 'Daily Journaling',
      description: 'Write a daily entry reflecting on feelings and experiences.',
      points: 10,
    },
    {
      id: 2,
      title: 'Gratitude List',
      description: 'List three things you are grateful for today.',
      points: 5,
    },
    {
      id: 3,
      title: 'Mindfulness Meditation',
      description: 'Complete a 10-minute guided meditation session.',
      points: 15,
    },
    {
      id: 4,
      title: 'Physical Activity',
      description: 'Engage in any physical activity for at least 30 minutes.',
      points: 20,
    },
    {
      id: 5,
      title: 'Breathing Exercise',
      description: 'Complete a 5-minute breathing exercise.',
      points: 10,
    },
    {
      id: 6,
      title: 'Self-Reflection Quiz',
      description: 'Complete a self-assessment quiz on mood or stress levels.',
      points: 15,
    },
    {
      id: 7,
      title: 'Random Acts of Kindness',
      description: 'Perform a random act of kindness for someone.',
      points: 20,
    },
    {
      id: 8,
      title: 'Mood Matching Game',
      description: 'Play a memory card game to match moods with coping strategies.',
      points: 25,
      interactive: true,
    },
    {
      id: 9,
      title: 'Wellness Bingo',
      description: 'Complete tasks on a wellness bingo card.',
      points: 30,
      interactive: true,
    },
    {
      id: 10,
      title: 'Habit Tracker',
      description: 'Track personal goals and achievements over a week.',
      points: 10,
    },
    {
      id: 11,
      title: 'Mindfulness Challenge',
      description: 'Complete a series of daily mindfulness challenges.',
      points: 5,
    },
    {
      id: 12,
      title: 'Affirmation Challenge',
      description: 'Share positive affirmations daily for a week.',
      points: 10,
    },
    {
      id: 13,
      title: 'Stress Ball Creation',
      description: 'Create a DIY stress ball and share a picture.',
      points: 15,
    },
    {
      id: 14,
      title: 'Visualization Exercise',
      description: 'Engage in a visualization exercise focusing on your goals.',
      points: 15,
    },
  ];

  // Function to handle task completion
  const handleTaskCompletion = (task) => {
    if (!completedTasks.includes(task.id)) {
      setPoints(points + task.points);
      setCompletedTasks([...completedTasks, task.id]);
    }
  };

  // Optional: Persist points to local storage
  useEffect(() => {
    const savedPoints = localStorage.getItem('points');
    if (savedPoints) {
      setPoints(Number(savedPoints));
    }
  }, []);

  // Update local storage whenever points change
  useEffect(() => {
    localStorage.setItem('points', points);
  }, [points]);

  // Function to render task styles based on completion
  const getTaskStyle = (task) => {
    if (completedTasks.includes(task.id)) {
      return 'bg-green-200 border-green-500';
    } else if (task.interactive) {
      return 'bg-yellow-200 border-yellow-500';
    }
    return 'bg-white border-gray-300';
  };

  return (
    <>
      <Head>
        <title>Gamification - Mental Health Assistant</title>
      </Head>

      <div className="bg-gray-50 min-h-screen pt-16 px-6 flex flex-col items-center">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Gamification of Mental Health</h1>
          <p className="text-gray-600 mb-4">Earn points by completing tasks and games that promote your mental well-being!</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Points: {points}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasksAndGames.map((task) => (
              <div
                key={task.id}
                className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer ${getTaskStyle(task)}`}
                onClick={() => handleTaskCompletion(task)}
              >
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-blue-500 font-bold">Points: {task.points}</p>
                {completedTasks.includes(task.id) && <p className="text-green-700 font-bold mt-2">Completed!</p>}
              </div>
            ))}
          </div>

          {completedTasks.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Completed Tasks:</h2>
              <ul className="list-disc list-inside">
                {completedTasks.map((taskId) => {
                  const task = tasksAndGames.find(t => t.id === taskId);
                  return <li key={taskId} className="text-gray-600">{task.title}</li>;
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Interactive Games Section */}
        <div className="mt-8 w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Interactive Games</h2>
          <p className="text-gray-600 mb-4">Complete the following games to earn extra points!</p>
          
          {/* Mood Matching Game Button */}
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={() => handleTaskCompletion(tasksAndGames[8])} // Mood Matching Game
          >
            Play Mood Matching Game (Earn 25 Points)
          </button>

          {/* Wellness Bingo Button */}
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={() => handleTaskCompletion(tasksAndGames[8])} // Wellness Bingo
          >
            Complete Wellness Bingo (Earn 30 Points)
          </button>
        </div>
      </div>
    </>
  );
};

export default Gamification;
