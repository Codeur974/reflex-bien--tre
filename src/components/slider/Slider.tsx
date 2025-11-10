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

function Slider({ items }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
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
                  <video
                    src={item.mediaUrl}
                    className={styles.slider__image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <div className={styles.slider__figure}>
                    <Image
                      src={item.mediaUrl}
                      alt={item.title}
                      fill
                      sizes={SLIDER_IMAGE_SIZES}
                      className={styles.slider__image}
                      priority={index === 0}
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
