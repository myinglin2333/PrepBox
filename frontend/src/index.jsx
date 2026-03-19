import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "../pages/Home.jsx";
import AuthPage from "../pages/AuthPage.jsx";
import QuestionsPage from "../pages/QuestionsPage.jsx";
import Experience from "../pages/Experience.jsx";
import "./index.css";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/experiences" element={<Experience />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-brand">📦 PrepBox</p>
          <p className="footer-text">A community-driven interview preparation platform</p>
          <div className="footer-authors">
            <span>Built by <strong>Helly Niteshbhai Diyora</strong> &amp; <strong>Lili Mei Ye</strong></span>
          </div>
          <p className="footer-course">CS5610 Web Development · Spring 2026 · Northeastern University</p>
        </div>
      </footer>
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
