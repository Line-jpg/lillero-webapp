import { Link } from "react-router-dom";
import editSolid from "../assets/edit-solid.svg";
import bars from "../assets/bars.svg";
import "./Header.css";

export default function Header({
  title = "Fælleskab",
  subtitle = "Til dig",
  editTo = "/create-post",
  menuTo = "/menu",
}) {
  return (
    <header className="app-header">
      <div className="app-header__top">
        <div className="app-header__titles">
          <h1 className="app-header__title">{title}</h1>
          {subtitle ? <p className="app-header__subtitle">{subtitle}</p> : null}
        </div>

        <div className="app-header__actions" aria-label="Header actions">
          <Link
            to={editTo}
            className="app-header__iconButton"
            aria-label="Create new post"
          >
            <img src={editSolid} alt="" className="app-header__icon" />
          </Link>
          <Link
            to={menuTo}
            className="app-header__iconButton"
            aria-label="Open menu"
          >
            <img src={bars} alt="" className="app-header__icon" />
          </Link>
        </div>
      </div>
    </header>
  );
}
