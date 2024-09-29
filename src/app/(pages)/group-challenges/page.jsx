"use client"
// pages/group-challenges.js
import { useState } from 'react';
import Head from 'next/head';

const GroupChallenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [challenges] = useState([
    {
      id: 1,
      name: "30-Day Mindfulness Challenge",
      description: "Practice mindfulness for 10 minutes a day for 30 days.",
      participants: 240,
      progress: 40, // example progress for the user
    },
    {
      id: 2,
      name: "Daily Gratitude Journal Challenge",
      description: "Write three things you're grateful for every day for a week.",
      participants: 150,
      progress: 70,
    },
    {
      id: 3,
      name: "Weekly Workout Challenge",
      description: "Complete a 30-minute workout at least 5 days a week.",
      participants: 320,
      progress: 90,
    },
  ]);

  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 1,
      username: "Poxy Pixel",
      content: "Just finished my mindfulness session! Feeling much calmer.",
      likes: 10,
      comments: 2,
    },
    {
      id: 2,
      username: "SarahM",
      content: "Day 5 of the Gratitude Journal challenge, feeling really positive!",
      likes: 15,
      comments: 3,
    },
  ]);

  return (
    <>
      <Head>
        <title>Group Challenges & Community - Mental Health Assistant</title>
      </Head>

      <div className="bg-gray-50 min-h-screen pt-16 px-6">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Group Challenges & Community</h1>
          <p className="text-gray-600 mb-6">
            Join challenges with the community and track your progress together.
          </p>

          {/* Challenges Section */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Challenges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                onClick={() => setSelectedChallenge(challenge)}
                className="p-6 bg-blue-100 rounded-lg shadow-lg hover:bg-blue-200 cursor-pointer transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">{challenge.name}</h3>
                <p className="text-gray-700 mt-2">{challenge.description}</p>
                <p className="text-gray-600 mt-4">{challenge.participants} participants</p>
                <div className="bg-gray-200 rounded-lg h-4 w-full mt-4">
                  <div
                    className="bg-blue-500 h-full rounded-lg"
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
                <p className="text-gray-600 mt-2">{challenge.progress}% Completed</p>
              </div>
            ))}
          </div>

          {/* Selected Challenge Details */}
          {selectedChallenge && (
            <div className="bg-blue-50 p-6 rounded-lg mb-8 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800">{selectedChallenge.name}</h3>
              <p className="text-gray-700 mt-2">{selectedChallenge.description}</p>
              <p className="text-gray-600 mt-4">{selectedChallenge.participants} participants</p>
              <div className="bg-gray-200 rounded-lg h-4 w-full mt-4">
                <div
                  className="bg-blue-500 h-full rounded-lg"
                  style={{ width: `${selectedChallenge.progress}%` }}
                ></div>
              </div>
              <p className="text-gray-600 mt-2">{selectedChallenge.progress}% Completed</p>
            </div>
          )}

          {/* Community Posts */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Community Posts</h2>
          <div className="space-y-4">
            {communityPosts.map((post) => (
              <div
                key={post.id}
                className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">{post.username}</h3>
                <p className="text-gray-700 mt-2">{post.content}</p>
                <div className="flex justify-between items-center mt-4 text-gray-600">
                  <p>{post.likes} Likes</p>
                  <p>{post.comments} Comments</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupChallenges;
