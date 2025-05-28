"use client";

import styles from "./slider.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface SliderProps {
  items: {
    id: number;
    title: string;
    coverImage: string;
  }[];
}

function Slider({ items }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Passe à l'image suivante toutes les 3 secondes
    }, 3000);

    return () => clearInterval(interval); // Nettoie l'intervalle lorsque le composant est démonté
  }, [handleNext]);

  return (
    <div className={styles.slider}>
      {items.map((item, index) => (
        <Link key={item.id} href="/public/works">
          <div
            className={`${styles.slider__item} ${
              index === currentIndex ? styles.active : ""
            }`}
          >
            <Image
              src={item.coverImage}
              alt={item.title}
              className={styles.slider__image}
              width={300}
              height={200}
            />
            <h3 className={styles.slider__title}>{item.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Slider;
