import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import QuestionForm from '../src/components/questionForm/questionForm.jsx';
import QuestionList from '../src/components/questionList/questionList.jsx';
import API_BASE from '../src/config/api.js';

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Fetch
  const fetchQuestions = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/questions`);
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error('Failed to fetch questions:', err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Return to the first page when switching categories
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Scroll back to the top when switch pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Add
  const handleAdd = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          author: user?.username || 'anonymous',
        }),
      });

      const data = await res.json();
      setQuestions((prev) => [data, ...prev]);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add question:', err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/api/questions/${id}`, { method: 'DELETE' });
      setQuestions(questions.filter((q) => q._id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  // Edit
  const handleEdit = async (updatedData) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/questions/${editingQuestion._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        }
      );

      await fetchQuestions();
      setEditingQuestion(null);
      alert('Your post has been updated successfully.');
    } catch (err) {
      console.error('Failed to update:', err);
    }
  };

  // Login
  const handleAddClick = () => {
    if (!user) {
      alert('Please log in to perform this action.');
      navigate('/auth');
      return;
    }
    setEditingQuestion(null);
    setShowForm(!showForm);
  };

  // Reply to post
  const handleReply = async (questionId, replyText) => {
    if (!user) {
      alert('Please log in to perform this action.');
      window.location.hash = '#/auth';
      return;
    }

    try {
      await fetch(`${API_BASE}/api/questions/${questionId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: replyText,
          author: user?.username || 'anonymous',
        }),
      });

      fetchQuestions();
    } catch (err) {
      console.error('Failed to add reply:', err);
    }
  };

  // Filter
  const filteredQuestions =
    selectedCategory === 'All'
      ? questions
      : questions.filter((q) => q.category === selectedCategory);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <div className="page-header">
        <h1>Interview Questions</h1>
        {!editingQuestion && (
          <button className="btn btn-primary" onClick={handleAddClick}>
            {showForm ? 'Cancel' : '+ Add a Question'}
          </button>
        )}
      </div>

      {/* Category */}
      <div className="category-filter">
        {[
          'All',
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
        ].map((cat) => (
          <button
            key={cat}
            className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Form */}
      {showForm && !editingQuestion && (
        <QuestionForm
          initialData={null}
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
          isEditing={false}
        />
      )}

      {editingQuestion && (
        <QuestionForm
          initialData={editingQuestion}
          onSubmit={handleEdit}
          onCancel={() => setEditingQuestion(null)}
          isEditing={true}
        />
      )}

      {/* List */}
      <QuestionList
        questions={paginatedQuestions}
        onDelete={handleDelete}
        onEdit={(q) => {
          setEditingQuestion(q);
          setShowForm(false);

          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
        onReply={handleReply}
      />

      {/* Pagination */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          className="btn btn-secondary btn-small"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span style={{ margin: '0 1rem' }}>Page {currentPage}</span>

        <button
          className="btn btn-secondary btn-small"
          disabled={startIndex + itemsPerPage >= filteredQuestions.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
