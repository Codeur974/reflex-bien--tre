"use client";
import React, { useState } from "react";
import styles from "./footer.module.scss";

function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.footer}>
        <span>
          &copy; 2025 Reflex&apos;Bienêtre - Prenez soin de vous ,{" "}
          <a href="/public/contact" className={styles.footer__contactLink}>
            contactez-moi !
          </a>
        </span>
        <button
          className={styles.footer__link}
          onClick={() => setIsModalOpen(true)}
        >
          Mentions légales
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modal} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modal__close}
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2 className={styles.modal__title}>Mentions légales</h2>
            <div className={styles.modal__text}>
              <p>
                Conformément à la loi, la pratique de la réflexologie ne peut être en
                aucun cas assimilée à des soins médicaux ou de kinésithérapie, mais à
                une technique de <strong>bien-être</strong> par la{" "}
                <strong>relaxation physique</strong> et la détente{" "}
                <strong>libération du stress</strong>.
              </p>
              <p className={styles.modal__reference}>
                Loi du 30.04.1946 -
                <a
                  href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000877119/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modal__link}
                >
                  Consulter la loi
                </a>
              </p>
              <p className={styles.modal__reference}>
                Décret 60669 de l&apos;article L.489 -
                <a
                  href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006687813"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modal__link}
                >
                  Consulter le décret
                </a>
              </p>
              <p className={styles.modal__reference}>
                Arrêté du 8.10.1996 -
                <a
                  href="https://www.legifrance.gouv.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modal__link}
                >
                  Consulter sur Légifrance
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
