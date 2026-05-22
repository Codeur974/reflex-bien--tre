"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./worksPage.module.scss";
import type { AppDispatch, RootState } from "@/store";
import { fetchWorks } from "@/store/slices/worksSlice";
import { fetchNews } from "@/store/slices/newsSlice";
import type { Work, News } from "@/types/types";
import { isVideoAsset, resolveMediaUrl } from "@/utils/media";
import ZoomModal from "@/components/zoomModal/ZoomModal";

type ItemWithMedia = (Work | News) & {
  mediaUrl: string;
  isVideo: boolean;
  itemType: "work" | "news";
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
  const { works, isLoading: worksLoading, error: worksError } = useSelector(
    (state: RootState) => state.works
  );
  const { news, isLoading: newsLoading } = useSelector(
    (state: RootState) => state.news
  );

  const [selectedItem, setSelectedItem] = useState<ItemWithMedia | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchWorks());
    dispatch(fetchNews());
  }, [dispatch]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allItems: ItemWithMedia[] = useMemo(() => {
    const workItems = (works ?? []).map((item) => ({
      ...item,
      mediaUrl: normalizeFilePath(item.cover ?? ""),
      isVideo: isVideoAsset(item.cover),
      itemType: "work" as const,
    }));
    const pastNewsItems = (news ?? [])
      .filter((item) => new Date(item.date) < today)
      .map((item) => ({
        ...item,
        mediaUrl: normalizeFilePath(item.cover ?? ""),
        isVideo: isVideoAsset(item.cover),
        itemType: "news" as const,
      }));
    return [...workItems, ...pastNewsItems].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [works, news]);

  if (worksLoading || newsLoading)
    return <div className={styles.loading}>Chargement des photos...</div>;
  if (worksError) return <div className={styles.error}>Erreur : {worksError}</div>;
  if (!allItems.length)
    return <div className={styles.error}>Aucune photo trouvée.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Photos de mes interventions</h1>

      <button onClick={() => router.back()} className={styles.backButton}>
        {"\u2190 Retour"}
      </button>

      <div className={styles.worksGrid}>
        {allItems.map((item) => (
          <div
            key={item._id}
            className={styles.workCard}
            onClick={() => setSelectedItem(item)}
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

      {selectedItem && (
        <div className={styles.modal} onClick={() => setSelectedItem(null)}>
          <div
            className={styles.modal__content}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modal__close}
              onClick={() => setSelectedItem(null)}
            >
              ✕
            </button>
            <div className={styles.header}>
              <h2>{selectedItem.title}</h2>
              {selectedItem.description && (
                <p className={styles.description}>
                  {selectedItem.description}
                </p>
              )}
              <p className={styles.date}>
                <strong>Date :</strong>{" "}
                {new Date(selectedItem.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className={styles.gallery}>
              {selectedItem.files && selectedItem.files.length > 0 ? (
                selectedItem.files.map((file, idx) => {
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
                  Aucun média pour cet élément.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {zoomedImage && (
        <ZoomModal src={zoomedImage} onClose={() => setZoomedImage(null)} />
      )}
    </div>
  );
}
