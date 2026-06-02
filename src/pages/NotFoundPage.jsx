import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <span className="not-found__code">404</span>
      <h1 className="not-found__title">Siden findes ikke</h1>
      <p className="not-found__body">Den side, du leder efter, eksisterer ikke eller er blevet flyttet.</p>
      <Link to="/" className="not-found__link">Gå tilbage til forsiden</Link>
    </div>
  );
}
