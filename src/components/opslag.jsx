import { useEffect, useState } from "react";
import { fetchPosts } from "./supabaseClient";
import "../opslag.css";

export default function Posts({ showTitle = true }) {
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
      {showTitle ? <h2 className="posts-title">Fælleskab</h2> : null}

      {posts.length === 0 ? (
        <p className="posts-empty">No posts found.</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <p className="post-card__name">{post.name}</p>
              <p className="post-card__parent_to">{post.parent_to}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="post-card__image"
                />
              )}
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
              <p className="post-card__meta">{post.time_ago}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
