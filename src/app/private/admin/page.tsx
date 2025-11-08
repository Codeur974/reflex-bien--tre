"use client";

import { useState } from "react";
import AdminWorks from "@/components/adminWorks/AdminWorks";
import AdminNews from "@/components/adminNews/AdminNews";
import styles from "./adminPage.module.scss";

export default function AdminPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
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
          {openSection === "works" ? "▼" : "►"} Travaux / Événements
        </h2>
        {openSection === "works" && (
          <div className={styles.sectionContent}>
            <AdminWorks />
          </div>
        )}
      </div>
    </div>
  );
}
