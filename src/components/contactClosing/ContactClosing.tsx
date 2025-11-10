import React from "react";
import styles from "./contactClosing.module.scss";

function ContactClosing() {
  return (
    <div className={styles.closing}>
      <div className={styles.closing__content}>
        <div className={styles.closing__icon}>💚</div>
        <h3 className={styles.closing__title}>Merci de votre confiance !</h3>
        <p className={styles.closing__text}>
          Je suis impatiente de vous accompagner dans votre parcours de bien-être.
          Votre message sera traité avec attention et vous recevrez une réponse dans les plus brefs délais.
        </p>
      </div>
    </div>
  );
}

export default ContactClosing;
