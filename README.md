# Project 3 - PrepBox

## Overview

### Author
**Helly Niteshbhai Diyora**
diyora.h@northeastern.edu

**Lili Mei Ye** 
meiye.l@northeastern.edu

### Class Information
- [CS5610 Web Development](https://johnguerra.co/classes/webDevelopment_online_spring_2026/index.html)
- Spring 2026
- Northeastern University

### Links
- [PrepBox](https://prepbox-frontend.onrender.com/)
- [Design Document](./documents/designDocument.pdf)
- [Video Demonstration](https://youtu.be/IjTaETGWBCk?feature=shared)
- [Google Slides](./documents/prepBoxSlides.pdf)

## Project Objective
PrepBox is a web application designed to help students and job seekers prepare for interviews.

The goal of PrepBox is to:
- Help users practice interview questions
- Share real interview experiences
- Improve interview preparation
- Build a supportive learning community

## Technologies Used

- React
- Node.js
- Express
- MongoDB
- Vite

## Features
### Questions & Answers
- Add interview questions
- Edit and delete questions
- Browse questions by category
- View sample answers

### Experiences & Replies
- Share interview experiences
- Edit and delete posts
- Reply to posts
- Like/unlike posts
- Filter by category

### Login & Register
Login required for:
- Creating, editing, and deleting questions
- Posting, editing, and replying posts

## Screenshots
### Home Page
![Home](documents/Home.png)

### Questions Page
![Questions](documents/Questions.png)

### Experiences Page
![Experiences](documents/Experiences.png)

### Login/Register Page
![Login](documents/Login.png)


## Project Structure
```
PrepBox/
├── frontend/                    # Frontend files
│ ├── pages/                     # Page-level components
│ │ ├── AuthPage.jsx             # Login/Register page
│ │ ├── Experience.jsx           # Experiences page
│ │ ├── Home.jsx                 # Home page
│ │ └── QuestionsPage.jsx        # Questions page
│ │
│ ├── src/
│ │ ├── components/              # UI components
│ │ │ ├── Navbar/                # Navigation bar
│ │ │ ├── authForm/              # Login form component
│ │ │ ├── registerForm/          # Register form component
│ │ │ ├── experienceForm/        # Create/Edit experience
│ │ │ ├── experienceList/        # Experience list display
│ │ │ ├── questionForm/          # Create/Edit question
│ │ │ └── questionList/          # Question list display
│ │ │
│ │ ├── index.css                # Global styles
│ │ └── index.jsx                # React entry point
│ │
│ └── index.html                 # HTML entry file
│
├── backend/                     # Backend
│ ├── controllers/               # Business logic
│ │ ├── ExperienceController.js  # Experiences logic
│ │ ├── InterviewController.js   # Questions logic
│ │ └── authController.js        # Authentication logic
│ │
│ ├── routes/                    # API routes
│ │ ├── ExperiencePosts.js       # Experience endpoints
│ │ ├── InterviewQuestions.js    # Question endpoints
│ │ └── auth.js                  # Auth endpoints
│ │
│ ├── db/
│ │ └── mongo.js                 # MongoDB connection
│ │
│ ├── data/
│ │ └── seedData.js              # Seed script
│ │
│ ├── server.js                  # Express server entry
│ ├── package.json               # Backend dependencies
│ └── env.example                # Environment variables template
│
│
│── documents/                   # Folder to store screenshots & design document
│
├── .gitignore                   # Git ignore rules
├── LICENSE                      # MIT License
└── README.md                    # Project documentation
```

## How to Run the Project
### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Setup

**Clone the repository**
```bash
git clone https://github.com/myinglin2333/PrepBox.git
cd PrepBox
```

**Backend**
```bash
cd backend
npm install
npm start
```

**Seed Data**
```bash
node data/seedData.js
```

**Frontend**
```bash
cd ../frontend
npm install
npm run dev
```

**Open in browser**
```bash
http://localhost:5173
```

## License
This project is licensed under the **MIT License**.

See the [MIT License](LICENSE) file for details

---

## Peer Review

*Reviewed by [Jinam Shah](https://github.com/Jinam-Shah) as part of CS5610 Spring 2026 peer review.*

**What stood out:** The like/unlike and replies feature on the Experiences page is
genuinely impressive - it makes the app feel like a real community platform. 
Code organization, PropTypes, and CSS-per-component structure are all on point.

**Suggested fixes (see PRs):**
- Added `"Marketing"` to the Experiences filter chip array to match the form dropdown.
- Removed empty `authForm` and `registerForm` placeholder files that exported `null`.

**One thing to look into:**
- The rubric requires authentication to be implemented using **Passport.js** (`passport-local` strategy, `passport.initialize()`, `passport.session()`). Current auth uses a plain fetch + localStorage approach, which works great for UX but may not satisfy that rubric criteria.
