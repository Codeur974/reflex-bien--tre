"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../login/login.module.scss";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    if (!email) {
      setError("Veuillez entrer votre adresse email");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Un email de réinitialisation vous a été envoyé");
        setEmail("");
      } else {
        setError(data.message || "Une erreur est survenue");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Impossible de contacter le serveur. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <h1 className={styles.login__title}>Mot de passe oublié ?</h1>

        <p style={{ textAlign: "center", marginBottom: "1.5rem", color: "#5a7a8f" }}>
          Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>

        {error && (
          <div className={styles.login__error}>
            {error}
          </div>
        )}

        {message && (
          <div style={{
            padding: "1rem",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)",
            borderLeft: "4px solid #5fd7b0",
            borderRadius: "8px",
            color: "#155724",
            fontSize: "0.95rem",
            fontFamily: "Lato, sans-serif"
          }}>
            {message}
          </div>
        )}

        <form className={styles.login__form} onSubmit={handleSubmit}>
          <div className={styles.login__formGroup}>
            <label className={styles.login__label}>
              Adresse email
            </label>
            <input
              className={styles.login__input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={styles.login__button}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link
            href="/login"
            style={{
              color: "#3d9b86",
              textDecoration: "none",
              fontSize: "0.95rem",
              fontFamily: "Lato, sans-serif"
            }}
          >
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
