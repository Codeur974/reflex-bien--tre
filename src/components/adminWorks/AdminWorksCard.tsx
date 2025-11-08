"use client";

import React, { useState } from "react";
import { Work } from "@/types/types";
import AdminFilesManager from "./AdminFilesManager";
import styles from "./adminWorks.module.scss";

interface AdminWorksCardProps {
  work: Work;
  onEdit: (work: Work) => void;
  onDelete: (workId: string) => void;
  onUpdate: () => void;
}

function AdminWorksCard({ work, onEdit, onDelete, onUpdate }: AdminWorksCardProps) {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const [showFilesManager, setShowFilesManager] = useState(false);

  return (
    <div className={`${styles.adminWorks__card} ${showFilesManager ? styles.adminWorks__cardModalOpen : ''}`}>
      <div className={styles.adminWorks__cardImage}>
        <img
          src={`${API_URL}${work.cover.startsWith("/") ? work.cover : `/${work.cover}`}`}
          alt={work.title}
        />
      </div>
      <div className={styles.adminWorks__cardContent}>
        <h4>{work.title}</h4>
        {work.description && (
          <p className={styles.adminWorks__cardDescription}>
            {work.description}
          </p>
        )}
        <p className={styles.adminWorks__cardDate}>
          {new Date(work.date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className={styles.adminWorks__cardFiles}>
          {work.files.length} fichier(s)
        </p>
      </div>
      <div className={styles.adminWorks__cardActions}>
        <button
          onClick={() => setShowFilesManager(true)}
          className={styles.adminWorks__manageButton}
        >
          Gérer photos
        </button>
        <button
          onClick={() => onEdit(work)}
          className={styles.adminWorks__editButton}
        >
          Modifier
        </button>
        <button
          onClick={() => onDelete(work._id)}
          className={styles.adminWorks__deleteButton}
        >
          Supprimer
        </button>
      </div>

      {showFilesManager && (
        <AdminFilesManager
          work={work}
          onClose={() => setShowFilesManager(false)}
          onUpdate={() => {
            setShowFilesManager(false);
            onUpdate();
          }}
        />
      )}
    </div>
  );
}

export default AdminWorksCard;
