import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/OpslagPage";
import EventPage from "./pages/EventPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<EventPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Navbar />
    </>
  );
}
