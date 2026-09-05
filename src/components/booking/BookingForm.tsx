"use client";

import React, { useState } from "react";
import styles from "./booking.module.scss";

interface Slot {
  id: string;
  date: string;
  time: string;
  status: string;
}

interface BookingFormProps {
  slot: Slot;
  onCancel: () => void;
  onBooked: () => void;
}

export default function BookingForm({ slot, onCancel, onBooked }: BookingFormProps) {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    try {
      const response = await fetch(`${API_URL}/api/v1/slots/${slot.id}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onBooked();
      } else {
        setError(data.message || "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("Erreur:", err);
      setError("Erreur de connexion au serveur. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedDate = new Date(slot.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className={styles.bookingForm}>
      <h3 className={styles.bookingForm__title}>
        Confirmer votre créneau : {formattedDate} à {slot.time}
      </h3>
      <form onSubmit={handleSubmit} className={styles.bookingForm__form}>
        <div className={styles.bookingForm__field}>
          <label htmlFor="firstName">Prénom *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.bookingForm__field}>
          <label htmlFor="lastName">Nom *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.bookingForm__field}>
          <label htmlFor="phone">Téléphone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className={styles.bookingForm__error}>{error}</p>}

        <div className={styles.bookingForm__actions}>
          <button type="button" onClick={onCancel} className={styles.bookingForm__cancelBtn}>
            Annuler
          </button>
          <button type="submit" disabled={isSubmitting} className={styles.bookingForm__submitBtn}>
            {isSubmitting ? "Envoi..." : "Envoyer la demande"}
          </button>
        </div>
      </form>
    </div>
  );
}
