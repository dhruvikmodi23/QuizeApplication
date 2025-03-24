import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchQuizForUser } from "./QuizeService";
import AnswerOptions from "./AnswerOptions";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSubject, selectedNumQuestions } = location.state || {};

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (quizQuestions.length > 0) {
      setProgress(((currentQuestionIndex + 1) / quizQuestions.length) * 100);
    }
  }, [currentQuestionIndex, quizQuestions]);

  const fetchQuizData = async () => {
    if (selectedNumQuestions && selectedSubject) {
      try {
        const questions = await fetchQuizForUser(selectedNumQuestions, selectedSubject);
        setQuizQuestions(questions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setIsLoading(false);
      }
    }
  };

  const handleAnswerSelection = (questionId, answer, isMultiple) => {
    setSelectedAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      
      if (isMultiple) {
        return {
          ...prev,
          [questionId]: currentAnswers.includes(answer)
            ? currentAnswers.filter(a => a !== answer)
            : [...currentAnswers, answer]
        };
      } else {
        return {
          ...prev,
          [questionId]: [answer]
        };
      }
    });
  };

  const handleSubmit = () => {
    let scores = 0;
    
    quizQuestions.forEach(question => {
      const userAnswers = selectedAnswers[question.id] || [];
      const correctAnswers = Array.isArray(question.correctAnswers)
        ? question.correctAnswers
        : [question.correctAnswers];
      
      const allCorrectSelected = correctAnswers.every(ca => 
        userAnswers.includes(ca)
      );
      const noIncorrectSelected = userAnswers.every(ua =>
        correctAnswers.includes(ua)
      );
      
      if (allCorrectSelected && noIncorrectSelected && userAnswers.length === correctAnswers.length) {
        scores++;
      }
    });

    navigate("/quiz-result", { 
      state: { 
        quizQuestions, 
        totalScores: scores,
        selectedSubject,
        selectedNumQuestions,
        selectedAnswers
      } 
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? selectedAnswers[currentQuestion.id] || [] : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-700">Preparing your quiz</h3>
          <p className="text-gray-500 mt-1">Loading questions about {selectedSubject}</p>
        </div>
      </div>
    );
  }

  if (!quizQuestions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Questions Available</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find enough questions for {selectedSubject}. Please try a different subject or fewer questions.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Quiz Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selectedSubject} Quiz</h2>
                <p className="text-sm text-gray-500">Test your knowledge</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                Question {currentQuestionIndex + 1}/{quizQuestions.length}
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-1.5 bg-gray-200 w-full">
            <div 
              className="h-full bg-blue-600 transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Question */}
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h3>
            
            {/* Answer Options */}
            <div className="space-y-3">
              <AnswerOptions
                question={currentQuestion}
                selectedAnswers={currentAnswer}
                onAnswerSelect={(answer) => handleAnswerSelection(
                  currentQuestion.id, 
                  answer, 
                  currentQuestion.questionType === "multiple"
                )}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center px-4 py-2 rounded-lg ${currentQuestionIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <FiArrowLeft className="mr-2" />
              Previous
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={currentAnswer.length === 0}
              className={`flex items-center px-4 py-2 rounded-lg ${currentAnswer.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : currentQuestionIndex === quizQuestions.length - 1 ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {currentQuestionIndex === quizQuestions.length - 1 ? (
                <>
                  <FiCheck className="mr-2" />
                  Submit Quiz
                </>
              ) : (
                <>
                  Next
                  <FiArrowRight className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quiz Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Quiz Tips</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>• Read each question carefully before answering</p>
                <p>• You can change your answers before submitting</p>
                <p>• Questions marked with multiple answers require all correct choices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;