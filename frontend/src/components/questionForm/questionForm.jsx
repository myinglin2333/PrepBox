import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function QuestionForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing,
}) {
  const [form, setForm] = useState({
    title: '',
    question: '',
    category: 'General',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        question: initialData.question || '',
        category: initialData.category || 'General',
      });
    } else {
      setForm({
        title: '',
        question: '',
        category: 'General',
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (!isEditing) {
      setForm({ title: '', question: '', category: 'General' });
    }
  };

  const categories = [
    'Behavioral',
    'Technical',
    'System Design',
    'General',
    'Data Science',
    'Product Management',
    'Consulting',
    'Finance',
    'Marketing',
    'Internship',
    'New Grad',
    'Other',
  ];

  return (
    <div className="card">
      <h3>{isEditing ? 'Edit Question' : 'Add a Question'}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question-title">Title</label>
          <input
            id="question-title"
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g., Tell me about yourself"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="question-body">Question</label>
          <textarea
            id="question-body"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            placeholder="Enter your interview question..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="question-category">Category</label>
          <select
            id="question-category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="experience-form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Save Changes' : 'Add a Question'}
          </button>

          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

QuestionForm.propTypes = {
  initialData: PropTypes.shape({
    title: PropTypes.string,
    question: PropTypes.string,
    category: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  isEditing: PropTypes.bool,
};
