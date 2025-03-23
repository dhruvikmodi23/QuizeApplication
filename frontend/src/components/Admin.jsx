import React from "react"
import { Link } from "react-router-dom"

const Admin = () => {
	return (
		<section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-center">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
				<p className="text-gray-600 mb-6">Manage quizzes and create new ones.</p>
				<hr className="mb-6 border-gray-300" />
				
				{/* Navigation Links */}
				<div className="flex flex-col space-y-4">
					<Link
						to="/create-quiz"
						className="w-full px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
						Create a New Quiz
					</Link>
					<Link
						to="/all-quizzes"
						className="w-full px-5 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
						Manage Existing Quizzes
					</Link>
				</div>
			</div>
		</section>
	)
}

export default Admin
