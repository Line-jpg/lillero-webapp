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
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="create-post__topbar">
        <button type="button" className="create-post__topbar-btn" onClick={() => navigate(-1)}>
          <img src={luk} alt="Luk" />
        </button>
        <button type="button" className="create-post__topbar-btn">
          <span>• • •</span>
        </button>
      </div>

      <div className="create-post__profile">
        <div className="create-post__avatar-wrapper">
          <label htmlFor="profileFile">
            {profileFile ? (
              <img
                src={URL.createObjectURL(profileFile)}
                alt="Profilbillede"
                className="create-post__avatar"
              />
            ) : (
              <div className="create-post__avatar-placeholder">
                <img src={camera} alt="Upload profilbillede" />
              </div>
            )}
          </label>
          <input
            id="profileFile"
            type="file"
            accept="image/*"
            className="create-post__avatar-input"
            onChange={(e) => setProfileFile(e.target.files[0])}
          />
        </div>
        <div className="create-post__profile-fields">
          <input
            className="create-post__name-input"
            name="name"
            placeholder="Dit navn"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="create-post__parent-input"
            name="parent_to"
            placeholder="Far/Mor til..."
            value={form.parent_to}
            onChange={handleChange}
          />
        </div>
      </div>

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
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="create-post__image-preview"
          />
        )}
      </div>

      <div className="create-post__toolbar">
        <label htmlFor="imageFile" className="create-post__image-btn">
          <img src={camera} alt="Tilføj billede" />
        </label>
        <input
          id="imageFile"
          type="file"
          accept="image/*"
          className="create-post__image-file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>

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
        <button type="button" className="create-post__info-btn">i</button>
      </div>

      {error && <p className="create-post__error">{error}</p>}

      <div className="create-post__footer">
        <button type="button" className="create-post__groups-btn">
          + Tilføj grupper
        </button>
        <button type="submit" className="create-post__submit-btn" disabled={submitting}>
          {submitting ? "Uploader..." : "Læg op"}
        </button>
      </div>
    </form>
  );
}
