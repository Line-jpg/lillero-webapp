import { useState } from "react";
import Events from "../components/events";
import "../events.css";
import lavOpslag from "../assets/lav-opslag.svg";
import kalender from "../assets/kalender.svg";
import mand from "../assets/mennesker/lars-larsen.svg";
import luk from "../assets/luk.svg";
import { createEvent } from "../components/supabaseClient";

export default function EventPage() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", start_time: "", text: "" });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    try {
      await createEvent({
        title: form.title,
        time: `${form.date}T${form.start_time}:00`,
        text: form.text,
      });
      setShowCreatePost(false);
      setForm({ title: "", date: "", start_time: "", text: "" });
    } catch (err) {
      console.error("Kunne ikke oprette event:", err);
    }
  }

  return (
    <>
      <header>
        <h2 className="events-title">Events</h2>

        <img src={mand} alt="profilbillede" className="profilbillede" />

        <div className="kalenderknap-container">
          <button id="kalender" className="kalenderknap">
            <img src={kalender} alt="Kalender" />
          </button>

          <button
            id="lav-opslag"
            className="kalenderknap"
            onClick={() => setShowCreatePost(true)}
          >
            <img src={lavOpslag} alt="Lav opslag" />
          </button>
        </div>

        <div className="kommendedeltager-container">
          <h2 id="kommende" className="kommendedeltager">
            Kommende
          </h2>
          <h2 id="deltager" className="kommendedeltager">
            Deltager
          </h2>
        </div>
      </header>

      <Events />

      {showCreatePost && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={() => setShowCreatePost(false)}>
              <img src={luk} alt="Luk" />
            </button>
            <div className="modal-content">
              <input className="modal-titel" type="text" placeholder="Titel" name="title" value={form.title} onChange={handleChange} />
              <div className="modal-dato">
                <label>Dato</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} />
              </div>
              <div className="modal-start-tidspunkt">
                <label>Start tidspunkt</label>
                <input type="time" name="start_time" value={form.start_time} onChange={handleChange} />
              </div>
              <div className="modal-slut-tidspunkt">
                <label>Slut tidspunkt</label>
                <input type="time" placeholder="Slut tidspunkt" />
              </div>
              <div>
                <textarea className="modal-beskrivelse" placeholder="Beskrivelse" name="text" value={form.text} onChange={handleChange} />
              </div>
              <button className="opret-event-button" onClick={handleSubmit}>Opret begivenhed</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
