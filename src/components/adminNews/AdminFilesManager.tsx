"use client";

import React, { useState } from "react";
import { News, File as NewsFile } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import styles from "./adminNews.module.scss";

interface AdminFilesManagerProps {
  news: News;
  onClose: () => void;
  onUpdate: () => void;
}

function AdminFilesManager({ news, onClose, onUpdate }: AdminFilesManagerProps) {
  const { token } = useSelector((state: RootState) => state.auth);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  const [files, setFiles] = useState<NewsFile[]>(news.files);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleSaveDescription = async (fileUrl: string, fileDescription: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/news/${news._id}/file-description`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: fileUrl, description: fileDescription }),
      });

      if (response.ok) {
        alert("Commentaire mis à jour avec succès !");
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

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setDescription(files[index].description || "");
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setDescription("");
  };

  const handleToggleSelect = (fileUrl: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileUrl)
        ? prev.filter(url => url !== fileUrl)
        : [...prev, fileUrl]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedFiles.length === 0) {
      alert("Aucune photo sélectionnée");
      return;
    }

    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedFiles.length} photo(s) ?`)) {
      return;
    }

    try {
      for (const fileUrl of selectedFiles) {
        const response = await fetch(`${API_URL}/api/v1/news/${news._id}/file?url=${encodeURIComponent(fileUrl)}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la suppression");
        }
      }

      alert("Photos supprimées avec succès !");
      setSelectedFiles([]);
      onUpdate();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression des photos");
    }
  };

  return (
    <div className={styles.filesManager}>
      <div className={styles.filesManager__overlay} onClick={onClose}></div>
      <div className={styles.filesManager__modal}>
        <div className={styles.filesManager__header}>
          <h3>Gérer les photos de "{news.title}"</h3>
          <button onClick={onClose} className={styles.filesManager__closeBtn}>
            ×
          </button>
        </div>

        {selectedFiles.length > 0 && (
          <div className={styles.filesManager__actions}>
            <button
              onClick={handleDeleteSelected}
              className={styles.filesManager__deleteBtn}
            >
              Supprimer {selectedFiles.length} photo(s) sélectionnée(s)
            </button>
          </div>
        )}

        <div className={styles.filesManager__content}>
          {files.length === 0 ? (
            <p>Aucun fichier dans cette annonce</p>
          ) : (
            <div className={styles.filesManager__grid}>
              {files.map((file, index) => (
                <div key={index} className={styles.filesManager__item}>
                  <div className={styles.filesManager__selectWrapper}>
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.url)}
                      onChange={() => handleToggleSelect(file.url)}
                      className={styles.filesManager__checkbox}
                    />
                  </div>
                  <div className={styles.filesManager__imageWrapper}>
                    {file.type === "image" ? (
                      <img
                        src={`${API_URL}${file.url.startsWith("/") ? file.url : `/${file.url}`}`}
                        alt={`Photo ${index + 1}`}
                      />
                    ) : (
                      <video
                        src={`${API_URL}${file.url.startsWith("/") ? file.url : `/${file.url}`}`}
                        controls
                      />
                    )}
                  </div>

                  {editingIndex === index ? (
                    <div className={styles.filesManager__editForm}>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ajouter un commentaire pour cette photo..."
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
                          onClick={handleCancel}
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
                        onClick={() => handleEdit(index)}
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
