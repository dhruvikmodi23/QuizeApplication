import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizQuestions, totalScores } = location.state || {};
  const numQuestions = quizQuestions?.length || 0;
  const percentage = numQuestions ? Math.round((totalScores / numQuestions) * 100) : 0;

  const getScoreMessage = () => {
    if (percentage >= 80) return { message: "Excellent! 🎉", color: "text-green-600" };
    if (percentage >= 50) return { message: "Good Job! 👍", color: "text-yellow-600" };
    return { message: "Keep Practicing! 💪", color: "text-red-600" };
  };

  const { message, color } = getScoreMessage();

  const handleRetakeQuiz = () => {
    navigate(-1); // Navigates back to quiz
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Quiz Result Summary</h2>
        <hr className="my-3 border-gray-300" />

        <h3 className={`text-lg font-semibold ${color}`}>{message}</h3>
        <p className="text-gray-700 mt-2">
          You answered <span className="font-bold">{totalScores}</span> out of{" "}
          <span className="font-bold">{numQuestions}</span> questions correctly.
        </p>

        <p className="mt-2 text-xl font-bold text-gray-800">
          Your Score: <span className={`${color}`}>{percentage}%</span>
        </p>

        <button
          onClick={handleRetakeQuiz}
          className="mt-5 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
