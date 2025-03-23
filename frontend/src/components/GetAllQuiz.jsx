import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "./QuizeService";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const GetAllQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await getAllQuestions();
      setQuestions(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((question) => question.id !== id));
      setDeleteSuccess("Question deleted successfully.");
      setTimeout(() => {
        setDeleteSuccess("");
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">All Quiz Questions</h2>
          <Link
            to="/create-quiz"
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition"
          >
            <FaPlus /> <span>Add Question</span>
          </Link>
        </div>

        {/* Success Message */}
        {deleteSuccess && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md mb-4">
            {deleteSuccess}
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-gray-50 p-4 rounded-lg shadow">
              {/* Question */}
              <h4 className="text-lg font-semibold text-gray-800">
                {index + 1}. {question.question}
              </h4>

              {/* Choices */}
              <ul className="list-disc pl-5 text-gray-600 mt-2">
                {question.choices.map((choice, idx) => (
                  <li key={idx}>{choice}</li>
                ))}
              </ul>

              {/* Correct Answer */}
              <p className="text-green-600 font-medium mt-2">
                Correct Answer: {question.correctAnswers}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <Link
                  to={`/update-quiz/${question.id}`}
                  className="bg-yellow-500 text-white px-3 py-2 rounded-md flex items-center space-x-2 hover:bg-yellow-600 transition"
                >
                  <FaEdit /> <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md flex items-center space-x-2 hover:bg-red-600 transition"
                >
                  <FaTrash /> <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetAllQuiz;
