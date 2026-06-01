import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import { fetchPosts } from "./supabaseClient";
import loadingAnimation from "../assets/loading.json";
import "../opslag.css";

function LoadingAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loadingAnimation,
    });
    return () => anim.destroy();
  }, []);

  return <div ref={containerRef} className="posts-loading" />;
}

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

  if (loading) return <LoadingAnimation />;

  return (
    <section className="posts">
      {showTitle ? <h2 className="posts-title">Fælleskab</h2> : null}

      {posts.length === 0 ? (
        <p className="posts-empty">No posts found.</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/community/${post.id}`}
              className="post-card-link"
              aria-label={`Open post ${post.title ?? ""}`}
            >
              <article className="post-card">
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
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
