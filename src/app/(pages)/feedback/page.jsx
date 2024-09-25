"use client"
// pages/feedback.js
import { useState } from 'react';
import Head from 'next/head';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here, you can add your API call to send feedback to your server or a third-party service
    console.log({ name, email, feedback });

    // Clear the form after submission
    setName('');
    setEmail('');
    setFeedback('');
    setSuccessMessage('Thank you for your feedback!');

    // Optional: You can add logic to send the feedback to your server here.
  };

  return (
    <>
      <Head>
        <title>Feedback and Suggestions - Mental Health Assistant</title>
      </Head>
      <div className="bg-gray-50 min-h-screen pt-16 px-6 flex flex-col items-center">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Feedback and Suggestions</h1>
          <p className="text-gray-600 mb-4">We value your feedback! Please let us know your thoughts and suggestions.</p>

          {successMessage && (
            <div className="bg-green-100 text-green-800 p-4 mb-4 rounded-md">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Your Email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="feedback">Feedback</label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                rows="4"
                placeholder="Your Feedback"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Feedback;
