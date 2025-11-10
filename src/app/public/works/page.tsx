"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./worksPage.module.scss";
import type { AppDispatch, RootState } from "@/store";
import { fetchWorks } from "@/store/slices/worksSlice";
import type { Work } from "@/types/types";
import { isVideoAsset, resolveMediaUrl } from "@/utils/media";

type WorkWithMedia = Work & {
  mediaUrl: string;
  isVideo: boolean;
};

const CARD_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 30vw";
const GALLERY_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px";

const normalizeFilePath = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("//")) {
    return path;
  }
  if (path.startsWith("/")) {
    return resolveMediaUrl(path);
  }
  if (path.startsWith("uploads/")) {
    return resolveMediaUrl(`/${path}`);
  }
  return resolveMediaUrl(`/uploads/${path}`);
};

export default function WorksPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { works, isLoading, error } = useSelector(
    (state: RootState) => state.works
  );

  const [selectedWork, setSelectedWork] = useState<WorkWithMedia | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchWorks());
  }, [dispatch]);

  const worksWithMedia: WorkWithMedia[] = useMemo(
    () =>
      (works ?? []).map((item) => ({
        ...item,
        mediaUrl: normalizeFilePath(item.cover ?? ""),
        isVideo: isVideoAsset(item.cover),
      })),
    [works]
  );

  useEffect(() => {
    if (!selectedWork) return;
    const updated = worksWithMedia.find(
      (work) => work._id === selectedWork._id
    );
    if (!updated) {
      setSelectedWork(null);
    } else if (updated !== selectedWork) {
      setSelectedWork(updated);
    }
  }, [selectedWork, worksWithMedia]);

  if (isLoading)
    return <div className={styles.loading}>Chargement des photos...</div>;
  if (error) return <div className={styles.error}>Erreur : {error}</div>;
  if (!worksWithMedia.length)
    return <div className={styles.error}>Aucune photo trouvée.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Photos de mes interventions</h1>

      <button onClick={() => router.back()} className={styles.backButton}>
        {"\u2190 Retour"}
      </button>

      <div className={styles.worksGrid}>
        {worksWithMedia.map((item) => (
          <div
            key={item._id}
            className={styles.workCard}
            onClick={() => setSelectedWork(item)}
          >
            <div className={styles.workCard__image}>
              {item.cover ? (
                item.isVideo ? (
                  <video
                    src={item.mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <div className={styles.workCard__imageFigure}>
                    <Image
                      src={item.mediaUrl}
                      alt={item.title}
                      fill
                      sizes={CARD_IMAGE_SIZES}
                      className={styles.workCard__imageMedia}
                      priority={false}
                    />
                  </div>
                )
              ) : (
                <div>Image non disponible</div>
              )}
            </div>
            <div className={styles.workCard__content}>
              <h3>{item.title}</h3>
              {item.description && (
                <p className={styles.workCard__description}>
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedWork && (
        <div className={styles.modal} onClick={() => setSelectedWork(null)}>
          <div
            className={styles.modal__content}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modal__close}
              onClick={() => setSelectedWork(null)}
            >
              ✕
            </button>
            <div className={styles.header}>
              <h2>{selectedWork.title}</h2>
              {selectedWork.description && (
                <p className={styles.description}>
                  {selectedWork.description}
                </p>
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
                  const fileUrl = normalizeFilePath(file.url);
                  return (
                    <div key={idx} className={styles.mediaCard}>
                      <div className={styles.mediaWrapper}>
                        {file.type === "video" ? (
                          <video controls preload="metadata">
                            <source src={fileUrl} type="video/mp4" />
                            Votre navigateur ne supporte pas la vidéo.
                          </video>
                        ) : (
                          <div className={styles.mediaWrapperImage}>
                            <Image
                              src={fileUrl}
                              alt={`Photo ${idx + 1}`}
                              fill
                              sizes={GALLERY_IMAGE_SIZES}
                              className={styles.mediaImage}
                              onClick={(e) => {
                                e.stopPropagation();
                                setZoomedImage(fileUrl);
                              }}
                            />
                          </div>
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
        </div>
      )}

      {zoomedImage && (
        <div className={styles.zoomModal} onClick={() => setZoomedImage(null)}>
          <div className={styles.zoomModal__content}>
            <button
              className={styles.zoomModal__close}
              onClick={() => setZoomedImage(null)}
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoomedImage} alt="Zoom" />
          </div>
        </div>
      )}
    </div>
  );
}
