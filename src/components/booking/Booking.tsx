import React from "react";
import styles from "./booking.module.scss";

function Booking() {
  return (
    <div className={styles.container}>
      <div className={styles.booking}>
        <h2 className={styles.booking__title}>Réserver votre séance</h2>
        <p className={styles.booking__subtitle}>
          Prenez rendez-vous en ligne directement via notre plateforme de
          réservation sécurisée
        </p>

        <div className={styles.booking__widget}>
          <iframe
            src="https://www.resalib.fr/praticien/103436-reflex-bienetre-reflexologue-saint-benoit"
            className={styles.booking__iframe}
            title="Réservation Resalib"
            loading="lazy"
          />
        </div>

        <div className={styles.booking__note}>
          <p>
            💡 <strong>Astuce :</strong> Le widget de réservation ci-dessus vous
            permet de voir mes disponibilités en temps réel et de réserver votre
            séance en toute simplicité.
          </p>
        </div>

        <div className={styles.booking__contact}>
          <div className={styles.booking__contactCard}>
            <span className={styles.booking__contactIcon}>📞</span>
            <h3>Téléphone</h3>
            <a href="tel:0692057275" className={styles.booking__contactLink}>
              06 92 253885
            </a>
          </div>

          <div className={styles.booking__contactCard}>
            <span className={styles.booking__contactIcon}>📘</span>
            <h3>Facebook</h3>
            <a
              href="https://www.facebook.com/share/1CT6KJca2N/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.booking__contactLink}
            >
              Suivez-nous
            </a>
          </div>

          <div className={styles.booking__contactCard}>
            <span className={styles.booking__contactIcon}>💬</span>
            <h3>WhatsApp</h3>
            <a
              href="https://wa.me/262692253885"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.booking__contactLink}
            >
              Écrivez-nous
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
