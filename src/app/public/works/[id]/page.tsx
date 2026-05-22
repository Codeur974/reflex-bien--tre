"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Work } from "@/types/types";
import axios from "axios";
import styles from "./workDetail.module.scss";
import ZoomModal from "@/components/zoomModal/ZoomModal";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const normalizeUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${backendUrl}${url.startsWith("/") ? url : "/" + url}`;
};

export default function WorkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [work, setWork] = useState<Work | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/works/${params.id}`);
        setWork(response.data);
      } catch {
        setError("Erreur lors du chargement de l'intervention");
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) fetchWork();
  }, [params.id]);

  if (isLoading) return <div className={styles.loading}>Chargement...</div>;
  if (error) return <div className={styles.error}>Erreur : {error}</div>;
  if (!work) return <div className={styles.error}>Intervention non trouvée</div>;

  const coverUrl = normalizeUrl(work.cover);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Photos de mes interventions</h1>

      <button onClick={() => router.back()} className={styles.backButton}>
        ← Retour
      </button>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1>{work.title}</h1>
          {work.description && (
            <p className={styles.description}>{work.description}</p>
          )}
          <p className={styles.date}>
            <strong>Date :</strong>{" "}
            {new Date(work.date).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {coverUrl && (
          <div className={styles.coverWrapper}>
            <div className={styles.imageFrame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverUrl}
                alt={work.title}
                className={styles.cover}
                onClick={() => setZoomedImage(coverUrl)}
              />
            </div>
          </div>
        )}

        <div className={styles.gallery}>
          {work.files && work.files.length > 0 ? (
            work.files.map((file, idx) => {
              const fileUrl = normalizeUrl(file.url);
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
                        alt={file.description || `Photo ${idx + 1}`}
                        onClick={() => setZoomedImage(fileUrl)}
                        style={{ cursor: "pointer" }}
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
              Aucun média pour cette intervention.
            </div>
          )}
        </div>
      </div>

      {zoomedImage && (
        <ZoomModal src={zoomedImage} onClose={() => setZoomedImage(null)} />
      )}
    </div>
  );
}
