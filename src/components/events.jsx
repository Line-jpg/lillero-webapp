import { useEffect, useState } from "react";
import { fetchEvents } from "./supabaseClient";
import "../events.css";

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

  if (loading) return <p className="events-loading">Loading events...</p>;

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
