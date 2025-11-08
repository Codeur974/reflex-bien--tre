"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchWorks } from "@/store/slices/worksSlice";
import { Work } from "@/types/types";
import AdminWorksCard from "./AdminWorksCard";
import styles from "./adminWorks.module.scss";

interface AdminWorksListProps {
  onEdit: (work: Work) => void;
}

function AdminWorksList({ onEdit }: AdminWorksListProps) {
  const dispatch: AppDispatch = useDispatch();
  const { works, isLoading, error } = useSelector(
    (state: RootState) => state.works
  );
  const { token } = useSelector((state: RootState) => state.auth);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  const handleDelete = async (workId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce travail ?")) return;

    try {
      const response = await fetch(`${API_URL}/api/v1/works/${workId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Travail supprimé avec succès !");
        dispatch(fetchWorks());
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className={styles.adminWorks__list}>
      <h3>Liste des travaux ({works.length})</h3>
      {isLoading && <p>Chargement...</p>}
      {error && <p className={styles.adminWorks__error}>Erreur: {error}</p>}

      {works.length === 0 && !isLoading && (
        <p className={styles.adminWorks__empty}>Aucun travail pour le moment</p>
      )}

      <div className={styles.adminWorks__grid}>
        {works.map((work: Work) => (
          <AdminWorksCard
            key={work._id}
            work={work}
            onEdit={onEdit}
            onDelete={handleDelete}
            onUpdate={() => dispatch(fetchWorks())}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminWorksList;
