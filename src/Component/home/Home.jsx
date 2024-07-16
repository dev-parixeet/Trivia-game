import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold mb-8">Welcome to Trivia Game</h1>
    <Link to="/quiz" className="px-6 py-3 bg-blue-500 text-white rounded-lg">
      Start Quiz
    </Link>
  </div>
);

export default Home;
