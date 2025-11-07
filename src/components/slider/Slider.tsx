"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./slider.module.scss";
import { useState, useEffect, useCallback } from "react";

interface SliderProps {
  items: {
    _id: string;
    title: string;
    cover: string;
  }[];
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

function Slider({ items }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className={styles.slider}>
      <div className={styles.slider__container}>
        {items.map((item, index) => {
          const imageUrl =
            item.cover &&
            (item.cover.startsWith("http") || item.cover.startsWith("//"))
              ? item.cover
              : `${backendUrl}${
                  item.cover.startsWith("/") ? item.cover : "/" + item.cover
                }`;
          console.log("item.cover:", item.cover);
          console.log("imageUrl:", imageUrl);
          return (
            <Link key={item._id} href="/public/works">
              <div
                className={`${styles.slider__item} ${
                  index === currentIndex ? styles.active : ""
                }`}
              >
                {item.cover ? (
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    width={300}
                    height={200}
                    className={styles.slider__image}
                  />
                ) : (
                  <div className={styles.slider__imagePlaceholder}>
                    Image non disponible
                  </div>
                )}
                <h3 className={styles.slider__title}>{item.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
      <div className={styles.slider__footer}>
        <Link href="/public/works" className={styles.linkToWorks}>
          Voir tous les travaux
        </Link>
      </div>
    </div>
  );
}

export default Slider;
