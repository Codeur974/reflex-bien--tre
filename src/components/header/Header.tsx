import React from "react";
import Image from "next/image";
import { RootState } from "../../store";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./header.module.scss";
export default function Header() {
  // Supposons que l'état Redux contient `token` et `role`
  const { token, role } = useSelector((state: RootState) => state.auth);

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        {" "}
        <Image src="/images/logo.jpg" alt="Logo" width={200} height={200} />
      </div>
      <div className={styles.header__content}>
        <h1>
          Patricia Sermande <br />
          Réflexologue et Praticienne en Cohérence Cardiaque
        </h1>

        <nav className={styles.header__nav}>
          <ul>
            {/* Liens publics */}
            {!token && (
              <>
                <li>
                  <Link href="/">Accueil</Link>
                </li>
                <li>
                  <Link href="/public/reflexo">Réfléxologie plantaire</Link>
                </li>

                <li>
                  <Link href="/public/cardiac">Cohérence cardiaque</Link>
                </li>
                <li>
                  <Link href="/public/entreprise">Bien-être en entreprise</Link>
                </li>
                <li>
                  <Link href="/public/ofers">Les offres</Link>
                </li>
                <li>
                  <Link href="/public/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/login">Se connecter</Link>
                </li>
              </>
            )}

            {/* Liens privés */}
            {token && (
              <>
                <li>
                  <Link href="/private/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/private/tracking">Mon Suivi</Link>
                </li>
                <li>
                  <Link href="/private/newspaper">Mon Journal</Link>
                </li>
                <li>
                  <Link href="/private/payment">Page de paiement</Link>
                </li>
                {role === "admin" && (
                  <li>
                    <Link href="/private/admin">Admin</Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
