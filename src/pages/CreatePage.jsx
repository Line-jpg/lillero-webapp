import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function CreatePage() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        image: image.trim(),
        caption: caption.trim(),
        date: date.trim(),
        location: location.trim(),
      }),
    });

    navigate("/");
  }

  return (
    <main className="app">
      <h1 className="page-title">Create Post</h1>
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="image">Image URL</label>
            <input
              id="image"
              name="image"
              placeholder="https://..."
              value={image}
              onChange={(event) => setImage(event.target.value)}
              required
            />
            {image && (
              <img src={image} alt="Preview" className="image-preview" />
            )}
          </div>

          <div className="form-field">
            <label htmlFor="caption">Titel</label>
            <textarea
              id="caption"
              name="caption"
              rows="4"
              placeholder="Skriv en titel til dit event..."
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              required
            />
          </div>

          <div className="form-field"></div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            placeholder="Hvornår foregår dit event?"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />

          <div className="form-field"></div>
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            placeholder="Hvor foregår dit event?"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Gem event
          </button>
        </div>
      </form>
    </main>
  );
}
