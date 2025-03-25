## 🎯 QuizMaster - Full Stack Quiz Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

A modern, interactive quiz platform with comprehensive admin controls built with React and Spring Boot.

## ✨ Features

### 🧑‍💻 User Experience
- 🎮 Interactive quiz interface with smooth animations
- 📊 Real-time progress tracking with visual indicators
- 🔍 Multiple question types (Single/Multiple choice)
- 📝 Detailed results with explanations
- 🔄 Quiz retake option with shuffled questions

### 👨‍💼 Admin Superpowers
- 🛠️ Full CRUD operations for questions and quizzes
- 📚 Subject and category management
- 📊 Dashboard with analytics and insights
- ⚡ Bulk import/export functionality
- 🔒 Role-based access control

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | Core framework |
| React Router 6 | Navigation |
| Tailwind CSS | Styling |
| Axios | HTTP client |
| Framer Motion | Animations |
| Vite | Build tool |

### Backend
| Technology | Purpose |
|------------|---------|
| Spring Boot 3.1.5 | REST API framework |
| Spring Security | Authentication |
| Spring Data JPA | Database operations |
| MySQL 8.0 | Database |
| Lombok | Boilerplate reduction |
| Maven | Dependency management |

## 🏗️ System Architecture

```bash
quiz-application/
├── frontend/          # React application
│   ├── public/        # Static assets
│   └── src/           # Source code
│       ├── assets/    # Images, fonts
│       ├── components # Reusable UI
│       ├── context/   # State management
│       ├── hooks/     # Custom hooks
│       ├── pages/     # Application screens
│       ├── services/  # API service layer
│       └── utils/     # Helper functions
└── backend/           # Spring Boot application
    ├── src/main/java/com/quizmaster/
    │   ├── config/    # Security config
    │   ├── controller # REST endpoints
    │   ├── dto/       # Data transfer objects
    │   ├── exception/ # Exception handling
    │   ├── model/     # Entities
    │   ├── repository # Database repos
    │   ├── service/   # Business logic
    │   └── security/  # Auth components
    └── pom.xml        # Maven config
```



## 🚀 Quick Start

### Prerequisites
- Java 17 JDK
- Node.js 18+
- MySQL 8.0+
- Maven 3.8+

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/dhruvikmodi23/QuizMaster-Pro.git
cd QuizMaster-Pro/backend
```
# Configure database
```
mysql -u root -p -e "CREATE DATABASE quizdb; CREATE USER 'quizuser'@'localhost' IDENTIFIED BY 'quizpass'; GRANT ALL PRIVILEGES ON quizdb.* TO 'quizuser'@'localhost';"
```
# Update application.properties
```
echo "
spring.datasource.url=jdbc:mysql://localhost:3306/quizdb
spring.datasource.username=quizuser
spring.datasource.password=quizpass
spring.jpa.hibernate.ddl-auto=update
" > src/main/resources/application.properties
```
# Run the application
mvn spring-boot:run
Frontend Setup
```bash
cd ../frontend
```

# Install dependencies
```bash
npm install
```
# Configure environment
cp .env.example .env

# Start development server
npm run dev
🌐 API Reference
Endpoint	Method	Description
/api/auth/**	POST	Authentication endpoints
/api/questions	GET	Paginated question list
/api/questions/{id}	GET	Question details
/api/questions	POST	Create new question
/api/questions/search	GET	Search questions
/api/quizzes/generate	POST	Generate new quiz
/api/results	POST	Submit quiz results

🔮 Future Roadmap
🎯 User Authentication (OAuth2 integration)

⏱️ Timed Quizzes with countdown timer

🏆 Leaderboard System with badges

🤖 AI Question Generation using GPT-3.5

📱 Mobile App (React Native version)

🤝 Contributing Guide
We welcome contributions from the community! Here's how you can help:

🍴 Fork the repository

🌿 Create a feature branch (git checkout -b feature/awesome-feature)

💾 Commit your changes (git commit -m 'Add awesome feature')

📤 Push to the branch (git push origin feature/awesome-feature)

🔀 Open a Pull Request

Please follow our Code of Conduct and Contribution Guidelines.

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

📬 Connect With Us
<div align="center"> <a href="https://github.com/dhruvikmodi23"> <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"> </a> <a href="https://www.linkedin.com/in/dhruvik-modi-291628248/"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"> </a> <a href="mailto:dhruvikmodi23@example.com"> <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"> </a> </div><p align="center"> <a href="https://github.com/dhruvikmodi23/QuizMaster-Pro"> 🌟 Star this project on GitHub </a> </p>
