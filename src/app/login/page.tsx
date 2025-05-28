"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // Par défaut, utilisateur normal
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    if (!identifier || !password || !userType) {
      alert("Veuillez remplir tous les champs.");
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
        alert(
          errorData.message ||
            "Échec de la connexion. Vérifiez vos identifiants."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };
  return (
    <div>
      <h1>Connexion</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <label>
          Type dutilisateur :
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </label>
        <label>
          {userType === "admin" ? "Email" : "Nom d'utilisateur"} :
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
