"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { News } from "@/types/types";
import axios from "axios";
import styles from "./newsDetail.module.scss";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/news/${params.id}`);
        setNews(response.data);
      } catch {
        setError("Erreur lors du chargement de l'annonce");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchNewsDetail();
    }
  }, [params.id]);

  if (isLoading) return <div className={styles.loading}>Chargement...</div>;
  if (error) return <div className={styles.error}>Erreur : {error}</div>;
  if (!news) return <div className={styles.error}>Annonce non trouvée</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Actualités</h1>

      <button onClick={() => router.back()} className={styles.backButton}>
        ← Retour
      </button>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1>{news.title}</h1>
          {news.description && (
            <p className={styles.description}>{news.description}</p>
          )}
          <p className={styles.date}>
            <strong>Date :</strong>{" "}
            {new Date(news.date).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className={styles.gallery}>
          {news.files && news.files.length > 0 ? (
            news.files.map((file, idx) => {
              const fileUrl = file.url.startsWith("http")
                ? file.url
                : `${backendUrl}${file.url.startsWith("/") ? file.url : "/" + file.url}`;

              return (
                <div key={idx} className={styles.mediaCard}>
                  <div className={styles.mediaWrapper}>
                    {file.type === "video" ? (
                      <video controls>
                        <source src={fileUrl} type="video/mp4" />
                        Votre navigateur ne supporte pas la vidéo.
                      </video>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={fileUrl}
                        alt={`Photo ${idx + 1}`}
                        onClick={() => setZoomedImage(fileUrl)}
                        style={{ cursor: 'pointer' }}
                      />
                    )}
                  </div>
                  {file.description && (
                    <div className={styles.mediaDescription}>
                      {file.description}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              Aucun média pour cette annonce.
            </div>
          )}
        </div>
      </div>

      {zoomedImage && (
        <div className={styles.zoomModal} onClick={() => setZoomedImage(null)}>
          <div className={styles.zoomModal__content}>
            <button className={styles.zoomModal__close} onClick={() => setZoomedImage(null)}>
              ×
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoomedImage} alt="Zoom" />
          </div>
        </div>
      )}
    </div>
  );
}
