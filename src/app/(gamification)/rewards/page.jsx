"use client";
// pages/rewards.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Rewards = () => {
  const [points, setPoints] = useState(0);
  const [redeemedRewards, setRedeemedRewards] = useState([]);

  // Sample rewards data
  const rewards = [
    {
      id: 1,
      title: '5-Minute Guided Meditation',
      cost: 20,
      description: 'Redeem this reward for a free guided meditation session.',
    },
    {
      id: 2,
      title: 'Self-Care Package',
      cost: 50,
      description: 'Receive a package with self-care items and resources.',
    },
    {
      id: 3,
      title: 'Mental Health Journal',
      cost: 30,
      description: 'Get a beautifully designed journal to track your thoughts.',
    },
    {
      id: 4,
      title: 'Exclusive Webinar Access',
      cost: 40,
      description: 'Join an exclusive webinar on mental health topics.',
    },
    {
      id: 5,
      title: 'Personalized Wellness Plan',
      cost: 70,
      description: 'Receive a customized wellness plan from a mental health professional.',
    },
  ];

  // Load points from local storage
  useEffect(() => {
    const savedPoints = localStorage.getItem('points');
    if (savedPoints) {
      setPoints(Number(savedPoints));
    }
  }, []);

  // Function to handle reward redemption
  const redeemReward = (reward) => {
    if (points >= reward.cost && !redeemedRewards.includes(reward.id)) {
      setPoints(points - reward.cost);
      setRedeemedRewards([...redeemedRewards, reward.id]);
      alert(`You have redeemed: ${reward.title}`);
      // Update local storage
      localStorage.setItem('points', points - reward.cost);
    } else {
      alert('Not enough points or reward already redeemed.');
    }
  };

  return (
    <>
      <Head>
        <title>Rewards - Mental Health Assistant</title>
      </Head>

      <div className="bg-gray-50 min-h-screen pt-16 px-6 flex flex-col items-center">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Redeem Your Rewards</h1>
          <p className="text-gray-600 mb-4">You have {points} points available to redeem.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <div key={reward.id} className={`p-4 border rounded-lg shadow-sm transition ${redeemedRewards.includes(reward.id) ? 'bg-gray-200' : 'bg-white'}`}>
                <h3 className="text-lg font-semibold text-gray-800">{reward.title}</h3>
                <p className="text-gray-600">{reward.description}</p>
                <p className="text-blue-500 font-bold">Cost: {reward.cost} Points</p>
                <button
                  className={`mt-2 py-2 px-4 rounded ${redeemedRewards.includes(reward.id) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                  onClick={() => redeemReward(reward)}
                  disabled={redeemedRewards.includes(reward.id)}
                >
                  {redeemedRewards.includes(reward.id) ? 'Redeemed' : 'Redeem'}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Redeemed Rewards:</h2>
            <ul className="list-disc list-inside">
              {redeemedRewards.map((rewardId) => {
                const reward = rewards.find(r => r.id === rewardId);
                return <li key={rewardId} className="text-gray-600">{reward.title}</li>;
              })}
            </ul>
          </div>

          <Link href="/gamification" className="mt-4 text-blue-500 hover:underline">
            Back to Gamification
          </Link>
        </div>
      </div>
    </>
  );
};

export default Rewards;
