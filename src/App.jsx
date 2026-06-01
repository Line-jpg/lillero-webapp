import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import OpslagPage from "./pages/OpslagPage";
import EventPage from "./pages/EventPage";
import CreatePage from "./pages/CreatePage";
import PostDetailPage from "./pages/PostDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import InboxPage from "./pages/InboxPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-post" element={<CreatePage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/community" element={<OpslagPage />} />
        <Route path="/community/:postId" element={<PostDetailPage />} />
        <Route path="/contact" element={<EventPage />} />
        <Route path="/community" element={<OpslagPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Navbar />
    </>
  );
}
