"use client"
// pages/guided-meditation.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const GuidedMeditation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(10); // Set initial time to 10 minutes
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);

  // Timer logic for guided meditation
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            setIsRunning(false);
            alert("Meditation session is complete!");
            return;
          }
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds]);

  // Start/Stop toggle for meditation session
  const toggleMeditation = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setMinutes(10); // Reset to 10 minutes
      setSeconds(0);
    }
  };

  return (
    <>
      <Head>
        <title>Guided Meditation - Mental Health Assistant</title>
      </Head>

      <div className="bg-purple-50 min-h-screen pt-16 px-6 flex items-center justify-center">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-6">Guided Meditation</h1>
          <p className="text-gray-600 mb-4">A mindfulness practice to clear your mind and focus on the present moment.</p>

          {/* Meditation Timer */}
          <div className="mb-6">
            <p className="text-4xl font-semibold text-gray-800">{`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</p>
          </div>

          {/* Start/Stop Button */}
          <button
            onClick={toggleMeditation}
            className={`py-3 px-6 text-white font-bold rounded-md ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'}`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">How It Works:</h2>
            <ul className="text-gray-600 space-y-2">
              <li>Find a quiet space where you can sit comfortably.</li>
              <li>Close your eyes and take deep breaths.</li>
              <li>Focus on the present moment and let thoughts pass by.</li>
              <li>Listen to guided meditation audio (if available) or meditate in silence.</li>
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

export default GuidedMeditation;

