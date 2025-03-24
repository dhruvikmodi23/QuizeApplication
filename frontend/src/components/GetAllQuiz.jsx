import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "./QuizeService";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaListUl } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

const GetAllQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    if (window.confirm("Are you sure you want to delete this question?")) {
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
    }
  };

  const filteredQuestions = questions.filter(question =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Management</h1>
            <p className="text-gray-600 mt-2">View and manage all quiz questions</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <Link
              to="/create-quiz"
              className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <FaPlus className="mr-2" />
              Add Question
            </Link>
          </div>
        </div>

        {/* Success Message */}
        {deleteSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start">
            <FaCheck className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" />
            <div>
              <p className="font-medium">Success</p>
              <p>{deleteSuccess}</p>
            </div>
          </div>
        )}

        {/* Questions List */}
        {filteredQuestions.length > 0 ? (
          <div className="bg-white shadow-sm rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-100 px-6 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider">
              <div className="col-span-6">Question</div>
              <div className="col-span-3">Subject</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredQuestions.map((question, index) => (
                <div key={question.id} className="grid grid-cols-12 px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="col-span-6">
                    <h4 className="font-medium text-gray-900">{question.question}</h4>
                    <div className="mt-1 text-sm text-gray-500">
                      <div className="flex items-center">
                        <FaListUl className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                        {question.choices.length} options
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 flex items-center">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {question.subject || "General"}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      question.questionType === "single"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}>
                      {question.questionType === "single" ? "Single" : "Multiple"}
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-end space-x-2">
                    <Link
                      to={`/update-quiz/${question.id}`}
                      className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-md hover:bg-indigo-50 transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="text-red-600 hover:text-red-900 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-4">
              <FiAlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No questions found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? "No matches for your search." : "You haven't created any questions yet."}
            </p>
            <Link
              to="/create-quiz"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <FaPlus className="mr-2" />
              Create your first question
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllQuiz;