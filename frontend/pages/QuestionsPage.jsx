import React, { useState, useEffect } from "react";
import QuestionForm from "../src/components/questionForm/questionForm.jsx";
import QuestionList from "../src/components/questionList/questionList.jsx";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Fetch
  const fetchQuestions = async () => {
    try {
      const res = await fetch("/api/questions");
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Return to the first page when switching categories
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Add
  const handleAdd = async (formData) => {
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, author: user?.username || "anonymous" }),
      });

      const data = await res.json();
      setQuestions([data, ...questions]);
    } catch (err) {
      console.error("Failed to add question:", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/questions/${id}`, { method: "DELETE" });
      setQuestions(questions.filter((q) => q._id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  // Edit
  const handleEdit = async (updatedData) => {
    try {
      const res = await fetch(`/api/questions/${editingQuestion._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      setQuestions(
        questions.map((q) =>
          q._id === editingQuestion._id ? data : q
        )
      );

      setEditingQuestion(null);
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  // Login
  const handleAddClick = () => {
    if (!user) {
      alert("Please log in to perform this action.");
      window.location.href = "/auth";
      return;
    }
    setEditingQuestion({});
  };

  // Filter
  const filteredQuestions =
    selectedCategory === "All"
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
        <button className="btn btn-primary" onClick={handleAddClick}>
          + Add Question
        </button>
      </div>

      {/* Category */}
      <div className="category-filter">
        {["All", "Behavioral", "Technical", "System Design", "General"].map((cat) => (
          <button
            key={cat}
            className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Form */}
      {editingQuestion && (
        <QuestionForm
          initialData={editingQuestion._id ? editingQuestion : null}
          onSubmit={editingQuestion._id ? handleEdit : handleAdd}
          onCancel={() => setEditingQuestion(null)}
          isEditing={!!editingQuestion._id}
        />
      )}

      {/* List */}
      <QuestionList
        questions={paginatedQuestions}
        onDelete={handleDelete}
        onEdit={(q) => setEditingQuestion(q)}
      />

      {/* Pagination */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          className="btn btn-secondary btn-small"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 1rem" }}>
          Page {currentPage}
        </span>

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