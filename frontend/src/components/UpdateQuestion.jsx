import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionById, updateQuestion } from "./QuizeService";
import { FiSave, FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";

const UpdateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    question: "",
    questionType: "single",
    choices: [""],
    correctAnswers: [""],
    subject: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const questionToUpdate = await getQuestionById(id);
      if (questionToUpdate) {
        setQuestion({
          ...questionToUpdate,
          correctAnswers: Array.isArray(questionToUpdate.correctAnswers) 
            ? questionToUpdate.correctAnswers 
            : [questionToUpdate.correctAnswers]
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion(prev => ({ ...prev, [name]: value }));
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...question.choices];
    updatedChoices[index] = value;
    setQuestion(prev => ({ ...prev, choices: updatedChoices }));
  };

  const handleAddChoice = () => {
    setQuestion(prev => ({ ...prev, choices: [...prev.choices, ""] }));
  };

  const handleRemoveChoice = (index) => {
    if (question.choices.length > 1) {
      const updatedChoices = question.choices.filter((_, i) => i !== index);
      setQuestion(prev => ({ ...prev, choices: updatedChoices }));
    }
  };

  const handleCorrectAnswerChange = (index, value) => {
    const updatedAnswers = [...question.correctAnswers];
    updatedAnswers[index] = value;
    setQuestion(prev => ({ ...prev, correctAnswers: updatedAnswers }));
  };

  const handleAddCorrectAnswer = () => {
    setQuestion(prev => ({ ...prev, correctAnswers: [...prev.correctAnswers, ""] }));
  };

  const handleRemoveCorrectAnswer = (index) => {
    if (question.correctAnswers.length > 1) {
      const updatedAnswers = question.correctAnswers.filter((_, i) => i !== index);
      setQuestion(prev => ({ ...prev, correctAnswers: updatedAnswers }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateQuestion(id, {
        ...question,
        correctAnswers: question.questionType === "single" 
          ? [question.correctAnswers[0]] 
          : question.correctAnswers
      });
      navigate("/all-quizzes");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
          >
            <FiArrowLeft className="mr-1" /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Update Question</h1>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Question Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setQuestion(prev => ({ ...prev, questionType: "single" }))}
                    className={`py-2 px-4 rounded-md border ${question.questionType === "single" 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'bg-white border-gray-300 text-gray-700'}`}
                  >
                    Single Answer
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestion(prev => ({ ...prev, questionType: "multiple" }))}
                    className={`py-2 px-4 rounded-md border ${question.questionType === "multiple" 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'bg-white border-gray-300 text-gray-700'}`}
                  >
                    Multiple Answers
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text
                </label>
                <textarea
                  id="question"
                  name="question"
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={question.question}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={question.subject}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>

              {/* Choices */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Answer Choices</label>
                <div className="space-y-2">
                  {question.choices.map((choice, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                        className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveChoice(index)}
                        disabled={question.choices.length <= 1}
                        className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddChoice}
                  className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="mr-1" /> Add Choice
                </button>
              </div>

              {/* Correct Answers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correct Answer{question.questionType === "multiple" ? "s" : ""}
                </label>
                <div className="space-y-2">
                  {question.correctAnswers.map((answer, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <select
                        value={answer}
                        onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                        className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      >
                        <option value="">Select correct answer</option>
                        {question.choices.map((choice, idx) => (
                          <option key={idx} value={choice}>
                            {choice}
                          </option>
                        ))}
                      </select>
                      {question.questionType === "multiple" && index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveCorrectAnswer(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {question.questionType === "multiple" && (
                  <button
                    type="button"
                    onClick={handleAddCorrectAnswer}
                    className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FiPlus className="mr-1" /> Add Correct Answer
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2" />
                      Update Question
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuestion;