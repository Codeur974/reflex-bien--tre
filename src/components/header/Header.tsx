"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RootState } from "../../store";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import styles from "./header.module.scss";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, role } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <Link href="/">
          <Image src="/images/logo.jpg" alt="Logo" width={200} height={200} />
        </Link>
      </div>
      <div className={styles.header__content}>
        <h1>
          Patricia Sermande <br />
          Réflexologue et Praticienne en Cohérence Cardiaque
        </h1>

        <button
          className={styles.header__hamburger}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className={isMenuOpen ? styles.open : ""}></span>
          <span className={isMenuOpen ? styles.open : ""}></span>
          <span className={isMenuOpen ? styles.open : ""}></span>
        </button>

        <nav className={`${styles.header__nav} ${isMenuOpen ? styles.header__nav_open : ""}`}>
          <ul>
            {/* Liens publics */}
            {!token && (
              <>
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className={pathname === "/" ? styles.active : ""}
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/public/reflexo"
                    onClick={() => setIsMenuOpen(false)}
                    className={pathname === "/public/reflexo" ? styles.active : ""}
                  >
                    Réfléxologie plantaire
                  </Link>
                </li>
                <li>
                  <Link
                    href="/public/entreprise"
                    onClick={() => setIsMenuOpen(false)}
                    className={pathname === "/public/entreprise" ? styles.active : ""}
                  >
                    Bien-être en entreprise
                  </Link>
                </li>
                <li>
                  <Link
                    href="/public/ofers"
                    onClick={() => setIsMenuOpen(false)}
                    className={pathname === "/public/ofers" ? styles.active : ""}
                  >
                    Les offres
                  </Link>
                </li>
                <li>
                  <Link
                    href="/public/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className={pathname === "/public/contact" ? styles.active : ""}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={pathname === "/login" ? styles.active : ""}
                  >
                    Se connecter
                  </Link>
                </li>
              </>
            )}

            {/* Liens privés */}
            {token && (
              <>
                <li>
                  <Link
                    href="/private/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={pathname === "/private/dashboard" ? styles.active : ""}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/private/tracking"
                    onClick={() => setIsMenuOpen(false)}
                    className={pathname === "/private/tracking" ? styles.active : ""}
                  >
                    Mon Suivi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/private/newspaper"
                    onClick={() => setIsMenuOpen(false)}
                    className={pathname === "/private/newspaper" ? styles.active : ""}
                  >
                    Mon Journal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/private/payment"
                    onClick={() => setIsMenuOpen(false)}
                    className={pathname === "/private/payment" ? styles.active : ""}
                  >
                    Page de paiement
                  </Link>
                </li>
                {role === "admin" && (
                  <li>
                    <Link
                      href="/private/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className={pathname === "/private/admin" ? styles.active : ""}
                    >
                      Admin
                    </Link>
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
