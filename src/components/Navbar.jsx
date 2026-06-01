import { NavLink } from "react-router-dom";
import camera from "../assets/camera.svg";
import inbox from "../assets/inbox.svg";
import calendarWeek from "../assets/calendar-week.svg";
import community from "../assets/users.svg";
import bookmark from "../assets/book-open.svg";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">
        <img src={camera} alt="Home" />
      </NavLink>
      <NavLink to="/community">
        <img src={community} alt="Community" />
      </NavLink>
      <NavLink to="/events">
        <img src={calendarWeek} alt="Contact" />
      </NavLink>
      <NavLink to="/inbox">
        <img src={inbox} alt="About" />
      </NavLink>

      <NavLink to="/bookmarks">
        <img src={bookmark} alt="Bookmarks" />
      </NavLink>
    </nav>
  );
}
