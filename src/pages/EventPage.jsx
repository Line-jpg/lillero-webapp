import Events from "../components/events";
import "../events.css";
import lavOpslag from "../assets/lav-opslag.svg";
import kalender from "../assets/kalender.svg";
import mand from "../assets/mennesker/lars-larsen.svg";

export default function EventPage() {
  return (
    <>
      <header>
        <h2 className="events-title">Events</h2>
        <img src={mand} alt="profilbillede" className="profilbillede" />
        <div className="kalenderknap-container">
          <button id="kalender" className="kalenderknap">
            <img src={kalender} alt="Kalender" />
          </button>
          <button id="lav-opslag" className="kalenderknap">
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
    </>
  );
}
