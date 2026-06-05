import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPostById, deletePost, updatePost } from "../components/supabaseClient";
import luk from "../assets/luk.svg";
import "../opslag.css";

export default function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({ title: "", text: "" });

  async function handleDelete() {
    if (!window.confirm("Er du sikker på, at du vil slette dette opslag?")) return;
    setDeleting(true);
    try {
      await deletePost(postId);
      navigate("/community");
    } catch (err) {
      console.error("Kunne ikke slette opslag:", err);
      setDeleting(false);
    }
  }

  function handleEditStart() {
    setEditForm({ title: post.title ?? "", text: post.text ?? post.body ?? "" });
    setEditing(true);
  }

  function handleEditCancel() {
    setEditing(false);
  }

  async function handleEditSave() {
    setSaving(true);
    try {
      const updated = await updatePost(postId, { title: editForm.title, text: editForm.text });
      setPost((prev) => ({ ...prev, ...updated }));
      setEditing(false);
    } catch (err) {
      console.error("Kunne ikke gemme opslag:", err);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    async function load() {
      const data = await fetchPostById(postId);
      setPost(data);
      setLoading(false);
    }

    load();
  }, [postId]);

  if (loading) return <p className="posts-loading">Loading post...</p>;

  if (!post) {
    return (
      <main className="posts post-detail-page">
        <button
          type="button"
          className="post-detail-page__backButton"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <img src={luk} alt="" className="post-detail-page__backIcon" />
        </button>
        <p className="posts-empty">Post not found.</p>
        <Link to="/community">Back to posts</Link>
      </main>
    );
  }

  return (
    <main className="posts post-detail-page">
      <button
        type="button"
        className="post-detail-page__backButton"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <img src={luk} alt="" className="post-detail-page__backIcon" />
      </button>
      <article className="post-card post-card--detail">
        <p className="post-card__name">{post.name}</p>
        <p className="post-card__parent_to">{post.parent_to}</p>
        {post.image && (
          <img src={post.image} alt={post.title} className="post-card__image" />
        )}
        {editing ? (
          <>
            <input
              className="post-detail-page__editTitle"
              value={editForm.title}
              onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
            />
            <textarea
              className="post-detail-page__editBody"
              value={editForm.text}
              onChange={(e) => setEditForm((prev) => ({ ...prev, text: e.target.value }))}
            />
          </>
        ) : (
          <>
            <h1 className="post-card__title">{post.title}</h1>
            <p className="post-card__body">{post.text ?? post.body}</p>
          </>
        )}
        {post.show_hashtags && Array.isArray(post.hashtags) && (
          <div className="tags">
            {post.hashtags.map((tag) => (
              <span key={tag} className="hashtag">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <p className="post-card__meta">{post.time_ago}</p>
        <div className="post-detail-page__actions">
          {editing ? (
            <>
              <button
                type="button"
                className="post-detail-page__editButton"
                onClick={handleEditSave}
                disabled={saving}
              >
                {saving ? "Gemmer..." : "Gem"}
              </button>
              <button
                type="button"
                className="post-detail-page__cancelButton"
                onClick={handleEditCancel}
              >
                Annuller
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="post-detail-page__editButton"
                onClick={handleEditStart}
                aria-label="Rediger opslag"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM1 18C0.716667 18 0.479333 17.904 0.288 17.712C0.0966668 17.52 0.000666667 17.2827 0 17V14.575C0 14.3083 0.0500001 14.054 0.15 13.812C0.25 13.57 0.391667 13.3577 0.575 13.175L13.2 0.575C13.4 0.391667 13.621 0.25 13.863 0.15C14.105 0.0500001 14.359 0 14.625 0C14.891 0 15.1493 0.0500001 15.4 0.15C15.6507 0.25 15.8673 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7707 2.4 17.862 2.65C17.9533 2.9 17.9993 3.15 18 3.4C18 3.66667 17.954 3.921 17.862 4.163C17.77 4.405 17.6243 4.62567 17.425 4.825L4.825 17.425C4.64167 17.6083 4.429 17.75 4.187 17.85C3.945 17.95 3.691 18 3.425 18H1ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z" fill="#8A38F5"/>
                </svg>
              </button>
              <button
                type="button"
                className="post-detail-page__deleteButton"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Sletter..." : "Slet opslag"}
              </button>
            </>
          )}
        </div>
      </article>
    </main>
  );
}
