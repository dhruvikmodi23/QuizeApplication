import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import QuizStepper from "./components/QuizStepper";
import Quiz from "./components/Quiz";
import QuizResult from "./components/QuizResult";
import GetAllQuiz from "./components/GetAllQuiz";
import AddQuestion from "./components/AddQuestion";
import UpdateQuestion from "./components/UpdateQuestion";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Navigation */}
        <Navbar />
        
        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '12px',
              background: '#fff',
              color: '#374151',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz-stepper" element={<QuizStepper />} />
            <Route path="/take-quiz" element={<Quiz />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/create-quiz" element={<AddQuestion />} />
            <Route path="/update-quiz/:id" element={<UpdateQuestion />} />
            <Route path="/all-quizzes" element={<GetAllQuiz />} />
            <Route path="/quiz-result" element={<QuizResult />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-6 mt-12">
          <div className="container mx-auto px-4 sm:px-6 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} QuizMaster Pro. All rights reserved.</p>
            <div className="mt-2 flex justify-center space-x-4">
              <a href="#" className="hover:text-blue-600">Terms</a>
              <a href="#" className="hover:text-blue-600">Privacy</a>
              <a href="#" className="hover:text-blue-600">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;