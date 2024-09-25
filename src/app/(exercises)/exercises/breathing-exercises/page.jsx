"use client"
// pages/478-breathing.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Breathing478 = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(4); // Initial count for inhaling
  const [breathStage, setBreathStage] = useState('Inhale');

  // Timer logic for 4-7-8 breathing
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (count === 0) {
          // Change breath stage
          if (breathStage === 'Inhale') {
            setBreathStage('Hold');
            setCount(7);
          } else if (breathStage === 'Hold') {
            setBreathStage('Exhale');
            setCount(8);
          } else {
            setBreathStage('Inhale');
            setCount(4); // Reset for next cycle
          }
        } else {
          setCount((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, count, breathStage]);

  // Start/Stop toggle for 4-7-8 breathing exercise
  const toggleExercise = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setBreathStage('Inhale');
      setCount(4); // Reset to initial state
    }
  };

  return (
    <>
      <Head>
        <title>4-7-8 Breathing - Mental Health Assistant</title>
      </Head>

      <div className="bg-yellow-50 min-h-screen pt-16 px-6 flex items-center justify-center">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-yellow-600 mb-6">4-7-8 Breathing</h1>
          <p className="text-gray-600 mb-4">A breathing technique to help you fall asleep faster and relax your body.</p>

          {/* Breathing Timer */}
          <div className="mb-6">
            <p className="text-4xl font-semibold text-gray-800">{breathStage}</p>
            <p className="text-6xl font-bold text-yellow-600 mt-2">{count}</p>
          </div>

          {/* Start/Stop Button */}
          <button
            onClick={toggleExercise}
            className={`py-3 px-6 text-white font-bold rounded-md ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">How It Works:</h2>
            <ul className="text-gray-600 space-y-2">
              <li>Inhale deeply for 4 seconds.</li>
              <li>Hold your breath for 7 seconds.</li>
              <li>Exhale slowly for 8 seconds.</li>
              <li>Repeat the cycle for several minutes.</li>
            </ul>
          </div>

          {/* Back to Exercises Button */}
          <Link href="/exercises">
            <button className="mt-6 py-2 px-4 bg-gray-300 text-black font-bold rounded-md hover:bg-gray-400">
              Back to Exercises
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Breathing478;
