import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ExperienceList({
  experiences,
  onDelete,
  onEdit,
  onReply,
  onLike,
}) {
  const [replyText, setReplyText] = useState({});
  const currentUser = JSON.parse(localStorage.getItem('user') || 'null');

  const handleReply = (expId) => {
    const text = replyText[expId];
    if (!text?.trim()) return;
    onReply(expId, text);
    setReplyText({ ...replyText, [expId]: '' });
  };

  if (experiences.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#a8a29e', marginTop: '2rem' }}>
        No experiences found in this category.
      </p>
    );
  }

  return (
    <div>
      {experiences.map((exp) => {
        const likes = exp.likes || [];
        const isLiked = currentUser && likes.includes(currentUser.username);

        return (
          <div className="card" key={exp._id}>
            <h3>{exp.title}</h3>
            {exp.category && (
              <span className="category-badge">📁 {exp.category}</span>
            )}
            <p>{exp.body}</p>

            <div className="card-meta">
              <span>👤 {exp.author}</span>
              <span>📅 {new Date(exp.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="card-actions">
              <button
                className={`btn btn-small like-btn ${isLiked ? 'liked' : ''}`}
                onClick={() => onLike(exp._id)}
              >
                {isLiked ? '❤️' : '🤍'} {likes.length}{' '}
                {likes.length === 1 ? 'Like' : 'Likes'}
              </button>
              {currentUser && currentUser.username === exp.author && (
                <>
                  <button
                    className="btn btn-secondary btn-small"
                    onClick={() => onEdit(exp)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => onDelete(exp._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            <div className="replies-section">
              <strong>{exp.replies?.length || 0} Replies</strong>
              {exp.replies?.map((r) => (
                <div className="reply" key={r._id}>
                  <span className="reply-author">{r.author}:</span>
                  {r.body}
                </div>
              ))}
              <div className="reply-input-row">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyText[exp._id] || ''}
                  onChange={(e) =>
                    setReplyText({ ...replyText, [exp._id]: e.target.value })
                  }
                />
                <button
                  className="btn btn-primary btn-small"
                  onClick={() => handleReply(exp._id)}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

ExperienceList.propTypes = {
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      createdAt: PropTypes.string,
      likes: PropTypes.arrayOf(PropTypes.string),
      replies: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          body: PropTypes.string.isRequired,
          author: PropTypes.string.isRequired,
          createdAt: PropTypes.string,
        })
      ),
    })
  ).isRequired,

  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
};
