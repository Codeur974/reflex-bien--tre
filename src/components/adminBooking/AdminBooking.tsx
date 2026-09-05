"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import styles from "./adminBooking.module.scss";

interface Slot {
  id: string;
  date: string;
  time: string;
  status: "available" | "pending" | "confirmed";
  client?: { firstName: string; lastName: string; phone: string };
}

export default function AdminBooking() {
  const { token } = useSelector((state: RootState) => state.auth);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  const [date, setDate] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createMessage, setCreateMessage] = useState("");

  const [upcomingSlots, setUpcomingSlots] = useState<Slot[]>([]);
  const [pendingSlots, setPendingSlots] = useState<Slot[]>([]);
  const [confirmedSlots, setConfirmedSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [slotsRes, pendingRes, confirmedRes] = await Promise.all([
        fetch(`${API_URL}/api/v1/slots`),
        fetch(`${API_URL}/api/v1/slots/pending`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/v1/slots/confirmed`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      const slotsData = await slotsRes.json();
      const pendingData = await pendingRes.json();
      const confirmedData = await confirmedRes.json();
      setUpcomingSlots(slotsData.slots || []);
      setPendingSlots(pendingData.slots || []);
      setConfirmedSlots(confirmedData.slots || []);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateDay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date) return;
    setIsCreating(true);
    setCreateMessage("");

    try {
      const response = await fetch(`${API_URL}/api/v1/slots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date }),
      });
      const data = await response.json();

      if (response.ok) {
        setCreateMessage("✅ Demi-journée ouverte (9h, 10h, 11h).");
        setDate("");
        fetchData();
      } else {
        setCreateMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setCreateMessage("❌ Erreur lors de la création.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteSlot = async (id: string) => {
    if (!confirm("Retirer ce créneau disponible ?")) return;
    try {
      const response = await fetch(`${API_URL}/api/v1/slots/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        fetchData();
      } else {
        const data = await response.json();
        setActionMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleConfirm = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/slots/${id}/confirm`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleRefuse = async (id: string) => {
    if (!confirm("Refuser cette demande de rendez-vous ?")) return;
    try {
      const response = await fetch(`${API_URL}/api/v1/slots/${id}/refuse`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  const availableSlots = upcomingSlots.filter((s) => s.status === "available");

  return (
    <div className={styles.adminBooking}>
      <div className={styles.adminBooking__block}>
        <h3>Ouvrir une demi-journée (9h, 10h, 11h)</h3>
        <form onSubmit={handleCreateDay} className={styles.adminBooking__form}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <button type="submit" disabled={isCreating}>
            {isCreating ? "Création..." : "Ouvrir"}
          </button>
        </form>
        {createMessage && <p>{createMessage}</p>}
      </div>

      <div className={styles.adminBooking__block}>
        <h3>Demandes en attente {pendingSlots.length > 0 && `(${pendingSlots.length})`}</h3>
        {actionMessage && <p>{actionMessage}</p>}
        {isLoading ? (
          <p>Chargement...</p>
        ) : pendingSlots.length === 0 ? (
          <p>Aucune demande en attente.</p>
        ) : (
          <ul className={styles.adminBooking__list}>
            {pendingSlots.map((slot) => (
              <li key={slot.id} className={styles.adminBooking__item}>
                <span>
                  {formatDate(slot.date)} à {slot.time} — {slot.client?.firstName}{" "}
                  {slot.client?.lastName} ({slot.client?.phone})
                </span>
                <div className={styles.adminBooking__itemActions}>
                  <button
                    className={styles.adminBooking__confirmBtn}
                    onClick={() => handleConfirm(slot.id)}
                  >
                    Confirmer
                  </button>
                  <button
                    className={styles.adminBooking__refuseBtn}
                    onClick={() => handleRefuse(slot.id)}
                  >
                    Refuser
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.adminBooking__block}>
        <h3>Rendez-vous confirmés à venir {confirmedSlots.length > 0 && `(${confirmedSlots.length})`}</h3>
        {isLoading ? (
          <p>Chargement...</p>
        ) : confirmedSlots.length === 0 ? (
          <p>Aucun rendez-vous confirmé à venir.</p>
        ) : (
          <ul className={styles.adminBooking__list}>
            {confirmedSlots.map((slot) => (
              <li key={slot.id} className={styles.adminBooking__item}>
                <span>
                  {formatDate(slot.date)} à {slot.time} — {slot.client?.firstName}{" "}
                  {slot.client?.lastName} ({slot.client?.phone})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.adminBooking__block}>
        <h3>Créneaux disponibles à venir</h3>
        {isLoading ? (
          <p>Chargement...</p>
        ) : availableSlots.length === 0 ? (
          <p>Aucun créneau disponible.</p>
        ) : (
          <ul className={styles.adminBooking__list}>
            {availableSlots.map((slot) => (
              <li key={slot.id} className={styles.adminBooking__item}>
                <span>
                  {formatDate(slot.date)} à {slot.time}
                </span>
                <button
                  className={styles.adminBooking__deleteBtn}
                  onClick={() => handleDeleteSlot(slot.id)}
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
