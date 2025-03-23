import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
	return (
		<main className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
			<h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
				Welcome to <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">Online Quiz</span>
			</h2>
			<p className="text-lg md:text-xl text-gray-600 mb-8">
				Test your knowledge and challenge yourself with exciting quizzes!
			</p>
			 <Link to="/take-quiz">
				<button className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
					Start Quiz
				</button>
			</Link> 
		</main>
	)
}

export default Home
