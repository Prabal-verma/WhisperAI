"use client";
// pages/mood-tracker.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MoodTracker = () => {
  const [mood, setMood] = useState('');
  const [moodLog, setMoodLog] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    const savedMoodLogs = JSON.parse(localStorage.getItem('moodLog')) || [];
    setMoodLog(savedMoodLogs);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mood) {
      const newMoodEntry = { mood, date: date || new Date().toISOString().split('T')[0] };
      const updatedMoodLog = [...moodLog, newMoodEntry];

      localStorage.setItem('moodLog', JSON.stringify(updatedMoodLog));

      setMoodLog(updatedMoodLog);
      setMood('');
      setDate('');
    }
  };

  // Process mood data for statistics and graphing
  const moodCounts = moodLog.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const moodLabels = Object.keys(moodCounts);
  const moodData = Object.values(moodCounts);

  const data = {
    labels: moodLabels,
    datasets: [{
      label: 'Mood Count',
      data: moodData,
      backgroundColor: moodLabels.map((mood) => {
        switch (mood) {
          case 'happy':
            return 'rgba(75, 192, 192, 0.6)';
          case 'sad':
            return 'rgba(255, 99, 132, 0.6)';
          case 'anxious':
            return 'rgba(255, 206, 86, 0.6)';
          default:
            return 'rgba(153, 102, 255, 0.6)';
        }
      }),
      borderColor: 'rgba(0, 0, 0, 1)',
      borderWidth: 1,
    }],
  };

  const averageMood = () => {
    const moodValues = moodLog.map(entry => {
      switch (entry.mood) {
        case 'happy': return 5;
        case 'okay': return 3;
        case 'sad': return 1;
        default: return 3;
      }
    });
    return (moodValues.reduce((a, b) => a + b, 0) / moodValues.length) || 0;
  };

  return (
    <>
      <Head>
        <title>Mood Tracker - Mental Health Assistant</title>
      </Head>
      <div className="bg-gradient-to-r from-blue-200 to-purple-300 min-h-screen flex flex-col items-center">
        <div className="flex-grow max-w-4xl w-full mx-auto p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Mood Tracker</h1>
          <p className="text-lg text-center text-gray-700 mb-8">Track your mood daily to understand your emotional patterns better.</p>

          <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-white p-6 rounded-lg shadow-md">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="mood">How do you feel today?</label>
              <input
                type="text"
                id="mood"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your mood (e.g., happy, sad, anxious)"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Log Mood
            </button>
          </form>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mood Statistics</h2>
          <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-800">Average Mood: <span className="font-bold">{averageMood().toFixed(2)}</span></p>
            <p className="text-gray-800">Total Entries: <span className="font-bold">{moodLog.length}</span></p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mood Distribution</h2>
          <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
            <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mood Log</h2>
          <ul className="space-y-4">
            {moodLog.length > 0 ? (
              moodLog.map((entry, index) => (
                <li key={index} className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
                  <p className="text-gray-800">{entry.date}: <span className="font-bold">{entry.mood}</span></p>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No mood entries yet. Start logging your mood!</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MoodTracker;
