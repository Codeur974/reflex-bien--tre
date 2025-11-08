"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchWorks } from "@/store/slices/worksSlice";
import { Work } from "@/types/types";
import AdminWorksForm from "./AdminWorksForm";
import AdminWorksList from "./AdminWorksList";
import styles from "./adminWorks.module.scss";

function AdminWorks() {
  const dispatch: AppDispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);

  useEffect(() => {
    dispatch(fetchWorks());
  }, [dispatch]);

  const handleEdit = (work: Work) => {
    setEditingWork(work);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingWork(null);
  };

  const handleToggleForm = () => {
    if (showForm) {
      setEditingWork(null);
    }
    setShowForm(!showForm);
  };

  return (
    <div className={styles.adminWorks}>
      <div className={styles.adminWorks__header}>
        <button
          onClick={handleToggleForm}
          className={styles.adminWorks__addButton}
        >
          {showForm ? "Annuler" : "+ Ajouter un travail"}
        </button>
      </div>

      {showForm && (
        <AdminWorksForm editingWork={editingWork} onCancel={handleCancel} />
      )}

      <AdminWorksList onEdit={handleEdit} />
    </div>
  );
}

export default AdminWorks;
