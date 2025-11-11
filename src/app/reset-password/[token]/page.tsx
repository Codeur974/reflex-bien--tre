"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import styles from "../../login/login.module.scss";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!password || !confirmPassword) {
      setError("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: params.token as string,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.");
        router.push("/login");
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
        <h1 className={styles.login__title}>Nouveau mot de passe</h1>

        <p style={{ textAlign: "center", marginBottom: "1.5rem", color: "#5a7a8f" }}>
          Choisissez un nouveau mot de passe pour votre compte.
        </p>

        {error && (
          <div className={styles.login__error}>
            {error}
          </div>
        )}

        <form className={styles.login__form} onSubmit={handleSubmit}>
          <div className={styles.login__formGroup}>
            <label className={styles.login__label}>
              Nouveau mot de passe
            </label>
            <input
              className={styles.login__input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
              minLength={6}
            />
            <small style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem" }}>
              Minimum 6 caractères
            </small>
          </div>

          <div className={styles.login__formGroup}>
            <label className={styles.login__label}>
              Confirmer le mot de passe
            </label>
            <input
              className={styles.login__input}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className={styles.login__button}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
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
