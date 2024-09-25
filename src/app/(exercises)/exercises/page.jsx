// pages/exercises.js
import Head from 'next/head';
import Link from 'next/link';

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

const Exercises = () => {
  return (
    <>
      <Head>
        <title>Relaxation Exercises - Mental Health Assistant</title>
      </Head>

      {/* Adjusted padding to account for the fixed header */}
      <div className="bg-gray-100 min-h-screen pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Relaxation & Breathing Exercises</h1>
          <p className="text-lg text-gray-600 mb-8">Choose from a variety of exercises to help you relax and feel calm.</p>

          {/* Exercise Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <div key={exercise.id} className={`${exercise.color} text-white rounded-lg shadow-lg p-6`}>
                <h2 className="text-xl font-bold mb-4">{exercise.name}</h2>
                <p className="text-sm mb-6">{exercise.description}</p>
                <Link href={exercise.link} className="bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 font-semibold">
                  Start {exercise.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Exercises;
