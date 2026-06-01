import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, uploadImage } from "../components/supabaseClient";
import luk from "../assets/luk.svg";
import camera from "../assets/camera.svg";
import "./create.css";

export default function CreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", parent_to: "", title: "", text: "" });
  const [profileFile, setProfileFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [anonym, setAnonym] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const post = { ...form };
      if (profileFile) {
        try { post.profileimagine = await uploadImage(profileFile); } catch {}
      }
      if (imageFile) {
        try { post.image = await uploadImage(imageFile); } catch {}
      }
      await createPost(post);
      navigate("/community");
    } catch (err) {
      console.error("Kunne ikke oprette opslag:", err);
      setError("Noget gik galt — prøv igen.");
    } finally {
      setSubmitting(false);
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

      <div className="create-post__footer">
        <button type="button" className="create-post__groups-btn">
          + Tilføj grupper
        </button>
        <button type="submit" className="create-post__submit-btn" disabled={submitting}>
          {submitting ? "Uploader..." : "Læg op"}
        </button>
      </div>
    </form>
    </main>
  );
}
