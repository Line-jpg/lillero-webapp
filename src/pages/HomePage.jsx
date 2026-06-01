import { useState } from "react";
import avatar from "../assets/mennesker/frederik-moeller.svg";
import cameraIcon from "../assets/camera.svg";
import maaltidIllustration from "../assets/maaltid.svg";
import "./home.css";

const MEALS = [
  { id: 1, name: "Kylling med pomfritter", type: "Aftensmad", time: "18:11", kul: 28 },
  { id: 2, name: "Yogurt med vaffler",     type: "Morgenmad", time: "07:28", kul: 16 },
  { id: 3, name: "Frugtfad med yogurt",    type: "Frokost",   time: "12:55", kul: 20 },
  { id: 4, name: "Bolle med pålæg",        type: "Frokost",   time: "13:10", kul: 34 },
];

export default function HomePage() {
  const [scanned, setScanned] = useState(false);

  return (
    <div className="home">

      <div className="home__header">
        <p className="home__date">ONSDAG • AUGUST 16</p>
        <h1 className="home__greeting">Godmorgen,<br />Henrik ☀️</h1>
        <img src={avatar} alt="Profil" className="home__avatar" />
      </div>

      {scanned ? (
        <>
          <div
            className="home__food-image-wrap"
            style={{ backgroundImage: `url(${maaltidIllustration})` }}
          >
            <span className="home__food-label">Seneste måltid</span>
          </div>

          <hr className="home__divider" />

          <div className="home__meals-header">
            <span className="home__meals-title">I dags måltider:</span>
            <a href="#" className="home__meals-link">Se hele ugen →</a>
          </div>

          <div className="home__meal-list">
            {MEALS.map((meal) => (
              <div key={meal.id} className="home__meal-card">
                <div className="home__meal-info">
                  <span className="home__meal-name">{meal.name}</span>
                  <span className="home__meal-meta">{meal.type} • {meal.time}</span>
                </div>
                <span className="home__meal-kul">
                  <strong>{meal.kul}</strong> kul.
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="home__photo-card">
            <img src={cameraIcon} alt="" className="home__camera-icon" />
            <p className="home__photo-label">Tag dagens<br />første billede!</p>
          </div>

          <hr className="home__divider" />

          <div className="home__meals-header">
            <span className="home__meals-title">I dags måltider:</span>
            <a href="#" className="home__meals-link">Se hele ugen →</a>
          </div>

          <div className="home__bottom">
            <p className="home__empty-text">Intet endnu!<br />Start med at tage et billede</p>
            <div className="home__illustration">
              <div className="home__flap home__flap--left" />
              <div className="home__flap home__flap--right" />
            </div>
          </div>
        </>
      )}

      <div className="home__scan-bar">
        <button className="home__scan-btn" onClick={() => setScanned(true)}>
          <img src={cameraIcon} alt="" className="home__scan-icon" />
          Scan måltid
        </button>
      </div>

    </div>
  );
}
