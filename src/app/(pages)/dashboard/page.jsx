// pages/dashboard.js
import Head from 'next/head';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>User Dashboard - Mental Health Assistant</title>
      </Head>

      <div className="bg-gray-100 min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome Back, [User Name]!</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-700">Mood Today</h2>
              <p className="mt-3 text-2xl font-bold text-gray-900">😊 Happy</p>
              <p className="mt-1 text-sm text-gray-500">You last logged your mood 3 hours ago</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-700">Goals Progress</h2>
              <p className="mt-3 text-2xl font-bold text-gray-900">75%</p>
              <p className="mt-1 text-sm text-gray-500">You’ve completed 3 of your 4 goals for this week</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-700">Journals</h2>
              <p className="mt-3 text-2xl font-bold text-gray-900">5 Entries</p>
              <p className="mt-1 text-sm text-gray-500">Your last entry was 2 days ago</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-blue-500 text-white rounded-lg p-6">
              <h2 className="text-lg font-semibold">Start a New Journal</h2>
              <p className="mt-2 text-sm">Reflect on your day and log your thoughts.</p>
              <button className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md">
                Journal Now
              </button>
            </div>
            <div className="bg-green-500 text-white rounded-lg p-6">
              <h2 className="text-lg font-semibold">Guided Breathing Exercise</h2>
              <p className="mt-2 text-sm">Take a moment to relax with a breathing exercise.</p>
              <button className="mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md">
                Start Breathing
              </button>
            </div>
            <div className="bg-purple-500 text-white rounded-lg p-6">
              <h2 className="text-lg font-semibold">Track Your Mood</h2>
              <p className="mt-2 text-sm">Log how you’re feeling today to keep track of your emotions.</p>
              <button className="mt-4 py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md">
                Log Mood
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg p-6 mb-10">
            <h2 className="text-lg font-semibold text-gray-700">Recent Activity</h2>
            <ul className="mt-4 space-y-3">
              <li className="text-gray-600">• You completed a guided breathing exercise 1 hour ago.</li>
              <li className="text-gray-600">• You logged a mood: 😊 Happy, 3 hours ago.</li>
              <li className="text-gray-600">• You added a new journal entry 2 days ago.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
