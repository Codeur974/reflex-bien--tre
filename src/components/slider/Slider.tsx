"use client";

import { useRouter } from "next/navigation";
import styles from "./slider.module.scss";
import { useState, useEffect, useCallback } from "react";

interface SliderProps {
  items: {
    _id: string;
    title: string;
    description?: string;
    cover: string;
  }[];
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

function Slider({ items }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const handleClick = () => {
    router.push("/public/works");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className={styles.slider}>
      <div className={styles.slider__container} onClick={handleClick}>
        {items.map((item, index) => {
          const imageUrl =
            item.cover &&
            (item.cover.startsWith("http") || item.cover.startsWith("//"))
              ? item.cover
              : `${backendUrl}${
                  item.cover.startsWith("/") ? item.cover : "/" + item.cover
                }`;

          const isVideo = item.cover.match(/\.(mp4|webm|ogg|mov)$/i);

          return (
            <div
              key={item._id}
              className={`${styles.slider__item} ${
                index === currentIndex ? styles.active : ""
              }`}
            >
              {item.cover ? (
                isVideo ? (
                  <video
                    src={imageUrl}
                    className={styles.slider__image}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className={styles.slider__image}
                  />
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
