"use client"
// pages/quizzes.js
import { useState } from 'react';
import Head from 'next/head';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "How often do you feel anxious?",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always"
      ],
    },
    {
      question: "Do you have trouble sleeping?",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always"
      ],
    },
    {
      question: "How would you rate your overall mood?",
      options: [
        "Very Bad",
        "Bad",
        "Neutral",
        "Good",
        "Very Good"
      ],
    },
    {
      question: "Do you often feel overwhelmed?",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always"
      ],
    },
  ];

  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
  };

  return (
    <>
      <Head>
        <title>Self-Assessment Quizzes - Mental Health Assistant</title>
      </Head>
      <div className="bg-gray-50 min-h-screen pt-16 px-6 flex flex-col items-center">
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Self-Assessment Quizzes</h1>

          {showResults ? (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Results</h2>
              <p className="text-gray-600">You answered:</p>
              <ul className="list-disc list-inside space-y-2">
                {userAnswers.map((answer, index) => (
                  <li key={index} className="text-gray-800">Q{index + 1}: {answer}</li>
                ))}
              </ul>
              <button
                className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={resetQuiz}
              >
                Take Quiz Again
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{questions[currentQuestion].question}</h2>
              <ul className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <li key={index}>
                    <button
                      className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100"
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
