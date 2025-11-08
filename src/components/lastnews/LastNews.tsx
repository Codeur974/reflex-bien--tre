"use client";

import React from "react";
import { News } from "@/types/types";
import styles from "./lastnews.module.scss";
import { useRouter } from "next/navigation";

interface LastNewsProps {
  news: News | null;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

function LastNews({ news }: LastNewsProps) {
  const router = useRouter();

  if (!news) {
    return <p>Aucune actualité disponible.</p>;
  }

  const coverImageUrl = news.cover.startsWith("http")
    ? news.cover
    : `${API_URL}${news.cover.startsWith("/") ? news.cover : "/" + news.cover}`;

  const handleClick = () => {
    router.push(`/public/news/${news._id}`);
  };

  return (
    <div className={styles.lastNews}>
      <div className={styles.lastNews__content}>
        <h3 className={styles.lastNews__title}>{news.title}</h3>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImageUrl}
          alt={news.title}
          className={styles.lastNews__image}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default LastNews;
