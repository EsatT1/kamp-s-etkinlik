import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>404 - Sayfa Bulunamadı</h2>
      <p>Aradığınız sayfa mevcut değil.</p>
      <Link to="/" className="btn-ana">Ana Sayfaya Dön</Link>
    </div>
  );
}