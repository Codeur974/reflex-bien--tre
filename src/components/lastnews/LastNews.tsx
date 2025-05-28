"use client";

import React, { useState } from "react";
import styles from "./lastnews.module.scss";
import Image from "next/image";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  date: string;
}

interface LastNewsProps {
  news: NewsItem | null;
}

function LastNews({ news }: LastNewsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!news) {
    return <p>Aucune actualité disponible.</p>;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.lastNews}>
      <div className={styles.lastNews__content}>
        <h3 className={styles.lastNews__title}>{news.title}</h3>
        <Image
          width={300}
          height={200}
          src={news.coverImage}
          alt={news.title}
          className={styles.lastNews__image}
          onClick={handleOpenModal}
        />
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modal__content}>
            <button className={styles.modal__close} onClick={handleCloseModal}>
              &times;
            </button>
            <h3>{news.title}</h3>
            <Image
              src={news.coverImage}
              alt={news.title}
              width={300}
              height={200}
            />
            <p>
              <strong>Date :</strong> {news.date}
            </p>
            <p>{news.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LastNews;
