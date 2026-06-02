import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPostById, deletePost } from "../components/supabaseClient";
import luk from "../assets/luk.svg";
import "../opslag.css";

export default function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

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
        <h1 className="post-card__title">{post.title}</h1>
        <p className="post-card__body">{post.text ?? post.body}</p>
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
        <button
          type="button"
          className="post-detail-page__deleteButton"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Sletter..." : "Slet opslag"}
        </button>
      </article>
    </main>
  );
}
