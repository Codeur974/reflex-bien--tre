"use client";

import React, { useState } from "react";
import styles from "./contactForm.module.scss";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "particulier",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    try {
      const response = await fetch(`${API_URL}/api/v1/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(data.message || "Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          type: "particulier",
          message: "",
        });
      } else {
        setSubmitMessage(data.message || "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setSubmitMessage("Erreur de connexion au serveur. Veuillez vérifier que le backend est démarré et réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactForm}>
      <h2 className={styles.contactForm__title}>Envoyez-nous un message</h2>
      <p className={styles.contactForm__subtitle}>
        Vous avez une question ? Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
      </p>

      <form onSubmit={handleSubmit} className={styles.contactForm__form}>
        <div className={styles.contactForm__row}>
          <div className={styles.contactForm__field}>
            <label htmlFor="name" className={styles.contactForm__label}>
              Nom complet <span className={styles.contactForm__required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.contactForm__input}
              placeholder="Votre nom"
            />
          </div>

          <div className={styles.contactForm__field}>
            <label htmlFor="email" className={styles.contactForm__label}>
              Email <span className={styles.contactForm__required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.contactForm__input}
              placeholder="votre@email.com"
            />
          </div>
        </div>

        <div className={styles.contactForm__row}>
          <div className={styles.contactForm__field}>
            <label htmlFor="phone" className={styles.contactForm__label}>
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.contactForm__input}
              placeholder="06 XX XX XX XX"
            />
          </div>

          <div className={styles.contactForm__field}>
            <label htmlFor="type" className={styles.contactForm__label}>
              Vous êtes <span className={styles.contactForm__required}>*</span>
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className={styles.contactForm__select}
            >
              <option value="particulier">Particulier</option>
              <option value="entreprise">Entreprise</option>
            </select>
          </div>
        </div>

        <div className={styles.contactForm__field}>
          <label htmlFor="message" className={styles.contactForm__label}>
            Message <span className={styles.contactForm__required}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className={styles.contactForm__textarea}
            placeholder="Votre message..."
          />
        </div>

        {submitMessage && (
          <div className={styles.contactForm__success}>
            {submitMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.contactForm__button}
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
