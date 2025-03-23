import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionById, updateQuestion } from "./QuizeService";

const UpdateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const questionToUpdate = await getQuestionById(id);
      if (questionToUpdate) {
        setQuestion(questionToUpdate.question);
        setChoices(questionToUpdate.choices);
        setCorrectAnswers(questionToUpdate.correctAnswers.join(", "));
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChoiceChange = (index, e) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = e.target.value;
    setChoices(updatedChoices);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedQuestion = {
        question,
        choices,
        correctAnswers: correctAnswers.split(",").map((answer) => answer.trim()),
      };
      await updateQuestion(id, updatedQuestion);
      navigate("/all-quizzes");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Update Quiz Question
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Question Input */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Question:
            </label>
            <textarea
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          {/* Choices Input */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Choices:
            </label>
            {choices.map((choice, index) => (
              <input
                key={index}
                type="text"
                className="w-full p-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={choice}
                onChange={(e) => handleChoiceChange(index, e)}
              />
            ))}
          </div>

          {/* Correct Answers Input */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Correct Answer(s) (comma-separated):
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={correctAnswers}
              onChange={(e) => setCorrectAnswers(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition"
            >
              Update Question
            </button>
            <Link
              to="/all-quizzes"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
            >
              Back to All Questions
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuestion;
