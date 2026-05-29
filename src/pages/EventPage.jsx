import { useState } from "react";
import Events from "../components/events";
import "../events.css";
import lavOpslag from "../assets/lav-opslag.svg";
import kalender from "../assets/kalender.svg";
import mand from "../assets/mennesker/lars-larsen.svg";
import luk from "../assets/luk.svg";
export default function EventPage() {
  const [showCreatePost, setShowCreatePost] = useState(false);

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
              <input type="text" placeholder="Titel" />
              <label>Dato</label>
              <input type="date" />
              <label>Start tidspunkt</label>
              <input type="time" />
              <label>Slut tidspunkt</label>
              <input type="time" placeholder="Slut tidspunkt" />
              <input type="text" placeholder="Beskrivelse" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
