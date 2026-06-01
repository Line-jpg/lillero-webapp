import anetteLaudrup from "../assets/mennesker/annette-laudrup.svg";
import frederikfrederiksen from "../assets/mennesker/frederik-frederiksen.svg";
import frederikmoeller from "../assets/mennesker/frederik-moeller.svg";
import gittesoerensen from "../assets/mennesker/gitte-soerensen.svg";
import hannesoerensen from "../assets/mennesker/hanne-sorensen.svg";
import jeannettegibstrup from "../assets/mennesker/jeannette-gibstrup.svg";
import larslarsen from "../assets/mennesker/lars-larsen.svg";
import michaeljakobsen from "../assets/mennesker/michale-jakobsen.svg";
import mikkelaksel from "../assets/mennesker/mikkel-akssel.svg";
import piapetersen from "../assets/mennesker/pia-petersen.svg";
import editIcon from "../assets/edit-solid.svg";
import "./inbox.css";

const conversations = [
  { id: 1, name: "Hanne Sørensen", avatar: hannesoerensen, preview: "Her er en besked", time: "3 t" },
  { id: 2, name: "Pia Petersen", avatar: piapetersen, preview: "Her er en besked", time: "3 t" },
  { id: 3, name: "Michael Jakobsen", avatar: michaeljakobsen, preview: "Her er en besked", time: "3 t" },
  { id: 4, name: "Mikkel Aksel", avatar: mikkelaksel, preview: "Her er en besked", time: "3 t" },
  { id: 5, name: "Frederik Møller", avatar: frederikmoeller, preview: "Her er en besked", time: "3 t" },
  { id: 6, name: "Jeannette Gibstrup", avatar: jeannettegibstrup, preview: "Her er en besked", time: "3 t" },
  { id: 7, name: "Anette Laudrup", avatar: anetteLaudrup, preview: "Her er en besked", time: "3 t" },
  { id: 8, name: "Gitte Sørensen", avatar: gittesoerensen, preview: "Her er en besked", time: "3 t" },
  { id: 9, name: "Lars Larsen", avatar: larslarsen, preview: "Her er en besked", time: "3 t" },
  { id: 10, name: "Frederik Frederiksen", avatar: frederikfrederiksen, preview: "Her er en besked", time: "3 t" },
];

export default function InboxPage() {
  return (
    <div className="inbox">
      <div className="inbox__header">
        <h1 className="inbox__title">Chat</h1>
        <button className="inbox__compose-btn">
          <img src={editIcon} alt="Ny besked" className="inbox__compose-icon" />
        </button>
      </div>

      <div className="inbox__section-bar">
        <span className="inbox__section-label inbox__section-label--active">Beskeder</span>
        <span className="inbox__section-label">Anmodninger</span>
      </div>

      <ul className="inbox__list">
        {conversations.map((c) => (
          <li key={c.id} className="inbox__item">
            <img src={c.avatar} alt={c.name} className="inbox__avatar" />
            <div className="inbox__content">
              <span className="inbox__name">{c.name}</span>
              <span className="inbox__preview">{c.preview}</span>
            </div>
            <span className="inbox__time">{c.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
