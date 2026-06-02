import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, uploadImage } from "../components/supabaseClient";
import luk from "../assets/luk.svg";
import camera from "../assets/camera.svg";
import avatar from "../assets/mennesker/frederik-moeller.svg";
import "./create.css";

export default function CreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", text: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [anonym, setAnonym] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleImagePick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const post = { ...form };
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
    <div className="create-post">
      {/* Top bar */}
      <div className="create-post__topbar">
        <button
          type="button"
          className="create-post__topbar-btn"
          onClick={() => navigate(-1)}
          aria-label="Luk"
        >
          <img src={luk} alt="" />
        </button>
        <span className="create-post__topbar-title">Diabetes Foreningen - Aalborg ku...</span>
        <button type="button" className="create-post__topbar-btn" aria-label="Mere">
          <span className="create-post__topbar-dots">···</span>
        </button>
      </div>

      <form className="create-post__form" onSubmit={handleSubmit}>
        {/* Profile row */}
        <div className="create-post__profile">
          <img src={avatar} alt="Profil" className="create-post__avatar" />
          <div className="create-post__profile-fields">
            <span className="create-post__name-input">Henrik Sejr Jacobsen</span>
            <span className="create-post__parent-input">Far til Jacob</span>
          </div>
        </div>

        {/* Body */}
        <div className="create-post__body">
          <input
            className="create-post__title-input"
            name="title"
            placeholder="Titel"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            className="create-post__text-input"
            name="text"
            placeholder="Tekst..."
            value={form.text}
            onChange={handleChange}
            required
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="create-post__image-preview" />
          )}
        </div>

        {error && <p className="create-post__error">{error}</p>}

        {/* Image toolbar */}
        <div className="create-post__toolbar">
          <label className="create-post__image-btn" aria-label="Tilføj billede">
            <img src={camera} alt="" />
            <input
              type="file"
              accept="image/*"
              className="create-post__image-file"
              onChange={handleImagePick}
            />
          </label>
        </div>

        {/* Anonymous toggle */}
        <div className="create-post__anonym">
          <span className="create-post__anonym-label">Vær anonym</span>
          <label className="create-post__toggle">
            <input
              type="checkbox"
              checked={anonym}
              onChange={(e) => setAnonym(e.target.checked)}
            />
            <span className="create-post__toggle-slider" />
          </label>
          <button type="button" className="create-post__info-btn" aria-label="Info">i</button>
        </div>

        {/* Footer */}
        <div className="create-post__footer">
          <button type="button" className="create-post__groups-btn">
            + Tilføj grupper
          </button>
          <button type="submit" className="create-post__submit-btn" disabled={submitting}>
            {submitting ? "Uploader..." : "Læg op"}
          </button>
        </div>
      </form>
    </div>
  );
}
