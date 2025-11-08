"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchNews } from "@/store/slices/newsSlice";
import { News } from "@/types/types";
import styles from "./adminNews.module.scss";

interface AdminNewsFormProps {
  editingNews: News | null;
  onCancel: () => void;
}

function AdminNewsForm({ editingNews, onCancel }: AdminNewsFormProps) {
  const dispatch: AppDispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [filesArray, setFilesArray] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    if (editingNews) {
      setFormData({
        title: editingNews.title,
        description: editingNews.description || "",
        date: new Date(editingNews.date).toISOString().split("T")[0],
      });
    } else {
      setFormData({ title: "", description: "", date: "" });
      setCoverFile(null);
      setFilesArray(null);
    }
  }, [editingNews]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFilesArray(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("date", formData.date);

      if (coverFile) {
        formDataToSend.append("cover", coverFile);
      }

      if (filesArray) {
        Array.from(filesArray).forEach((file) => {
          formDataToSend.append("files", file);
        });
      }

      const url = editingNews
        ? `${API_URL}/api/v1/news/${editingNews._id}`
        : `${API_URL}/api/v1/news`;

      const method = editingNews ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        alert(editingNews ? "Annonce modifiée avec succès !" : "Annonce ajoutée avec succès !");
        setFormData({ title: "", description: "", date: "" });
        setCoverFile(null);
        setFilesArray(null);
        dispatch(fetchNews());
        onCancel();
      } else {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.message || "Impossible de sauvegarder l'annonce"}`);
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde de l'annonce");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.adminNews__form}>
      <h3>{editingNews ? "Modifier l'annonce" : "Ajouter une nouvelle annonce"}</h3>

      <div className={styles.adminNews__field}>
        <label htmlFor="title">Titre *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          placeholder="Ex: Promo de Janvier - 20% de réduction"
        />
      </div>

      <div className={styles.adminNews__field}>
        <label htmlFor="description">Commentaire / Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Ajoutez un commentaire sur cette annonce..."
          rows={4}
        />
      </div>

      <div className={styles.adminNews__field}>
        <label htmlFor="date">Date de l'annonce *</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.adminNews__field}>
        <label htmlFor="cover">
          Image de couverture {editingNews && "(laisser vide pour garder l'actuelle)"}
        </label>
        <input
          type="file"
          id="cover"
          accept="image/*"
          onChange={handleCoverChange}
          required={!editingNews}
        />
      </div>

      <div className={styles.adminNews__field}>
        <label htmlFor="files">
          Photos/Vidéos de l'annonce (plusieurs fichiers possibles)
        </label>
        <input
          type="file"
          id="files"
          accept="image/*,video/*"
          multiple
          onChange={handleFilesChange}
        />
      </div>

      <div className={styles.adminNews__formActions}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.adminNews__submitButton}
        >
          {isSubmitting ? "Envoi..." : editingNews ? "Modifier" : "Ajouter"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={styles.adminNews__cancelButton}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

export default AdminNewsForm;
