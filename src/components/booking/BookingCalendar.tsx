"use client";

import React, { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import styles from "./booking.module.scss";

interface Slot {
  id: string;
  date: string;
  time: string;
  status: "available" | "pending" | "confirmed";
}

export default function BookingCalendar() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookedMessage, setBookedMessage] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  const fetchSlots = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/v1/slots`);
      const data = await response.json();
      if (response.ok) {
        setSlots(data.slots || []);
      } else {
        setError(data.message || "Impossible de charger les créneaux disponibles.");
      }
    } catch (err) {
      console.error("Erreur:", err);
      setError("Erreur de connexion au serveur. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
    try {
      localStorage.setItem("rdvAccess", "true");
    } catch {
      // localStorage indisponible (navigation privée, etc.) — sans conséquence
    }
  }, []);

  const slotsByDate = slots.reduce<Record<string, Slot[]>>((acc, slot) => {
    const dateKey = slot.date.slice(0, 10);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(slot);
    return acc;
  }, {});

  const availableDates = Object.keys(slotsByDate).sort();

  const formatDayLabel = (dateKey: string) =>
    new Date(dateKey).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  const handleBooked = () => {
    setBookedMessage(
      "Votre demande a bien été envoyée. Patricia va la valider et vous serez recontacté(e) pour confirmation."
    );
    setSelectedSlot(null);
    setSelectedDate(null);
    fetchSlots();
  };

  if (isLoading) {
    return <p className={styles.bookingCalendar__status}>Chargement des créneaux...</p>;
  }

  if (error) {
    return <p className={styles.bookingCalendar__error}>{error}</p>;
  }

  if (bookedMessage) {
    return <p className={styles.bookingCalendar__success}>{bookedMessage}</p>;
  }

  if (selectedSlot) {
    return (
      <BookingForm
        slot={selectedSlot}
        onCancel={() => setSelectedSlot(null)}
        onBooked={handleBooked}
      />
    );
  }

  if (availableDates.length === 0) {
    return (
      <p className={styles.bookingCalendar__status}>
        Aucun créneau n&apos;est disponible pour le moment. Revenez consulter cette page prochainement.
      </p>
    );
  }

  return (
    <div className={styles.bookingCalendar}>
      <div className={styles.bookingCalendar__days}>
        {availableDates.map((dateKey) => {
          const daySlots = slotsByDate[dateKey];
          const hasAvailable = daySlots.some((s) => s.status === "available");
          return (
            <button
              key={dateKey}
              className={`${styles.bookingCalendar__day} ${
                selectedDate === dateKey ? styles.bookingCalendar__day_active : ""
              } ${!hasAvailable ? styles.bookingCalendar__day_full : ""}`}
              onClick={() => hasAvailable && setSelectedDate(dateKey)}
              disabled={!hasAvailable}
            >
              {formatDayLabel(dateKey)}
              {!hasAvailable && <span> (complet)</span>}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className={styles.bookingCalendar__slots}>
          <h3>Créneaux du {formatDayLabel(selectedDate)}</h3>
          <div className={styles.bookingCalendar__slotList}>
            {slotsByDate[selectedDate].map((slot) => (
              <button
                key={slot.id}
                className={`${styles.bookingCalendar__slot} ${
                  slot.status !== "available" ? styles.bookingCalendar__slot_taken : ""
                }`}
                disabled={slot.status !== "available"}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot.time}
                {slot.status !== "available" && <span> — pris</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
