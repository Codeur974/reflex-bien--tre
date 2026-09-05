"use client";

import { useState } from "react";
import AdminWorks from "@/components/adminWorks/AdminWorks";
import AdminNews from "@/components/adminNews/AdminNews";
import AdminBooking from "@/components/adminBooking/AdminBooking";
import styles from "./adminPage.module.scss";

export default function AdminPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const syncReviews = async () => {
    setIsSyncing(true);
    setSyncMessage("");

    try {
      const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
      const response = await fetch(`${API_URL}/api/v1/reviews/sync`, {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setSyncMessage(`✅ ${data.message}`);
      } else {
        setSyncMessage(`❌ Erreur: ${data.message}`);
      }
    } catch (error) {
      setSyncMessage("❌ Erreur lors de la synchronisation");
      console.error(error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className={styles.adminPage}>
      <div className={styles.section}>
        <h2
          className={styles.sectionTitle}
          onClick={() => toggleSection("news")}
        >
          {openSection === "news" ? "▼" : "►"} Actualités
        </h2>
        {openSection === "news" && (
          <div className={styles.sectionContent}>
            <AdminNews />
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h2
          className={styles.sectionTitle}
          onClick={() => toggleSection("works")}
        >
          {openSection === "works" ? "▼" : "►"} Photos de mes interventions
        </h2>
        {openSection === "works" && (
          <div className={styles.sectionContent}>
            <AdminWorks />
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h2
          className={styles.sectionTitle}
          onClick={() => toggleSection("booking")}
        >
          {openSection === "booking" ? "▼" : "►"} Rendez-vous
        </h2>
        {openSection === "booking" && (
          <div className={styles.sectionContent}>
            <AdminBooking />
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h2
          className={styles.sectionTitle}
          onClick={() => toggleSection("reviews")}
        >
          {openSection === "reviews" ? "▼" : "►"} Avis Clients
        </h2>
        {openSection === "reviews" && (
          <div className={styles.sectionContent}>
            <div className={styles.reviewsSync}>
              <p className={styles.reviewsSync__description}>
                Synchronisez automatiquement les derniers avis depuis votre page Resalib.
              </p>
              <button
                onClick={syncReviews}
                disabled={isSyncing}
                className={styles.reviewsSync__button}
              >
                {isSyncing ? "Synchronisation en cours..." : "🔄 Synchroniser les avis"}
              </button>
              {syncMessage && (
                <p className={styles.reviewsSync__message}>{syncMessage}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
