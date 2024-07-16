import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=1");
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        ...response.data.results,
      ]);
      console.log(...response.data.results, "Question");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.correct_answer === selectedAnswer;

    setScore((prevScore) => ({
      ...prevScore,
      correct: prevScore.correct + (isCorrect ? 1 : 0),
      incorrect: prevScore.incorrect + (!isCorrect ? 1 : 0),
    }));

    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      if (currentQuestionIndex === questions.length - 1) {
        fetchQuestion();
      }
    } else {
      navigate("/results", { state: { score } });
    }
  };

  if (questions.length === 0)
    return (
      <div className="flex w-full text-2xl justify-center mt-44">
        Loading...
      </div>
    );

  const currentQuestion = questions[currentQuestionIndex];

  // Add a check to ensure currentQuestion is defined
  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2
          className="text-2xl font-bold mb-4"
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        />
        <div className="mb-4">
          {[
            ...currentQuestion.incorrect_answers,
            currentQuestion.correct_answer,
          ].map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(answer)}
              className={`block w-full px-4 py-2 mb-2 rounded ${
                selectedAnswer === answer
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {answer}
            </button>
          ))}
        </div>
        {showResult && (
          <div>
            {currentQuestion.correct_answer === selectedAnswer ? (
              <p className="text-green-500">Correct!</p>
            ) : (
              <div>
                <p className="text-red-500">
                  Incorrect! The correct answer is{" "}
                  {currentQuestion.correct_answer}
                </p>
              </div>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
            >
              Next
            </button>
          </div>
        )}
        {!showResult && (
          <button
            onClick={handleSubmit}
            className="flex justify-center px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
