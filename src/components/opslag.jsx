import { useEffect, useState } from "react";
import { fetchPosts } from "./supabaseClient";
import "../opslag.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p className="posts-loading">Loading posts...</p>;

  return (
    <section className="posts">
      <h2 className="posts-title">Fælleskab</h2>

      {posts.length === 0 ? (
        <p className="posts-empty">No posts found.</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              {/* Display image if it exists */}
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="post-card__image"
                />
              )}
              {/* Adjust field names to match your table columns */}
              <p className="post-card__name">{post.name}</p>
              <h3 className="post-card__title">{post.title}</h3>
              <p className="post-card__body">{post.text ?? post.body}</p>
              {post.show_hashtags && (
                <div className="tags">
                  {post.hashtags.map((tag) => (
                    <span key={tag} className="hashtag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <time className="post-card__meta">
                {new Date(post.created_at).toLocaleDateString()}
              </time>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
