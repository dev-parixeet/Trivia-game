import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correct, incorrect } = location.state.score;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Results</h2>
        <p>Total Questions Served: 10</p>
        <p>Total Correct Questions: {correct}</p>
        <p>Total Incorrect Questions: {incorrect}</p>
        <button onClick={() => navigate('/')} className="px-4 py-2 bg-blue-500 text-white rounded mt-4">
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default Results;
