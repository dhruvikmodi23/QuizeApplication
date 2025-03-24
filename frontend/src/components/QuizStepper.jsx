import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "./QuizeService";
import { FiChevronLeft, FiChevronRight, FiCheck } from "react-icons/fi";

const QuizStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedNumQuestions, setSelectedNumQuestions] = useState(10);
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
      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const steps = [
    { id: 1, name: 'Subject Selection' },
    { id: 2, name: 'Questions Count' },
    { id: 3, name: 'Confirmation' }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Select a quiz subject</h3>
              <p className="text-sm text-gray-500 mb-4">Choose the topic you want to be tested on</p>
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${selectedSubject === subject 
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
                  >
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-3 ${selectedSubject === subject ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                      <span className="font-medium text-gray-800">{subject}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Number of questions</h3>
              <p className="text-sm text-gray-500 mb-4">Select how many questions you want to answer (5-20)</p>
              <div className="flex flex-col space-y-4">
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={selectedNumQuestions}
                  onChange={(e) => setSelectedNumQuestions(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 font-bold rounded-lg">
                    {selectedNumQuestions} Questions
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                <FiCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to start your quiz!</h3>
              <div className="bg-white rounded-lg p-4 shadow-inner text-left max-w-xs mx-auto">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Subject:</span>
                  <span className="font-medium">{selectedSubject}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Questions:</span>
                  <span className="font-medium">{selectedNumQuestions}</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && !selectedSubject) return true;
    if (currentStep === 2 && !selectedNumQuestions) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Progress Steps */}
        <div className="px-6 pt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Setup</h2>
          <p className="text-gray-600 mb-6">Follow these steps to start your quiz</p>
          
          <nav className="flex items-center justify-center" aria-label="Progress">
            <ol className="flex items-center space-x-4 w-full">
              {steps.map((step) => (
                <li key={step.name} className="flex-1">
                  {step.id < currentStep ? (
                    <div className="group flex flex-col items-center">
                      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600">
                        <svg
                          className="h-5 w-5 text-white"
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
                      </span>
                      <span className="mt-2 text-xs font-medium text-blue-600">{step.name}</span>
                    </div>
                  ) : step.id === currentStep ? (
                    <div className="flex flex-col items-center" aria-current="step">
                      <span className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-blue-600 bg-white">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                      </span>
                      <span className="mt-2 text-xs font-medium text-blue-600">{step.name}</span>
                    </div>
                  ) : (
                    <div className="group flex flex-col items-center">
                      <span className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-gray-300 bg-white">
                        <span className="h-2.5 w-2.5 rounded-full bg-transparent"></span>
                      </span>
                      <span className="mt-2 text-xs font-medium text-gray-500">{step.name}</span>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Step Content */}
        <div className="px-6 py-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center px-4 py-2 rounded-lg ${currentStep === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-gray-200'}`}
          >
            <FiChevronLeft className="mr-2" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={isNextDisabled()}
            className={`flex items-center px-4 py-2 rounded-lg ${isNextDisabled() 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : currentStep === 3 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {currentStep === 3 ? (
              <>
                Start Quiz
                <FiChevronRight className="ml-2" />
              </>
            ) : (
              <>
                Next
                <FiChevronRight className="ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizStepper;