import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { createQuestion, getSubjects } from "../../../utils/QuizService"

const AddQuestion = () => {
	const [question, setQuestionText] = useState("")
	const [questionType, setQuestionType] = useState("single")
	const [choices, setChoices] = useState([""])
	const [correctAnswers, setCorrectAnswers] = useState([""])
	const [subject, setSubject] = useState("")
	const [newSubject, setNewSubject] = useState("")
	const [subjectOptions, setSubjectOptions] = useState([])

	useEffect(() => {
		fetchSubjects()
	}, [])

	const fetchSubjects = async () => {
		try {
			const subjectsData = await getSubjects()
			setSubjectOptions(subjectsData)
		} catch (error) {
			console.error(error)
		}
	}

	const handleAddChoice = () => {
		setChoices([...choices, ""])
	}

	const handleRemoveChoice = (index) => {
		setChoices(choices.filter((_, i) => i !== index))
	}

	const handleChoiceChange = (index, value) => {
		setChoices(choices.map((choice, i) => (i === index ? value : choice)))
	}

	const handleCorrectAnswerChange = (index, value) => {
		setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)))
	}

	const handleAddCorrectAnswer = () => {
		setCorrectAnswers([...correctAnswers, ""])
	}

	const handleRemoveCorrectAnswer = (index) => {
		setCorrectAnswers(correctAnswers.filter((_, i) => i !== index))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const result = {
				question,
				questionType,
				choices,
				correctAnswers,
				subject
			}

			await createQuestion(result)

			setQuestionText("")
			setQuestionType("single")
			setChoices([""])
			setCorrectAnswers([""])
			setSubject("")
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<section className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
				<h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Add New Question</h2>

				<form onSubmit={handleSubmit} className="space-y-5">
					{/* Subject Selection */}
					<div>
						<label className="block text-gray-700 font-medium mb-1">Select a Subject</label>
						<select
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200">
							<option value="">Select subject</option>
							<option value="New">Add New</option>
							{subjectOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					</div>

					{/* New Subject Input */}
					{subject === "New" && (
						<div>
							<label className="block text-gray-700 font-medium mb-1">New Subject</label>
							<input
								type="text"
								value={newSubject}
								onChange={(event) => setNewSubject(event.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
							/>
						</div>
					)}

					{/* Question Input */}
					<div>
						<label className="block text-gray-700 font-medium mb-1">Question</label>
						<textarea
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
							rows={4}
							value={question}
							onChange={(e) => setQuestionText(e.target.value)}
						></textarea>
					</div>

					{/* Question Type */}
					<div>
						<label className="block text-gray-700 font-medium mb-1">Question Type</label>
						<select
							value={questionType}
							onChange={(e) => setQuestionType(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200">
							<option value="single">Single Answer</option>
							<option value="multiple">Multiple Answer</option>
						</select>
					</div>

					{/* Choices */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">Choices</label>
						{choices.map((choice, index) => (
							<div key={index} className="flex gap-2 mb-2">
								<input
									type="text"
									value={choice}
									onChange={(e) => handleChoiceChange(index, e.target.value)}
									className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
								/>
								<button
									type="button"
									onClick={() => handleRemoveChoice(index)}
									className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
									Remove
								</button>
							</div>
						))}
						<button
							type="button"
							onClick={handleAddChoice}
							className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
							Add Choice
						</button>
					</div>

					{/* Correct Answers */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">Correct Answer(s)</label>
						{correctAnswers.map((answer, index) => (
							<div key={index} className="flex gap-2 mb-2">
								<input
									type="text"
									value={answer}
									onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
									className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
								/>
								{index > 0 && (
									<button
										type="button"
										onClick={() => handleRemoveCorrectAnswer(index)}
										className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
										Remove
									</button>
								)}
							</div>
						))}
						{questionType === "multiple" && (
							<button
								type="button"
								onClick={handleAddCorrectAnswer}
								className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
								Add Correct Answer
							</button>
						)}
					</div>

					{/* Action Buttons */}
					<div className="flex gap-4">
						<button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
							Save Question
						</button>
						<Link to="/all-quizzes" className="w-full px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 text-center">
							Back to Questions
						</Link>
					</div>
				</form>
			</div>
		</section>
	)
}

export default AddQuestion
