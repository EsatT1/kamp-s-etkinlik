import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  };

  return (
    <div className="auth-page">
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <p style={{ marginBottom: "15px" }}>
        Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.
      </p>

      {sent && (
        <p className="mesaj mesaj-basari" style={{ marginBottom: "15px" }}>
          Bağlantı {email} adresine gönderildi (demo).
        </p>
      )}

      <form noValidate onSubmit={handleSubmit} className="auth-form">
        <div>
          <label htmlFor="email">E-posta</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
          />
          {error && <span className="hata-metni">{error}</span>}
        </div>

        <button type="submit" className="btn-ana" style={{ marginTop: "10px" }}>
          Bağlantı gönder
        </button>
      </form>

      <div className="auth-links" style={{ marginTop: "15px" }}>
        <Link to="/login">← Girişe dön</Link>
      </div>
    </div>
  );
}