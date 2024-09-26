"use client"
// pages/accountability-partner.js
import { useState } from 'react';
import Head from 'next/head';

const AccountabilityPartner = () => {
  const [partnerEmail, setPartnerEmail] = useState('');
  const [userProgress, setUserProgress] = useState(75); // Example progress percentage
  const [partnerProgress, setPartnerProgress] = useState(50); // Example partner progress
  const [partnerAdded, setPartnerAdded] = useState(false);

  const handleAddPartner = (e) => {
    e.preventDefault();
    if (partnerEmail) {
      setPartnerAdded(true);
      // Simulate sending an invite to the partner
      alert(`Invite sent to ${partnerEmail}`);
    }
  };

  return (
    <>
      <Head>
        <title>Accountability Partner - Mental Health Assistant</title>
      </Head>

      <div className="bg-gray-100 min-h-screen pt-16 px-6 flex flex-col items-center">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Accountability Partner</h1>
          <p className="text-gray-600 mb-4">
            Stay on track with your mental health habits by inviting an accountability partner. You can view each other's progress and stay motivated together.
          </p>

          {/* Add Accountability Partner Form */}
          {!partnerAdded ? (
            <form onSubmit={handleAddPartner} className="w-full mb-8">
              <div className="flex flex-col sm:flex-row items-center">
                <input
                  type="email"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  className="w-full sm:w-2/3 p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none mb-4 sm:mb-0"
                  placeholder="Enter your partner's email"
                  required
                />
                <button
                  type="submit"
                  className="ml-0 sm:ml-4 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition"
                >
                  Invite Partner
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-blue-50 p-4 rounded-lg shadow-inner mb-8 text-center">
              <p className="text-lg text-gray-700">
                You’ve invited <strong>{partnerEmail}</strong> as your accountability partner!
              </p>
            </div>
          )}

          {/* Progress Tracker */}
          <div className="flex justify-between mb-8">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h2>
              <div className="bg-gray-200 rounded-lg h-4 w-full mb-2">
                <div className="bg-green-500 h-full rounded-lg" style={{ width: `${userProgress}%` }}></div>
              </div>
              <p className="text-gray-600">{userProgress}% Completed</p>
            </div>

            <div className="w-1/2 pl-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Partner's Progress</h2>
              <div className="bg-gray-200 rounded-lg h-4 w-full mb-2">
                <div className="bg-blue-500 h-full rounded-lg" style={{ width: `${partnerProgress}%` }}></div>
              </div>
              <p className="text-gray-600">{partnerProgress}% Completed</p>
            </div>
          </div>

          {/* Partner Progress Notification */}
          {partnerAdded && (
            <div className="bg-yellow-50 p-4 rounded-lg shadow-inner text-center">
              <p className="text-lg text-gray-700">
                Keep up the good work! Both you and your partner are making progress.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountabilityPartner;
