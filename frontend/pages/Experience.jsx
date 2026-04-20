import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExperienceForm from "../src/components/experienceForm/experienceForm.jsx";
import ExperienceList from "../src/components/experienceList/experienceList.jsx";
import API_BASE from "../src/config/api.js";

const CATEGORIES = [
  "All",
  "Software Engineering",
  "Data Science",
  "Product Management",
  "Design",
  "Finance",
  "General",
];

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchExperiences();
  }, []);

  // Return to the first page when switching categories
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const getUser = () => JSON.parse(localStorage.getItem("user") || "null");

  const fetchExperiences = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/experiences`);
      if (!res.ok) return;
      const data = await res.json();
      setExperiences(data);
    } catch (err) {
      console.error("Failed to fetch experiences:", err);
    }
  };

  const requireAuth = () => {
    const user = getUser();
    if (!user) {
      alert("Please log in to perform this action.");
      navigate("/auth");
      return false;
    }
    return true;
  };

  const handleShareClick = () => {
    if (!requireAuth()) return;
    setShowForm(!showForm);
  };

  const handleCreate = async (formData) => {
    if (!requireAuth()) return;
    const user = getUser();
    try {
      const res = await fetch(`${API_BASE}/api/experiences`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, author: user.username }),
      });
      if (res.ok) {
        setShowForm(false);
        fetchExperiences();
      }
    } catch (err) {
      console.error("Failed to create experience:", err);
    }
  };

  const handleUpdate = async (formData) => {
    if (!requireAuth()) return;
    try {
      const res = await fetch(`/api/experiences/${editingExperience._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Failed to update experience");
      }
      await fetchExperiences();
      setEditingExperience(null);
      alert("Your post has been updated successfully.");
    } catch (err) {
      console.error("Failed to update experience:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!requireAuth()) return;
    try {
      await fetch(`${API_BASE}/api/experiences/${id}`, { method: "DELETE" });
      fetchExperiences();
    } catch (err) {
      console.error("Failed to delete experience:", err);
    }
  };

  const handleReply = async (expId, replyText) => {
    if (!requireAuth()) return;
    const user = getUser();
    try {
      await fetch(`${API_BASE}/api/experiences/${expId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: replyText, author: user.username }),
      });
      fetchExperiences();
    } catch (err) {
      console.error("Failed to add reply:", err);
    }
  };

  const handleLike = async (expId) => {
    if (!requireAuth()) return;
    const user = getUser();
    try {
      await fetch(`${API_BASE}/api/experiences/${expId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username }),
      });
      fetchExperiences();
    } catch (err) {
      console.error("Failed to like experience:", err);
    }
  };

  const handleEdit = (exp) => {
    if (!requireAuth()) return;
    setEditingExperience(exp);
    setShowForm(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setEditingExperience(null);
  };

  const filteredExperiences =
    selectedCategory === "All"
      ? experiences
      : experiences.filter((exp) => exp.category === selectedCategory);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExperiences = filteredExperiences.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div>
      <div className="page-header">
        <h1>Interview Experiences</h1>
        {!editingExperience && (
          <button className="btn btn-primary" onClick={handleShareClick}>
            {showForm ? "Cancel" : "+ Share Experience"}
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {showForm && !editingExperience && (
        <ExperienceForm onSubmit={handleCreate} />
      )}

      {editingExperience && (
        <ExperienceForm
          initialData={editingExperience}
          onSubmit={handleUpdate}
          onCancel={handleCancelEdit}
          isEditing
        />
      )}

      <ExperienceList
        experiences={paginatedExperiences}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onReply={handleReply}
        onLike={handleLike}
      />

      {/* Pagination UI */}
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
          disabled={startIndex + itemsPerPage >= filteredExperiences.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

