"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchNews } from "@/store/slices/newsSlice";
import { News } from "@/types/types";
import AdminNewsForm from "./AdminNewsForm";
import AdminNewsList from "./AdminNewsList";
import styles from "./adminNews.module.scss";

function AdminNews() {
  const dispatch: AppDispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleEdit = (news: News) => {
    setEditingNews(news);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNews(null);
  };

  const handleToggleForm = () => {
    if (showForm) {
      setEditingNews(null);
    }
    setShowForm(!showForm);
  };

  return (
    <div className={styles.adminNews}>
      <div className={styles.adminNews__header}>
        <button
          onClick={handleToggleForm}
          className={styles.adminNews__addButton}
        >
          {showForm ? "Annuler" : "+ Ajouter une annonce"}
        </button>
      </div>

      {showForm && (
        <AdminNewsForm editingNews={editingNews} onCancel={handleCancel} />
      )}

      <AdminNewsList onEdit={handleEdit} />
    </div>
  );
}

export default AdminNews;
