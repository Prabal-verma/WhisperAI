"use client";
// pages/exercises.js
import Sidebar from '@/components/ui/Sidebar';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import { FaTrophy, FaCalendarCheck } from 'react-icons/fa'; // Icons for gamification and habit tracking

const exercises = [
  {
    id: 1,
    name: 'Deep Breathing',
    description: 'A calming exercise to regulate your breathing and reduce stress.',
    link: '/exercises/deepbreathing-exercises',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Progressive Muscle Relaxation',
    description: 'A technique to reduce muscle tension and promote relaxation.',
    link: '/exercises/progressivemusclerelaxation-exercises',
    color: 'bg-green-500',
  },
  {
    id: 3,
    name: 'Guided Meditation',
    description: 'A mindfulness practice to clear your mind and focus on the present moment.',
    link: '/exercises/guidedmeditation-exercises',
    color: 'bg-purple-500',
  },
  {
    id: 4,
    name: '4-7-8 Breathing',
    description: 'A breathing technique to help you fall asleep faster and relax your body.',
    link: '/exercises/breathing-exercises',
    color: 'bg-yellow-500',
  }
];

const activityData = [
  { id: 1, activity: 'Completed Deep Breathing Exercise', date: '2024-09-26' },
  { id: 2, activity: 'Added a new habit: Meditation', date: '2024-09-24' },
  { id: 3, activity: 'Earned 50 points in Gamification!', date: '2024-09-23' }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Exercises = () => {
  return (
    <>
      <div>
        <Sidebar />
        <Head>
          <title>Relaxation Exercises - Mental Health Assistant</title>
        </Head>

        {/* Adjusted padding to account for the fixed header */}
        <div className="bg-gray-100 min-h-screen pt-24 px-4 md:pl-[290px] lg:pl-[290px] sm:pl-0">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Relaxation & Breathing Exercises</h1>
            <p className="text-lg text-gray-600 mb-8">Choose from a variety of exercises to help you relax and feel calm.</p>

            {/* Exercise Cards with Framer Motion Hover Effect */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {exercises.map((exercise) => (
                <motion.div
                  key={exercise.id}
                  className={`${exercise.color} text-white rounded-lg shadow-lg p-6`}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }} // Hover effect
                  transition={{ type: 'spring', stiffness: 100 }}
                  variants={cardVariants}
                >
                  <h2 className="text-xl font-bold mb-4">{exercise.name}</h2>
                  <p className="text-sm mb-6">{exercise.description}</p>
                  <Link href={exercise.link} className="bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 font-semibold">
                    Start {exercise.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* New Section: Habit Tracker & Gamification */}
            <motion.div 
              className="bg-white rounded-lg shadow-xl p-8 mb-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeInOut' } }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Habit Tracker & Gamification</h2>
              <p className="text-lg text-gray-600 mb-6">Track your habits, earn rewards, and stay motivated.</p>

              {/* Habit Tracker and Gamification Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Habit Tracker */}
                <motion.div 
                  className="bg-blue-100 rounded-lg p-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 120 }}
                >
                  <FaCalendarCheck className="text-blue-600 w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Habit Tracker</h3>
                  <p className="text-gray-600 mb-4">Stay on top of your daily goals and habits by tracking your progress over time.</p>
                  <Link href="/habit-tracker" className="text-blue-700 font-semibold hover:text-blue-500">View Habit Tracker</Link>
                </motion.div>

                {/* Gamification */}
                <motion.div 
                  className="bg-yellow-100 rounded-lg p-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 120 }}
                >
                  <FaTrophy className="text-yellow-600 w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Gamification</h3>
                  <p className="text-gray-600 mb-4">Earn points, badges, and rewards as you complete your exercises and stay engaged!</p>
                  <Link href="/gamification" className="text-yellow-700 font-semibold hover:text-yellow-500">Explore Rewards</Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Activity Log Section */}
            <motion.div
              className="bg-white rounded-lg shadow-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Recent Activities</h2>
              <p className="text-lg text-gray-600 mb-6">Keep track of your progress and achievements below.</p>
              <ul className="space-y-4">
                {activityData.map((activity) => (
                  <li key={activity.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center">
                    <span className="text-lg font-semibold">{activity.activity}</span>
                    <span className="text-sm text-gray-500">{activity.date}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Exercises;
