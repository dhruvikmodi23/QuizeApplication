# Quiz Application - Full Stack Quiz Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

A complete quiz application with admin panel built using React frontend and Spring Boot backend.

## Features

### User Features
- Take quizzes on various subjects
- Multiple choice questions (single/multiple answers)
- Real-time progress tracking
- Detailed results with correct answers
- Quiz retake option

### Admin Features
- Full CRUD operations for questions
- Subject management
- Question type management (single/multiple answer)
- Dashboard with all questions
- Bulk operations

## Tech Stack

**Frontend:**
- React 18
- React Router 6
- Tailwind CSS
- Axios
- React Icons
- Vite

**Backend:**
- Spring Boot 3.1.5
- Spring Data JPA
- MySQL
- Maven
- Lombok

## System Architecture
 
 quiz-application/
├── frontend/ # React application
│ ├── public/ # Static assets
│ ├── src/ # Source code
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Application screens
│ │ ├── services/ # API service layer
│ └── vite.config.js # Vite configuration
└── backend/ # Spring Boot application
├── src/main/java/com/dhruvik/quizapp/
│ ├── controller/ # REST API endpoints
│ ├── model/ # Entity classes
│ ├── repository/ # Database repositories
│ ├── service/ # Business logic
│ └── QuizAppApplication.java # Main class
└── pom.xml # Maven dependencies




## Installation

### Prerequisites
- JDK 17+
- Node.js 16+
- MySQL 8.0+
- Maven

### Backend Setup
1. Create MySQL database:
   ```sql
   CREATE DATABASE quizdb;
   spring.datasource.url=jdbc:mysql://localhost:3306/quizdb

Configure application.properties:
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

Run the Spring Boot application:
cd backend
mvn spring-boot:run

Frontend Setup
Install dependencies:

cd frontend
npm install
Configure API base URL in src/services/QuizeService.js if needed

Start development server:
npm run dev

API Endpoints
Endpoint	Method	Description
/api/questions	GET	Get all questions
/api/questions/{id}	GET	Get question by ID
/api/questions	POST	Create new question
/api/questions/{id}	PUT	Update question
/api/questions/{id}	DELETE	Delete question
/api/questions/subjects	GET	Get all subjects
/api/quizzes/generate	POST	Generate new quiz

Screenshots
Include screenshots of:

Home Page

Quiz Taking Interface

Results Page

Admin Dashboard



Future Enhancements
-->User authentication
-->Time-based quizzes
-->Leaderboard system


Contributing
Contributions are welcome! Please follow these steps:

1.Fork the repository
2.Create your feature branch (git checkout -b feature/your-feature)
3.Commit your changes (git commit -m 'Add some feature')
4.Push to the branch (git push origin feature/your-feature)
5.Open a Pull Request


📄 License
Distributed under the MIT License. See LICENSE for more information.

<h2>📬 Contact</h2>
Dhruvik Modi - https://github.com/dhruvikmodi23
<br/>
Project Link: https://github.com/dhruvikmodi23/QuizeApplication

<br/>
<br/>
