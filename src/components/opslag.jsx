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
      <h2 className="posts-title">Posts</h2>

      {posts.length === 0 ? (
        <p className="posts-empty">No posts found.</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              {/* Adjust field names to match your table columns */}
              <h3 className="post-card__title">{post.title}</h3>
              <p className="post-card__body">{post.content ?? post.body}</p>
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
