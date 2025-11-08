"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchNews } from "@/store/slices/newsSlice";
import { News } from "@/types/types";
import AdminNewsCard from "./AdminNewsCard";
import styles from "./adminNews.module.scss";

interface AdminNewsListProps {
  onEdit: (news: News) => void;
}

function AdminNewsList({ onEdit }: AdminNewsListProps) {
  const dispatch: AppDispatch = useDispatch();
  const { news, isLoading, error } = useSelector(
    (state: RootState) => state.news
  );
  const { token } = useSelector((state: RootState) => state.auth);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  const handleDelete = async (newsId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) return;

    try {
      const response = await fetch(`${API_URL}/api/v1/news/${newsId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Annonce supprimée avec succès !");
        dispatch(fetchNews());
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className={styles.adminNews__list}>
      <h3>Liste des annonces ({news.length})</h3>
      {isLoading && <p>Chargement...</p>}
      {error && <p className={styles.adminNews__error}>Erreur: {error}</p>}

      {news.length === 0 && !isLoading && (
        <p className={styles.adminNews__empty}>Aucune annonce pour le moment</p>
      )}

      <div className={styles.adminNews__grid}>
        {news.map((newsItem: News) => (
          <AdminNewsCard
            key={newsItem._id}
            news={newsItem}
            onEdit={onEdit}
            onDelete={handleDelete}
            onUpdate={() => dispatch(fetchNews())}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminNewsList;
