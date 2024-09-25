// pages/deep-breathing.js
"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const DeepBreathing = () => {
  const [count, setCount] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [breathStage, setBreathStage] = useState('Inhale');

  // Timer logic for deep breathing exercise
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setCount((prev) => (prev === 1 ? 4 : prev - 1));

        if (count === 1) {
          setBreathStage((prevStage) =>
            prevStage === 'Inhale' ? 'Hold' :
            prevStage === 'Hold' ? 'Exhale' :
            'Inhale'
          );
          setCount(4); // Reset count for next stage
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, count]);

  // Start/Stop toggle for breathing exercise
  const toggleExercise = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setBreathStage('Inhale');
      setCount(4);
    }
  };

  return (
    <>
      <Head>
        <title>Deep Breathing - Mental Health Assistant</title>
      </Head>

      <div className="bg-blue-50 min-h-screen pt-16 px-6 flex items-center justify-center">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Deep Breathing Exercise</h1>
          <p className="text-gray-600 mb-4">A calming exercise to regulate your breathing and reduce stress.</p>

          {/* Breathing Timer */}
          <div className="mb-6">
            <p className="text-4xl font-semibold text-gray-800">{breathStage}</p>
            <p className="text-6xl font-bold text-blue-600 mt-2">{count}</p>
          </div>

          {/* Start/Stop Button */}
          <button
            onClick={toggleExercise}
            className={`py-3 px-6 text-white font-bold rounded-md ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">How It Works:</h2>
            <ul className="text-gray-600 space-y-2">
              <li>Inhale deeply for 4 seconds.</li>
              <li>Hold your breath for 4 seconds.</li>
              <li>Exhale slowly for 4 seconds.</li>
              <li>Hold again for 4 seconds before repeating.</li>
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

export default DeepBreathing;
