"use client"
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; // Importing icons from React Icons

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // On initial load, check if dark mode is saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    
        <button
          className=" opacity-70 dark:bg-gray-700 p-2 rounded-full focus:outline-none"
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <FiSun className="w-5 h-5 text-white" /> // Sun icon for light mode
          ) : (
            <FiMoon className="w-5 h-5 text-gray-800" /> // Moon icon for dark mode
          )}
        </button>
  );
};

export default DarkModeToggle;
