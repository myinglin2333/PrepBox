import React, { useState, useEffect } from "react";

export default function QuestionForm({ initialData, onSubmit, onCancel, isEditing }) {
  const [form, setForm] = useState({
    title: "",
    question: "",
    answer: "",
    category: "General",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        question: initialData.question || "",
        answer: initialData.answer || "",
        category: initialData.category || "General",
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (!isEditing) {
      setForm({ title: "", question: "", answer: "", category: "General" });
    }
  };

  return (
    <div className="card">
      <h3>{isEditing ? "Edit Question" : "Add a Question"}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g., Tell me about yourself"
            required
          />
        </div>

        <div className="form-group">
          <label>Question</label>
          <textarea
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            placeholder="Enter your interview question..."
            required
          />
        </div>

        <div className="form-group">
          <label>Answer</label>
          <textarea
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            placeholder="Optional sample answer..."
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>Behavioral</option>
            <option>Technical</option>
            <option>System Design</option>
            <option>General</option>
          </select>
        </div>

        {/* ⭐ 和组员完全一致 */}
        <div className="experience-form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Save Changes" : "Add Question"}
          </button>

          {isEditing && (
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