import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchQuizForUser } from "./QuizeService";
import AnswerOptions from "./AnswerOptions";

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScores, setTotalScores] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSubject, selectedNumQuestions } = location.state || {};

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    if (selectedNumQuestions && selectedSubject) {
      const questions = await fetchQuizForUser(selectedNumQuestions, selectedSubject);
      setQuizQuestions(questions);
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex((answerObj) => answerObj.id === questionId);
      const selectedAnswer = Array.isArray(answer) ? answer.map((a) => a.charAt(0)) : answer.charAt(0);

      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { id: questionId, answer: selectedAnswer };
        return updatedAnswers;
      } else {
        return [...prevAnswers, { id: questionId, answer: selectedAnswer }];
      }
    });
  };

  const handleSubmit = () => {
    let scores = 0;
    quizQuestions.forEach((question) => {
      const selectedAnswer = selectedAnswers.find((answer) => answer.id === question.id);
      if (selectedAnswer) {
        const selectedOptions = Array.isArray(selectedAnswer.answer)
          ? selectedAnswer.answer.map((option) => option.charAt(0))
          : [selectedAnswer.answer.charAt(0)];
        const correctOptions = Array.isArray(question.correctAnswers)
          ? question.correctAnswers.map((option) => option.charAt(0))
          : [question.correctAnswers.charAt(0)];

        if (
          selectedOptions.length === correctOptions.length &&
          selectedOptions.every((option) => correctOptions.includes(option))
        ) {
          scores++;
        }
      }
    });

    setTotalScores(scores);
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    navigate("/quiz-result", { state: { quizQuestions, totalScores: scores } });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6">
        {/* Question Counter */}
        <h3 className="text-lg font-semibold text-gray-700 text-center">
          Question {quizQuestions.length > 0 ? currentQuestionIndex + 1 : 0} of {quizQuestions.length}
        </h3>

        {/* Question Display */}
        <div className="mt-4">
          <h4 className="text-xl font-semibold text-gray-800 text-center mb-4">
            {quizQuestions[currentQuestionIndex]?.question}
          </h4>
        </div>

        {/* Answer Options */}
        <AnswerOptions
          question={quizQuestions[currentQuestionIndex]}
          handleAnswerChange={handleAnswerChange}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition disabled:opacity-50"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>

          <button
            className={`px-4 py-2 rounded-md transition ${
              currentQuestionIndex === quizQuestions.length - 1
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={handleNextQuestion}
            disabled={
              !selectedAnswers.find(
                (answer) => answer.id === quizQuestions[currentQuestionIndex]?.id
              )
            }
          >
            {currentQuestionIndex === quizQuestions.length - 1 ? "Submit Quiz" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
