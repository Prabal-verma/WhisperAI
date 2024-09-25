"use client"
// pages/muscle-relaxation.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const ProgressiveMuscleRelaxation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(5);
  const [currentMuscle, setCurrentMuscle] = useState('Relax');

  // Timer logic for muscle relaxation
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setCount((prev) => (prev === 1 ? 5 : prev - 1));

        if (count === 1) {
          setCurrentMuscle((prevMuscle) => 
            prevMuscle === 'Relax' ? 'Tense' : 'Relax'
          );
          setCount(5); // Reset count for next stage
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, count]);

  // Start/Stop toggle for muscle relaxation exercise
  const toggleExercise = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setCurrentMuscle('Relax');
      setCount(5);
    }
  };

  return (
    <>
      <Head>
        <title>Progressive Muscle Relaxation - Mental Health Assistant</title>
      </Head>

      <div className="bg-green-50 min-h-screen pt-16 px-6 flex items-center justify-center">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-6">Progressive Muscle Relaxation</h1>
          <p className="text-gray-600 mb-4">A technique to reduce muscle tension and promote relaxation.</p>

          {/* Relaxation Timer */}
          <div className="mb-6">
            <p className="text-4xl font-semibold text-gray-800">{currentMuscle}</p>
            <p className="text-6xl font-bold text-green-600 mt-2">{count}</p>
          </div>

          {/* Start/Stop Button */}
          <button
            onClick={toggleExercise}
            className={`py-3 px-6 text-white font-bold rounded-md ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">How It Works:</h2>
            <ul className="text-gray-600 space-y-2">
              <li>Tense a specific muscle group for 5 seconds.</li>
              <li>Relax the muscle group and notice the difference.</li>
              <li>Move to the next muscle group and repeat.</li>
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

export default ProgressiveMuscleRelaxation;
