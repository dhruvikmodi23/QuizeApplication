import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../../utils/QuizService";

const QuizStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedNumQuestions, setSelectedNumQuestions] = useState("");
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const fetchSubjectData = async () => {
    try {
      const subjectsData = await getSubjects();
      setSubjects(subjectsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      if (selectedSubject && selectedNumQuestions) {
        navigate("/take-quiz", { state: { selectedNumQuestions, selectedSubject } });
      } else {
        alert("Please select a subject and number of questions.");
      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleNumQuestionsChange = (event) => {
    setSelectedNumQuestions(event.target.value);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Choose a subject:</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Number of questions:</h3>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={selectedNumQuestions}
              onChange={handleNumQuestionsChange}
              placeholder="Enter the number of questions"
            />
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">Confirmation</h2>
            <p className="text-gray-700">Subject: <span className="font-bold">{selectedSubject}</span></p>
            <p className="text-gray-700">Questions: <span className="font-bold">{selectedNumQuestions}</span></p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    const progress = currentStep === 3 ? 100 : ((currentStep - 1) / 2) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
        <h3 className="text-xl font-semibold text-gray-800 text-center">Welcome to Online Quiz</h3>
        {renderProgressBar()}

        {renderStepContent()}

        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {currentStep < 3 ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !selectedSubject) ||
                (currentStep === 2 && !selectedNumQuestions)
              }
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
              onClick={handleNext}
            >
              Start Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizStepper;
