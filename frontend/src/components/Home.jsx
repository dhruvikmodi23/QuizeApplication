import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentGradient, setCurrentGradient] = useState(0);
  const gradients = [
    "from-indigo-500 via-purple-500 to-pink-500",
    "from-emerald-500 via-teal-500 to-cyan-500",
    "from-amber-500 via-orange-500 to-red-500"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-400"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3,
              filter: 'blur(60px)',
              animation: `float ${Math.random() * 20 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Header/Navigation placeholder */}
      {/* <header className="w-full py-6 px-8 flex justify-between items-center z-10">
        <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          QuizMaster Pro
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition">Features</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition">Leaderboard</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition">About</a>
        </nav>
        <button className="px-4 py-2 rounded-lg bg-white shadow-sm text-sm font-medium">
          Sign In
        </button>
      </header> */}

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 z-10">
        <div className="max-w-4xl w-full">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="p-10 md:p-14">
              <div className="flex justify-center mb-6">
                <div className={`h-1.5 w-24 bg-gradient-to-r ${gradients[currentGradient]} rounded-full transition-all duration-1000`}></div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6">
                <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Test Your </span>
                <span className={`bg-gradient-to-r ${gradients[currentGradient]} bg-clip-text text-transparent`}>
                  Knowledge
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto leading-relaxed mb-10">
                Join our community of learners and challenge yourself with professionally crafted quizzes across various topics.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/take-quiz" className="flex-1 sm:flex-none">
                  <button className={`w-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r ${gradients[currentGradient]} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group`}>
                    <span className="relative z-10 flex items-center justify-center">
                      Start Quiz Now
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </Link>
                
                {/* <button className="flex-1 sm:flex-none px-8 py-4 text-lg font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                  Explore Categories
                </button> */}
              </div>
            </div>
            
            <div className="bg-gray-50/80 border-t border-gray-100 p-6">
              <div className="flex flex-wrap justify-center gap-6 text-center">
                <div className="px-4">
                  <div className="text-2xl font-bold text-gray-800">10,000+</div>
                  <div className="text-gray-500">Active Users</div>
                </div>
                <div className="px-4">
                  <div className="text-2xl font-bold text-gray-800">500+</div>
                  <div className="text-gray-500">Quizzes</div>
                </div>
                <div className="px-4">
                  <div className="text-2xl font-bold text-gray-800">50+</div>
                  <div className="text-gray-500">Categories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating quiz cards */}
      <div className="hidden lg:block absolute bottom-10 left-10 w-48 h-64 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 transform rotate-6 transition-all hover:rotate-0">
        <div className="p-4 h-full flex flex-col">
          <div className="h-3 w-8 bg-purple-400 rounded-full mb-3"></div>
          <div className="text-sm font-medium text-gray-500 mb-1">Programming</div>
          <div className="text-lg font-bold text-gray-800 mb-2">C++</div>
          <div className="text-xs text-gray-400 mb-4">15 questions</div>
          <div className="mt-auto w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full w-3/4"></div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute top-20 right-10 w-48 h-64 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 transform -rotate-3 transition-all hover:rotate-0">
        <div className="p-4 h-full flex flex-col">
          <div className="h-3 w-8 bg-blue-400 rounded-full mb-3"></div>
          <div className="text-sm font-medium text-gray-500 mb-1">DBMS</div>
          <div className="text-lg font-bold text-gray-800 mb-2">MySQL</div>
          <div className="text-xs text-gray-400 mb-4">20 questions</div>
          <div className="mt-auto w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
          </div>
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
      `}</style>
    </main>
  );
};

export default Home;