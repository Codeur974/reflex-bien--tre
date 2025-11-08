"use client";

import React, { useState } from "react";
import { News } from "@/types/types";
import AdminFilesManager from "./AdminFilesManager";
import styles from "./adminNews.module.scss";

interface AdminNewsCardProps {
  news: News;
  onEdit: (news: News) => void;
  onDelete: (newsId: string) => void;
  onUpdate: () => void;
}

function AdminNewsCard({ news, onEdit, onDelete, onUpdate }: AdminNewsCardProps) {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const [showFilesManager, setShowFilesManager] = useState(false);

  return (
    <div className={`${styles.adminNews__card} ${showFilesManager ? styles.adminNews__cardModalOpen : ''}`}>
      <div className={styles.adminNews__cardImage}>
        <img
          src={`${API_URL}${news.cover.startsWith("/") ? news.cover : `/${news.cover}`}`}
          alt={news.title}
        />
      </div>
      <div className={styles.adminNews__cardContent}>
        <h4>{news.title}</h4>
        {news.description && (
          <p className={styles.adminNews__cardDescription}>
            {news.description}
          </p>
        )}
        <p className={styles.adminNews__cardDate}>
          {new Date(news.date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className={styles.adminNews__cardFiles}>
          {news.files.length} fichier(s)
        </p>
      </div>
      <div className={styles.adminNews__cardActions}>
        <button
          onClick={() => setShowFilesManager(true)}
          className={styles.adminNews__manageButton}
        >
          Gérer photos
        </button>
        <button
          onClick={() => onEdit(news)}
          className={styles.adminNews__editButton}
        >
          Modifier
        </button>
        <button
          onClick={() => onDelete(news._id)}
          className={styles.adminNews__deleteButton}
        >
          Supprimer
        </button>
      </div>

      {showFilesManager && (
        <AdminFilesManager
          news={news}
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

export default AdminNewsCard;
