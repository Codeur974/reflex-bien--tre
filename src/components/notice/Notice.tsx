"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchReviews } from "@/store/slices/reviewsSlice";
import styles from "./notice.module.scss";

function Notice() {
  const dispatch = useDispatch<AppDispatch>();
  const { reviews, isLoading, error } = useSelector(
    (state: RootState) => state.reviews
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window === "undefined") return;
      setCardsPerView(window.innerWidth >= 768 ? 2 : 1);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const canNavigate = reviews.length > cardsPerView;

  const handleNext = useCallback(() => {
    if (reviews.length === 0) return;
    setCurrentIndex(
      (prevIndex) => (prevIndex + cardsPerView) % reviews.length
    );
  }, [reviews.length, cardsPerView]);

  const handlePrev = useCallback(() => {
    if (reviews.length === 0) return;
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - cardsPerView + reviews.length) % reviews.length
    );
  }, [reviews.length, cardsPerView]);

  useEffect(() => {
    if (reviews.length > cardsPerView) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [reviews.length, cardsPerView, handleNext]);

  const visibleReviews = useMemo(() => {
    if (reviews.length === 0) return [];
    const count = Math.min(cardsPerView, reviews.length);
    return Array.from({ length: count }, (_, idx) => {
      const reviewIndex = (currentIndex + idx) % reviews.length;
      return reviews[reviewIndex];
    });
  }, [reviews, currentIndex, cardsPerView]);

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className={styles.notice}>
      <h2>Avis de mes clients</h2>
      <div className={styles.notice__resalibBadge}>
        <span>✅ Avis certifiés Resalib</span>
      </div>

      {isLoading && (
        <p style={{ textAlign: "center", color: "#5a7a8f" }}>
          Chargement des avis...
        </p>
      )}
      {error && (
        <p style={{ textAlign: "center", color: "#e74c3c" }}>
          Erreur: {error}
        </p>
      )}

      {!isLoading && !error && reviews.length === 0 && (
        <p style={{ textAlign: "center", color: "#5a7a8f" }}>
          Aucun avis pour le moment
        </p>
      )}

      {!isLoading && reviews.length > 0 && (
        <div className={styles.notice__carousel}>
          <button
            className={styles.notice__carouselButton}
            onClick={handlePrev}
            aria-label="Avis précédent"
            disabled={!canNavigate}
          >
            {"<"}
          </button>

          <div className={styles.notice__carouselTrack}>
            {visibleReviews.map((review) => (
              <div key={review._id} className={styles.notice__card}>
                <div className={styles.notice__cardHeader}>
                  <div className={styles.notice__cardAuthor}>{review.author}</div>
                  <div className={styles.notice__cardDate}>{review.date}</div>
                </div>
                <div className={styles.notice__cardRating}>
                  {renderStars(review.rating)}
                </div>
                <p className={styles.notice__cardText}>{review.text}</p>
              </div>
            ))}
          </div>

          <button
            className={styles.notice__carouselButton}
            onClick={handleNext}
            aria-label="Avis suivant"
            disabled={!canNavigate}
          >
            {">"}
          </button>
        </div>
      )}

      <div className={styles.notice__link}>
        <a
          href="https://www.resalib.fr/praticien/103436-reflex-bienetre-reflexologue-saint-benoit#avis"
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir tous les avis sur Resalib
        </a>
      </div>
    </div>
  );
}

export default Notice;

