"use client";

import React, { useState } from "react";
import { Work } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import styles from "./adminWorks.module.scss";

interface AdminFilesManagerProps {
  work: Work;
  onClose: () => void;
  onUpdate: () => void;
}

function AdminFilesManager({ work, onClose, onUpdate }: AdminFilesManagerProps) {
  const { token } = useSelector((state: RootState) => state.auth);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  const files = work.files;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);

  const resolveUrl = (url: string) =>
    url.startsWith("http") ? url : `${API_URL}${url.startsWith("/") ? url : `/${url}`}`;

  const handleSaveDescription = async (fileUrl: string, fileDescription: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/works/${work._id}/file-description`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: fileUrl, description: fileDescription }),
      });

      if (response.ok) {
        setEditingIndex(null);
        setDescription("");
        onUpdate();
      } else {
        alert("Erreur lors de la mise à jour du commentaire");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour");
    }
  };

  const handleDeleteFile = async (fileUrl: string) => {
    if (!confirm("Supprimer cette photo ?")) return;
    setDeletingUrl(fileUrl);
    try {
      const response = await fetch(
        `${API_URL}/api/v1/works/${work._id}/file?url=${encodeURIComponent(fileUrl)}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        onUpdate();
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression");
    } finally {
      setDeletingUrl(null);
    }
  };

  return (
    <div className={styles.filesManager}>
      <div className={styles.filesManager__overlay} onClick={onClose}></div>
      <div className={styles.filesManager__modal}>
        <div className={styles.filesManager__header}>
          <h3>Gérer les photos de &quot;{work.title}&quot;</h3>
          <button onClick={onClose} className={styles.filesManager__closeBtn}>×</button>
        </div>

        <div className={styles.filesManager__content}>
          {files.length === 0 ? (
            <p>Aucun fichier dans ce travail</p>
          ) : (
            <div className={styles.filesManager__grid}>
              {files.map((file, index) => (
                <div key={index} className={styles.filesManager__item}>
                  <div className={styles.filesManager__imageWrapper}>
                    {file.type === "image" ? (
                      <img src={resolveUrl(file.url)} alt={`Photo ${index + 1}`} />
                    ) : (
                      <video src={resolveUrl(file.url)} controls />
                    )}
                    <button
                      className={styles.filesManager__deleteImgBtn}
                      onClick={() => handleDeleteFile(file.url)}
                      disabled={deletingUrl === file.url}
                      title="Supprimer cette photo"
                    >
                      {deletingUrl === file.url ? "..." : "✕"}
                    </button>
                  </div>

                  {editingIndex === index ? (
                    <div className={styles.filesManager__editForm}>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ajouter un commentaire..."
                        rows={3}
                      />
                      <div className={styles.filesManager__editActions}>
                        <button
                          onClick={() => handleSaveDescription(file.url, description)}
                          className={styles.filesManager__saveBtn}
                        >
                          Sauvegarder
                        </button>
                        <button
                          onClick={() => { setEditingIndex(null); setDescription(""); }}
                          className={styles.filesManager__cancelBtn}
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.filesManager__info}>
                      <p className={styles.filesManager__description}>
                        {file.description || <em>Aucun commentaire</em>}
                      </p>
                      <button
                        onClick={() => { setEditingIndex(index); setDescription(file.description || ""); }}
                        className={styles.filesManager__editBtn}
                      >
                        {file.description ? "Modifier" : "Ajouter"} commentaire
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminFilesManager;
