"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const dropdownRef = useRef<HTMLUListElement>(null);
  const isClosingRef = useRef(false);
  const { token, role, isHydrated } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Forcer la synchronisation entre l'état et le DOM
  useEffect(() => {
    if (dropdownRef.current) {
      const hasClass = dropdownRef.current.classList.contains(styles.dropdownMenu_open);

      if (!isReflexoDropdownOpen && hasClass) {
        dropdownRef.current.classList.remove(styles.dropdownMenu_open);
      }
    }
  }, [isReflexoDropdownOpen]);

  // Vérification périodique pour détecter les incohérences
  useEffect(() => {
    const interval = setInterval(() => {
      if (dropdownRef.current && !isReflexoDropdownOpen) {
        const hasClass = dropdownRef.current.classList.contains(styles.dropdownMenu_open);
        if (hasClass) {
          dropdownRef.current.classList.remove(styles.dropdownMenu_open);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isReflexoDropdownOpen]);

  // Fermer le menu déroulant en cliquant en dehors
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      const dropdown = target.closest(`.${styles.dropdown}`);
      const dropdownMenu = target.closest(`.${styles.dropdownMenu}`);

      // Ne rien faire si on clique sur un lien du menu (ils gèrent eux-mêmes la fermeture)
      if (target.tagName === 'A' && dropdownMenu) {
        return;
      }

      // Si on clique en dehors du dropdown ET pas dans le menu, fermer
      if (isReflexoDropdownOpen && !dropdown && !dropdownMenu) {
        setIsReflexoDropdownOpen(false);
      }
    };

    // Ajouter un petit délai pour éviter les conflits
    if (isReflexoDropdownOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('touchend', handleClickOutside, true);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside, true);
        document.removeEventListener('touchend', handleClickOutside, true);
      };
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('touchend', handleClickOutside, true);
    };
  }, [isReflexoDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeDropdown = () => {
    isClosingRef.current = true;
    setIsReflexoDropdownOpen(false);
    if (typeof window !== "undefined" && window.innerWidth <= 1024) {
      setIsMenuOpen(false);
    }
    // Forcer le re-render et empêcher la réouverture
    if (dropdownRef.current) {
      dropdownRef.current.classList.remove(styles.dropdownMenu_open);
    }
    // Réinitialiser le flag après un délai
    setTimeout(() => {
      isClosingRef.current = false;
    }, 300);
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
                  onMouseEnter={() => {
                    if (window.innerWidth > 1024 && pathname === "/public/reflexo") {
                      setIsReflexoDropdownOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth > 1024) {
                      setIsReflexoDropdownOpen(false);
                    }
                  }}
                >
                  <Link
                    href="/public/reflexo"
                    className={pathname === "/public/reflexo" ? styles.active : ""}
                    onClick={(e) => {
                      if (pathname === "/public/reflexo" && window.innerWidth <= 1024) {
                        e.preventDefault();
                        e.stopPropagation();
                        // Ne pas rouvrir si on est en train de fermer
                        if (!isClosingRef.current) {
                          setIsReflexoDropdownOpen(!isReflexoDropdownOpen);
                        }
                      }
                    }}
                  >
                    Réfléxologie plantaire
                  </Link>
                  {pathname === "/public/reflexo" && (
                    <ul ref={dropdownRef} className={`${styles.dropdownMenu} ${isReflexoDropdownOpen ? styles.dropdownMenu_open : ""}`}>
                    <li>
                      <Link
                        href="/public/reflexo#definition"
                        onClick={(e) => {
                          e.stopPropagation();
                          closeDropdown();
                        }}
                      >
                        Qu&apos;est-ce que la réflexologie plantaire ?
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/public/reflexo#sportif"
                        onClick={(e) => {
                          e.stopPropagation();
                          closeDropdown();
                        }}
                      >
                        Réflexologie du sportif
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/public/reflexo#soin-support"
                        onClick={(e) => {
                          e.stopPropagation();
                          closeDropdown();
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
