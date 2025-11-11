"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./slider.module.scss";
import { useState, useEffect, useCallback, useMemo } from "react";
import { isVideoAsset, resolveMediaUrl } from "@/utils/media";

interface SliderProps {
  items: {
    _id: string;
    title: string;
    description?: string;
    cover: string;
  }[];
}

const SLIDER_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw";
const SLIDER_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAgACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpJpAiE1zs7mSYmtS+m/dgCsU5DFj0ripb3JepUvD84zTM5AqO7l3S+1KvOCK9ak7oyqqx0t32XvVC8Bji5qbUZMONp5FZ1zM8iDceBXmU1dI6YzWxm3e4YOOKWKT5RVx4w8eCKiS1C8k1305cu5nUjzbH/9k=";

function Slider({ items }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const router = useRouter();
  const hasMultipleItems = items.length > 1;

  const handleNext = useCallback(() => {
    if (!hasMultipleItems) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length, hasMultipleItems]);

  const handleClick = () => {
    router.push("/public/works");
  };

  useEffect(() => {
    if (currentIndex >= items.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, items.length]);

  useEffect(() => {
    if (!hasMultipleItems) return undefined;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [handleNext, hasMultipleItems]);

  useEffect(() => {
    if (playingVideoId) {
      setPlayingVideoId(null);
    }
  }, [currentIndex, playingVideoId]);

  const sliderItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        mediaUrl: resolveMediaUrl(item.cover),
        isVideo: isVideoAsset(item.cover),
      })),
    [items]
  );

  return (
    <div className={styles.slider}>
      <div className={styles.slider__container} onClick={handleClick}>
        {sliderItems.map((item, index) => {
          return (
            <div
              key={item._id}
              className={`${styles.slider__item} ${
                index === currentIndex ? styles.active : ""
              }`}
            >
              {item.cover ? (
                item.isVideo ? (
                  <div className={styles.slider__videoWrapper}>
                    {playingVideoId === item._id ? (
                      <video
                        src={item.mediaUrl}
                        className={styles.slider__image}
                        autoPlay
                        controls
                        playsInline
                        preload="metadata"
                        onEnded={() => setPlayingVideoId(null)}
                      />
                    ) : (
                      <button
                        type="button"
                        className={styles.slider__videoPlaceholder}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingVideoId(item._id);
                        }}
                      >
                        <span>▶</span>
                        <p>Lire la vidéo</p>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className={styles.slider__figure}>
                    <Image
                      src={item.mediaUrl}
                      alt={item.title}
                      fill
                      sizes={SLIDER_IMAGE_SIZES}
                      className={styles.slider__image}
                      priority={index === 0}
                      placeholder="blur"
                      blurDataURL={SLIDER_BLUR}
                    />
                  </div>
                )
              ) : (
                <div className={styles.slider__imagePlaceholder}>
                  Image non disponible
                </div>
              )}
              <h3 className={styles.slider__title}>{item.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
