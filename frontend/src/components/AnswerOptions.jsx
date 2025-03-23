import React from "react";

const AnswerOptions = ({ question, isChecked, handleAnswerChange, handleCheckboxChange }) => {
  if (!question) {
    return (
      <div className="text-center bg-red-100 text-red-600 p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold">No questions available</p>
        <p className="text-sm">Try again by reducing the number of requested questions.</p>
      </div>
    );
  }

  const { id, questionType, choices } = question;

  if (questionType === "single") {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        {choices.sort().map((choice, index) => (
          <label key={choice} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <input
              type="radio"
              id={choice}
              name={question.id}
              value={choice}
              checked={isChecked(question.id, choice)}
              onChange={() => handleAnswerChange(id, choice)}
              className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-400"
            />
            <span className="text-gray-700">{choice}</span>
          </label>
        ))}
      </div>
    );
  } else if (questionType === "multiple") {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        {choices.sort().map((choice, index) => (
          <label key={choice} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              id={choice}
              name={question.id}
              value={choice}
              checked={isChecked(question.id, choice)}
              onChange={() => handleCheckboxChange(id, choice)}
              className="w-5 h-5 text-green-500 border-gray-300 focus:ring-green-400"
            />
            <span className="text-gray-700">{choice}</span>
          </label>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default AnswerOptions;
