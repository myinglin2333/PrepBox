import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div>
      <section className="hero">
        <h1>Welcome to PrepBox</h1>
        <p>
          Your all-in-one interview preparation toolkit. Ask questions, share
          experiences, and learn from the community.
        </p>

        {user ? (
          <div className="logged-in-banner">
            <p>
              👋 Welcome back, <strong>{user.username}</strong>!
            </p>
            <div className="hero-buttons">
              <Link to="/experiences" className="btn btn-primary">
                Share an Experience
              </Link>
              <Link to="/questions" className="btn btn-secondary">
                Browse Questions
              </Link>
            </div>
          </div>
        ) : (
          <div className="hero-buttons">
            <Link to="/auth" className="btn btn-primary">
              Login / Register
            </Link>
            <Link to="/experiences" className="btn btn-secondary">
              Browse Experiences
            </Link>
            <Link to="/questions" className="btn btn-secondary">
              Browse Questions
            </Link>
          </div>
        )}
      </section>

      {/* How to Use Section */}
      <section className="how-to-use">
        <h2>How to Use PrepBox</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Create an Account</h3>
            <p>
              Register with a username, email, and password to get started. Or
              log in with an existing account.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Browse Experiences</h3>
            <p>
              Read real interview experiences shared by the community. Filter by
              category to find relevant stories.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Share Your Story</h3>
            <p>
              Share your own interview experience to help others prepare. Add a
              title, category, and description.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Engage & Discuss</h3>
            <p>
              Reply to experiences, ask follow-up questions, and build a
              supportive community of job seekers.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <div className="feature-grid">
        <div className="card feature-card">
          <div className="icon">💡</div>
          <h3>Interview Questions</h3>
          <p>
            Browse and contribute interview questions with community answers.
          </p>
        </div>
        <div className="card feature-card">
          <div className="icon">📝</div>
          <h3>Share Experiences</h3>
          <p>Read and share real interview experiences from top companies.</p>
        </div>
        <div className="card feature-card">
          <div className="icon">🤝</div>
          <h3>Community Driven</h3>
          <p>Learn from others and help the community grow together.</p>
        </div>
      </div>

      {/* Demo Credentials */}
      <section className="demo-section">
        <div className="card">
          <h3>🔑 Demo Credentials</h3>
          <p>Try PrepBox right now using any of these test accounts:</p>
          <div className="demo-credentials">
            <code>Username: user1 — user10 &nbsp;|&nbsp; Password: 123456</code>
          </div>
          <p className="demo-note">
            Example: Log in with email <strong>user1@example.com</strong> and
            password <strong>123456</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
