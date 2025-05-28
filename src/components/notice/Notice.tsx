"use client";

import React, { useEffect, useState } from "react";
import styles from "./notice.module.scss";

interface Review {
  author: string;
  rating: number;
  text: string;
}

function Notice() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulez une requête API
    setTimeout(() => {
      setReviews([
        {
          author: "Jean Dupont",
          rating: 5,
          text: "Un service exceptionnel, je recommande vivement !",
        },
        {
          author: "Marie Curie",
          rating: 4,
          text: "Très bonne expérience, merci beaucoup !",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={styles.notice}>
      <h2>Avis de nos clients</h2>
      {loading ? (
        <p>Chargement des avis...</p>
      ) : (
        <ul className={styles.notice__list}>
          {reviews.map((review, index) => (
            <li key={index} className={styles.notice__item}>
              <h3>{review.author}</h3>
              <p>Note : {review.rating} / 5</p>
              <p>{review.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notice;
