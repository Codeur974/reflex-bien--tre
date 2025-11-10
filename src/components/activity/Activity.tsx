"use client";

import React, { useEffect } from "react";
import styles from "./activity.module.scss";
import Slider from "../slider/Slider";
import Notice from "../notice/Notice";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchWorks } from "@/store/slices/worksSlice";
import { fetchNews } from "@/store/slices/newsSlice";

function Activity() {
  const dispatch: AppDispatch = useDispatch();
  const { works, isLoading: worksLoading, error: worksError } = useSelector(
    (state: RootState) => state.works
  );
  const { news, isLoading: newsLoading, error: newsError } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchWorks());
    dispatch(fetchNews());
  }, [dispatch]);

  const sortedWorks = [...works].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const sortedNews = [...news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Filtrer les actualités futures uniquement (à partir d'aujourd'hui)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const futureNews = sortedNews.filter(
    (item) => new Date(item.date) >= today
  );

  return (
    <div className={styles.container}>
      <div className={styles.activity} id="evenements">
        <div className={styles.activity__newsWrapper}>
          <h2 className={styles.activity__sliderTitle}>Nos prochains rendez-vous</h2>
          <div className={styles.activity__actu}>
            {newsLoading && <p>Chargement...</p>}
            {newsError && <p>Erreur: {newsError}</p>}
            {futureNews.length > 0 ? (
              <Slider items={futureNews} />
            ) : (
              <div className={styles.activity__noEvent}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/materiel_de_reflexologie.jpg"
                  alt="Matériel de réflexologie"
                  className={styles.activity__noEventImage}
                />
                <p className={styles.activity__noEventText}>
                  Pas d&apos;événement prévu pour le moment
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.activity__worksWrapper}>
          <h2 className={styles.activity__sliderTitle}>La réflexologie en images</h2>
          <div className={styles.activity__works}>
            {worksLoading && <p>Chargement...</p>}
            {worksError && <p>Erreur: {worksError}</p>}
            {sortedWorks.length > 0 && (
              <>
                <Slider items={sortedWorks} />
                <div style={{ marginTop: "1rem", textAlign: "center" }}>
                  <Link href="/public/works" className={styles.linkToWorks}>
                    Voir toutes les photos
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Notice />
    </div>
  );
}

export default Activity;
