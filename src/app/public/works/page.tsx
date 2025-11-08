"use client";

import type { AppDispatch, RootState } from "@/store";
import { fetchWorks } from "@/store/slices/worksSlice";
import type { Work } from "@/types/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import styles from "./worksPage.module.scss";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function WorksPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { works, isLoading, error } = useSelector(
    (state: RootState) => state.works
  );

  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchWorks());
  }, [dispatch]);

  if (isLoading) return <div className={styles.loading}>Chargement des travaux...</div>;
  if (error) return <div className={styles.error}>Erreur : {error}</div>;
  if (!works || works.length === 0) return <div className={styles.error}>Aucun travail trouvé.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Mes Travaux</h1>

      <button onClick={() => router.back()} className={styles.backButton}>
        ← Retour
      </button>

      <div className={styles.worksGrid}>
        {works.map((item: Work) => {
          const imageUrl =
            item.cover &&
            (item.cover.startsWith("http") || item.cover.startsWith("//"))
              ? item.cover
              : `${backendUrl}${
                  item.cover.startsWith("/") ? item.cover : "/" + item.cover
                }`;

          return (
            <div
              key={item._id}
              className={styles.workCard}
              onClick={() => setSelectedWork(item)}
            >
              <div className={styles.workCard__image}>
                {item.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl}
                    alt={item.title}
                  />
                ) : (
                  <div>Image non disponible</div>
                )}
              </div>
              <div className={styles.workCard__content}>
                <h3>{item.title}</h3>
                {item.description && (
                  <p className={styles.workCard__description}>{item.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedWork && (
        <div className={styles.modal} onClick={() => setSelectedWork(null)}>
          <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modal__close} onClick={() => setSelectedWork(null)}>
              ×
            </button>
            <div className={styles.header}>
              <h2>{selectedWork.title}</h2>
              {selectedWork.description && (
                <p className={styles.description}>{selectedWork.description}</p>
              )}
              <p className={styles.date}>
                <strong>Date :</strong>{" "}
                {new Date(selectedWork.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className={styles.gallery}>
              {selectedWork.files && selectedWork.files.length > 0 ? (
                selectedWork.files.map((file, idx) => {
                  const fileUrl = file.url.startsWith("http")
                    ? file.url
                    : file.url.startsWith("uploads/")
                    ? `${backendUrl}/${file.url}`
                    : `${backendUrl}/uploads/${file.url}`;

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
                            onClick={(e) => {
                              e.stopPropagation();
                              setZoomedImage(fileUrl);
                            }}
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
                <div className={styles.emptyState}>Aucun média pour ce travail.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
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
