import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../components/supabaseClient";

export default function CreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    profileimagine: "",
    image: "",
    title: "",
    text: "",
    parent_to: "",
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createPost(form);
      navigate("/community");
    } catch (err) {
      console.error("Kunne ikke oprette opslag:", err);
    }
  }

  return (
    <main className="app">
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Titel</label>
          <input
            id="title"
            name="title"
            placeholder="Overskrift på dit opslag"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="text">Tekst</label>
          <textarea
            id="text"
            name="text"
            rows="5"
            placeholder="Skriv dit opslag her..."
            value={form.text}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="image">Billede URL (valgfrit)</label>
          <input
            id="image"
            name="image"
            placeholder="https://..."
            value={form.image}
            onChange={handleChange}
          />
          {form.image && (
            <img src={form.image} alt="Preview" className="image-preview" />
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Del opslag
          </button>
        </div>
      </form>
    </main>
  );
}
