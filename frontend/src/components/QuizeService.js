import axios from "axios";

// Base API Configuration
export const api = axios.create({
  baseURL: "http://localhost:8081/api/quizzes",
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic Error Handler
const handleApiError = (error) => {
  console.error("API Error:", error.response?.data?.message || error.message);
  return null;
};

// Create a New Question
export const createQuestion = async (quizQuestion) => {
  try {
    const response = await api.post("/create-new-question", quizQuestion);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch All Questions
export const getAllQuestions = async () => {
  try {
    const response = await api.get("/all-questions");
    return response.data || [];
  } catch (error) {
    return handleApiError(error) || [];
  }
};

// Fetch Quiz Questions for a User
export const fetchQuizForUser = async (number, subject) => {
  try {
    const response = await api.get(
      `/quiz/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`
    );
    return response.data || [];
  } catch (error) {
    return handleApiError(error) || [];
  }
};

// Get Available Subjects
export const getSubjects = async () => {
  try {
    const response = await api.get("/subjects");
    return response.data || [];
  } catch (error) {
    return handleApiError(error) || [];
  }
};

// Update an Existing Question
export const updateQuestion = async (id, question) => {
  try {
    const response = await api.put(`/question/${id}/update`, question);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get a Question by ID
export const getQuestionById = async (id) => {
  try {
    const response = await api.get(`/question/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete a Question
export const deleteQuestion = async (id) => {
  try {
    const response = await api.delete(`/question/${id}/delete`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
