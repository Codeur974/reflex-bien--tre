"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchWorks } from "@/store/slices/worksSlice";
import { Work } from "@/types/types";
import styles from "./adminWorks.module.scss";

interface AdminWorksFormProps {
  editingWork: Work | null;
  onCancel: () => void;
}

function AdminWorksForm({ editingWork, onCancel }: AdminWorksFormProps) {
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
    if (editingWork) {
      setFormData({
        title: editingWork.title,
        description: editingWork.description || "",
        date: new Date(editingWork.date).toISOString().split("T")[0],
      });
    } else {
      setFormData({ title: "", description: "", date: "" });
      setCoverFile(null);
      setFilesArray(null);
    }
  }, [editingWork]);

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

      const url = editingWork
        ? `${API_URL}/api/v1/works/${editingWork._id}`
        : `${API_URL}/api/v1/works`;

      const method = editingWork ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        alert(editingWork ? "Travail modifié avec succès !" : "Travail ajouté avec succès !");
        setFormData({ title: "", description: "", date: "" });
        setCoverFile(null);
        setFilesArray(null);
        dispatch(fetchWorks());
        onCancel();
      } else {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.message || "Impossible de sauvegarder le travail"}`);
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde du travail");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.adminWorks__form}>
      <h3>{editingWork ? "Modifier le travail" : "Ajouter un nouveau travail"}</h3>

      <div className={styles.adminWorks__field}>
        <label htmlFor="title">Titre *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          placeholder="Ex: Atelier Réflexologie du 15 Janvier"
        />
      </div>

      <div className={styles.adminWorks__field}>
        <label htmlFor="description">Commentaire / Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Ajoutez un commentaire sur cet événement..."
          rows={4}
        />
      </div>

      <div className={styles.adminWorks__field}>
        <label htmlFor="date">Date de l&apos;événement *</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.adminWorks__field}>
        <label htmlFor="cover">
          Image/Vidéo de couverture {editingWork && "(laisser vide pour garder l&apos;actuelle)"}
        </label>
        <input
          type="file"
          id="cover"
          accept="image/*,video/*"
          onChange={handleCoverChange}
          required={!editingWork}
        />
      </div>

      <div className={styles.adminWorks__field}>
        <label htmlFor="files">
          Photos/Vidéos de l&apos;événement (plusieurs fichiers possibles)
        </label>
        <input
          type="file"
          id="files"
          accept="image/*,video/*"
          multiple
          onChange={handleFilesChange}
        />
      </div>

      <div className={styles.adminWorks__formActions}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.adminWorks__submitButton}
        >
          {isSubmitting ? "Envoi..." : editingWork ? "Modifier" : "Ajouter"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={styles.adminWorks__cancelButton}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

export default AdminWorksForm;
