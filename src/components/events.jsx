import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import { fetchEvents } from "./supabaseClient";
import loadingAnimation from "../assets/loading.json";
import "../events.css";

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

  return <div ref={containerRef} className="events-loading-animation" />;
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchEvents();
      setEvents(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <LoadingAnimation />;

  return (
    <section className="events">


      {events.length === 0 ? (
        <p className="events-empty">No events found.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <article key={event.id} className="event-card">
              {/* Adjust field names to match your table columns */}
              <h3 className="event-card__title">{event.title ?? event.name}</h3>
              <p className="event-card__body">{event.description}</p>
              <time className="event-card__meta">
                {event.date
                  ? new Date(event.date).toLocaleDateString()
                  : new Date(event.created_at).toLocaleDateString()}
              </time>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
