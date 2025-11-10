"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RootState, AppDispatch } from "../../store";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../../store/slices/authSlice";
import styles from "./header.module.scss";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isReflexoDropdownOpen, setIsReflexoDropdownOpen] = useState(false);
  const { token, role, isHydrated } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePatriciaDoubleClick = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    router.push("/");
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
          <span
            onDoubleClick={handlePatriciaDoubleClick}
            style={{ cursor: 'default', userSelect: 'none' }}
            className={styles.header__mainTitle}
          >
            Patricia Sermande
          </span>
          <br />
          <span className={styles.header__subtitle}>
            Réflexologue plantaire
          </span>
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
            {/* Attendre que le composant soit monté côté client */}
            {!isMounted ? null : (
              <>
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
                <li
                  className={pathname === "/public/reflexo" ? styles.dropdown : ""}
                  onMouseEnter={() => pathname === "/public/reflexo" && setIsReflexoDropdownOpen(true)}
                  onMouseLeave={() => setIsReflexoDropdownOpen(false)}
                >
                  <Link
                    href="/public/reflexo"
                    className={pathname === "/public/reflexo" ? styles.active : ""}
                    onClick={(e) => {
                      if (window.innerWidth <= 768 && pathname === "/public/reflexo") {
                        e.preventDefault();
                        setIsReflexoDropdownOpen(!isReflexoDropdownOpen);
                      }
                    }}
                  >
                    Réfléxologie plantaire
                  </Link>
                  {pathname === "/public/reflexo" && (
                    <ul className={`${styles.dropdownMenu} ${isReflexoDropdownOpen ? styles.dropdownMenu_open : ""}`}>
                    <li>
                      <Link
                        href="/public/reflexo#definition"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsReflexoDropdownOpen(false);
                        }}
                      >
                        Qu&apos;est-ce que la réflexologie plantaire ?
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/public/reflexo#sportif"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsReflexoDropdownOpen(false);
                        }}
                      >
                        Réflexologie du sportif
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/public/reflexo#soin-support"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsReflexoDropdownOpen(false);
                        }}
                      >
                        Réflexologie comme soin de support
                      </Link>
                    </li>
                  </ul>
                  )}
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
                <li>
                  <button
                    onClick={handleLogout}
                    className={styles.header__logoutButton}
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            )}
            </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
