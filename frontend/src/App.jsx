import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import QuizStepper from "./components/QuizStepper"
import Quiz from "./components/Quiz"
import QuizResult from "./components/QuizResult"
import GetAllQuiz from "./components/GetAllQuiz"
import AddQuestion from "./components/AddQuestion"
import UpdateQuestion from "./components/UpdateQuestion"
import Navbar from "./components/Navbar"
import Admin from "./components/Admin"

function App() {
	return (
		<div className="container mx-auto p-5">
			<Router>
				<Navbar />
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
			</Router>
		</div>
	)
}

export default App
