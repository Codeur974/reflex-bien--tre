"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.scss";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // Par défaut, utilisateur normal
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    if (!identifier || !password || !userType) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    // Préparez les données à envoyer
    const requestBody =
      userType === "admin"
        ? { email: identifier, password } // Si admin, envoyer "email"
        : { username: identifier, password }; // Si utilisateur, envoyer "username"

    console.log("URL de l'API :", process.env.NEXT_PUBLIC_API_URL);
    console.log("Données envoyées :", requestBody);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody), // Envoie les données adaptées
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Connexion réussie :", data);
        dispatch(login({ token: data.body.token, role: data.body.role })); // Met à jour Redux avec les données utilisateur

        // Redirige en fonction du rôle
        if (data.body.role === "admin") {
          router.push("/private/admin");
        } else {
          router.push("/private/dashboard");
        }
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de la connexion :", errorData.message);
        setError(
          errorData.message ||
            "Échec de la connexion. Vérifiez vos identifiants."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <h1 className={styles.login__title}>Connexion</h1>

        {error && (
          <div className={styles.login__error}>
            {error}
          </div>
        )}

        <form
          className={styles.login__form}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className={styles.login__formGroup}>
            <label className={styles.login__label}>
              Type d&apos;utilisateur
            </label>
            <select
              className={styles.login__select}
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          <div className={styles.login__formGroup}>
            <label className={styles.login__label}>
              {userType === "admin" ? "Email" : "Nom d'utilisateur"}
            </label>
            <input
              className={styles.login__input}
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={userType === "admin" ? "votre@email.com" : "Votre nom d'utilisateur"}
              required
            />
          </div>

          <div className={styles.login__formGroup}>
            <label className={styles.login__label}>
              Mot de passe
            </label>
            <input
              className={styles.login__input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className={styles.login__button}>
            Se connecter
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link
            href="/forgot-password"
            style={{
              color: "#3d9b86",
              textDecoration: "none",
              fontSize: "0.95rem",
              fontFamily: "Lato, sans-serif"
            }}
          >
            Mot de passe oublié ?
          </Link>
        </div>
      </div>
    </div>
  );
}
