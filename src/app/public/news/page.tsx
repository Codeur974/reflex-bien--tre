"use client";

import type { AppDispatch, RootState } from "@/store";
import { fetchNews } from "@/store/slices/newsSlice";
import type { News } from "@/types/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import styles from "./newsPage.module.scss";

export default function NewsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { news, isLoading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (isLoading) return <div className={styles.loading}>Chargement des annonces...</div>;
  if (error) return <div className={styles.error}>Erreur : {error}</div>;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const futureNews = [...news]
    .filter((item) => new Date(item.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Nos prochains rendez-vous</h1>

      {futureNews.length === 0 ? (
        <p className={styles.emptyState}>Aucun événement à venir pour le moment.</p>
      ) : (
        <div className={styles.grid}>
          {futureNews.map((item: News) => {
            const imageUrl =
              item.cover &&
              (item.cover.startsWith("http") || item.cover.startsWith("//"))
                ? item.cover
                : `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"}${
                    item.cover.startsWith("/") ? item.cover : "/" + item.cover
                  }`;

            return (
              <div
                key={item._id}
                className={styles.card}
                onClick={() => router.push(`/public/news/${item._id}`)}
              >
                <div className={styles.imageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt={item.title} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDate}>
                    {new Date(item.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
