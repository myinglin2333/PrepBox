import React, { useState, useEffect } from "react";
import "./experienceForm.css";

export default function ExperienceForm({ initialData, onSubmit, onCancel, isEditing }) {
  const [form, setForm] = useState({
    title: "",
    category: "General",
    body: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        category: initialData.category || "General",
        body: initialData.body || "",
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (!isEditing) {
      setForm({ title: "", category: "General", body: "" });
    }
  };

  return (
    <div className="card experience-form-card">
      <h3>{isEditing ? "Edit Experience" : "Share Your Experience"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g., My Google SDE Interview Experience"
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>General</option>
            <option>Software Engineering</option>
            <option>Data Science</option>
            <option>Product Management</option>
            <option>Design</option>
            <option>Marketing</option>
            <option>Finance</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            placeholder="Tell us about your interview experience..."
            required
          />
        </div>
        <div className="experience-form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Save Changes" : "Share Experience"}
          </button>
          {isEditing && onCancel && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
