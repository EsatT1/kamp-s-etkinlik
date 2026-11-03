import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface LoginErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found: LoginErrors = {};

    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }

    setErrors(found);
    setSent(Object.keys(found).length === 0);
  };

  return (
    <div className="auth-page">
      <h2 className="bolum-baslik">Giriş Yap</h2>

      {sent && (
        <p className="mesaj mesaj-basari" style={{ marginBottom: "15px" }}>
          Gerçek giriş Sprint 10'da
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
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email && <span className="hata-metni">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="password">Şifre</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
          />
          {errors.password && <span className="hata-metni">{errors.password}</span>}
        </div>

        <button type="submit" className="btn-ana">
          Giriş yap
        </button>
      </form>

      <div className="auth-links" style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </div>
    </div>
  );
}