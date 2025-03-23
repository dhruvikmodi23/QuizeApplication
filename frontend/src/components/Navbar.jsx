import React, { useState } from "react"
import { NavLink } from "react-router-dom"

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<nav className="bg-white/50 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50">
			<div className="container mx-auto px-5 py-4 flex justify-between items-center">
				{/* Brand Name */}
				<NavLink to="/" className="text-2xl font-bold text-blue-600">
					Online Quiz App
				</NavLink>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden text-gray-700 focus:outline-none"
					onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? (
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					) : (
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
						</svg>
					)}
				</button>

				{/* Navigation Links */}
				<ul className={`md:flex space-x-6 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 ${isOpen ? "block" : "hidden"} md:flex-row md:items-center md:gap-6 px-5 md:px-0 py-4 md:py-0 shadow md:shadow-none`}>
					<li>
						<NavLink
							to="/admin"
							className={({ isActive }) =>
								`block md:inline-block px-4 py-2 rounded-md transition duration-300 ${isActive ? "text-white bg-blue-600" : "text-gray-700 hover:text-blue-600"}`
							}>
							Admin
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/quiz-stepper"
							className={({ isActive }) =>
								`block md:inline-block px-4 py-2 rounded-md transition duration-300 ${isActive ? "text-white bg-blue-600" : "text-gray-700 hover:text-blue-600"}`
							}>
							Take Quiz
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
