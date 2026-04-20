import React, { useState } from "react";
import PropTypes from "prop-types";

export default function QuestionList({ questions, onDelete, onEdit, onReply }) {
  const [replyText, setReplyText] = useState({});
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const requireLogin = () => {
    alert("Please log in to reply to posts.");
    window.location.href = "/auth";
  };

  const handleReply = (questionId) => {
    if (!currentUser) {
      requireLogin();
      return;
    }

    const text = replyText[questionId];
    if (!text?.trim()) return;

    onReply(questionId, text);
    setReplyText({ ...replyText, [questionId]: "" });
  };

  if (questions.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#a8a29e", marginTop: "2rem" }}>
        No questions found in this category.
      </p>
    );
  }

  return (
    <div>
      {questions.map((q) => (
        <div className="card" key={q._id}>
          <h3>{q.title}</h3>

          {q.category && (
            <span className="category-badge">📁 {q.category}</span>
          )}

          <p><strong>Q:</strong> {q.question}</p>

          <div className="card-meta">
            <span>👤 {q.author}</span>
            <span>
              📅 {q.createdAt
                ? new Date(q.createdAt).toLocaleDateString()
                : ""}
            </span>
          </div>

          <div className="card-actions">
            {currentUser && currentUser.username === q.author && (
              <>
                <button
                  className="btn btn-secondary btn-small"
                  onClick={() => onEdit(q)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-small"
                  onClick={() => onDelete(q._id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>

          <div className="replies-section">
            <strong>{q.answers?.length || 0} Replies</strong>

            {q.answers?.map((a) => (
              <div className="reply" key={a._id}>
                <span className="reply-author">{a.author}:</span>
                {a.body}
              </div>
            ))}

            <div className="reply-input-row">
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyText[q._id] || ""}
                onChange={(e) =>
                  setReplyText({ ...replyText, [q._id]: e.target.value })
                }
                onFocus={() => {
                  if (!currentUser) requireLogin();
                }}
                readOnly={!currentUser}
              />
              <button
                className="btn btn-primary btn-small"
                onClick={() => handleReply(q._id)}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string,
      question: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      createdAt: PropTypes.string,
      answers: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          body: PropTypes.string.isRequired,
          author: PropTypes.string,
          createdAt: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
};
