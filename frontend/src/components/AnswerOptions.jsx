import React from "react";

const AnswerOptions = ({ question, selectedAnswers = [], onAnswerSelect }) => {
  if (!question) {
    return (
      <div className="text-center bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl shadow-sm border border-red-100">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No questions available</h3>
        <p className="text-sm text-gray-600">
          Please adjust your quiz settings or try a different subject.
        </p>
      </div>
    );
  }

  const { id, questionType, choices } = question;

  const renderOption = (choice, index) => (
    <label
      key={`${id}-${index}`}
      className={`flex items-start space-x-3 p-4 rounded-xl transition-all duration-200 cursor-pointer ${
        selectedAnswers.includes(choice)
          ? questionType === "single"
            ? "bg-blue-50 border border-blue-200"
            : "bg-green-50 border border-green-200"
          : "hover:bg-gray-50 border border-transparent"
      }`}
    >
      <div className="flex items-center h-5 mt-0.5">
        {questionType === "single" ? (
          <input
            type="radio"
            name={id}
            checked={selectedAnswers.includes(choice)}
            onChange={() => onAnswerSelect(choice)}
            className="h-5 w-5 text-blue-500 border-gray-300 focus:ring-blue-400"
          />
        ) : (
          <input
            type="checkbox"
            checked={selectedAnswers.includes(choice)}
            onChange={() => onAnswerSelect(choice)}
            className="h-5 w-5 text-green-500 border-gray-300 focus:ring-green-400 rounded"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-gray-800 font-medium">{choice}</p>
      </div>
      {selectedAnswers.includes(choice) && (
        <div className="flex-shrink-0">
          {questionType === "single" ? (
            <svg
              className="h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      )}
    </label>
  );

  return (
    <div className="space-y-3">
      {choices.sort().map((choice, index) => renderOption(choice, index))}
    </div>
  );
};

export default AnswerOptions;