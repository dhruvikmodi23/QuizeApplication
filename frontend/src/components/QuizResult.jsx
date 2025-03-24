import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrophy, FaRedo, FaChartBar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizQuestions = [], totalScores = 0, selectedSubject, selectedAnswers = {} } = location.state || {};
  const numQuestions = quizQuestions.length;
  const percentage = numQuestions ? Math.round((totalScores / numQuestions) * 100) : 0;
  const correctCount = totalScores;
  const incorrectCount = numQuestions - correctCount;

  const getScoreMessage = () => {
    if (percentage >= 90) return { 
      message: "Outstanding Performance!", 
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      icon: <FaTrophy className="text-emerald-500" />
    };
    if (percentage >= 70) return { 
      message: "Great Job!", 
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      icon: <FaCheckCircle className="text-blue-500" />
    };
    if (percentage >= 50) return { 
      message: "Good Effort!", 
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      icon: <FaChartBar className="text-amber-500" />
    };
    return { 
      message: "Keep Practicing!", 
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      icon: <FaTimesCircle className="text-rose-500" />
    };
  };

  const { message, color, bgColor, icon } = getScoreMessage();

  const handleRetakeQuiz = () => {
    navigate(-1);
  };

  const handleNewQuiz = () => {
    navigate("/quiz-selection");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Result Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quiz Results: <span className="text-blue-600">{selectedSubject || "General Knowledge"}</span>
          </h1>
          <p className="text-lg text-gray-600">See how you performed on your quiz</p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          {/* Score Summary */}
          <div className={`${bgColor} p-6 text-center`}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
              <div className="text-3xl">{icon}</div>
            </div>
            <h2 className={`text-2xl font-bold ${color} mb-2`}>{message}</h2>
            <div className="text-5xl font-bold text-gray-900 mb-2">{percentage}%</div>
            <p className="text-gray-600">
              {correctCount} correct {correctCount === 1 ? "answer" : "answers"} out of {numQuestions}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="p-6 text-center">
              <div className="text-green-500 text-2xl font-bold mb-1">{correctCount}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Correct</div>
            </div>
            <div className="p-6 text-center">
              <div className="text-red-500 text-2xl font-bold mb-1">{incorrectCount}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Incorrect</div>
            </div>
          </div>
        </div>

        {/* Progress Visualization */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Correct Answers</span>
                <span>{correctCount}/{numQuestions}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${(correctCount / numQuestions) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Incorrect Answers</span>
                <span>{incorrectCount}/{numQuestions}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-red-500 h-2.5 rounded-full" 
                  style={{ width: `${(incorrectCount / numQuestions) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleRetakeQuiz}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            <FaRedo className="mr-2" />
            Retake This Quiz
          </button>
          <button
            onClick={handleNewQuiz}
            className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-50 transition-colors"
          >
            Try Another Quiz
          </button>
        </div>

        {/* Review Section */}
        {quizQuestions.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Question Review</h3>
            <div className="space-y-4">
              {quizQuestions.map((question, index) => {
                const userAnswers = selectedAnswers[question.id] || [];
                const correctAnswers = Array.isArray(question.correctAnswers) 
                  ? question.correctAnswers 
                  : [question.correctAnswers];
                
                // Check if all correct answers are selected and no incorrect ones
                const allCorrectSelected = correctAnswers.every(ca => 
                  userAnswers.includes(ca)
                );
                const noIncorrectSelected = userAnswers.every(ua =>
                  correctAnswers.includes(ua)
                );
                const isCorrect = allCorrectSelected && noIncorrectSelected && userAnswers.length === correctAnswers.length;

                return (
                  <div key={index} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900">
                        {index + 1}. {question.question}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Your answer:</span> {userAnswers.join(", ") || "No answer selected"}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Correct answer:</span> {correctAnswers.join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizResult;