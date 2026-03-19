import React from "react";

export default function QuestionList({ questions, onDelete, onEdit }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

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

          {q.answers && q.answers.length > 0 && (
            <div>
              <strong>A:</strong>
              {q.answers.map((a) => (
                <span key={a._id} style={{ marginLeft: "0.5rem"}}>
                  {a.body}
                </span>
              ))}
            </div>
          )}

          <div className="card-meta">
            <span>👤 {q.author}</span>
            <span>
              📅 {q.createdAt ? new Date(q.createdAt).toLocaleDateString() : ""}
            </span>
          </div>

          <div className="card-actions">
            {user && user.username === q.author && (
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
        </div>
      ))}
    </div>
  );
}