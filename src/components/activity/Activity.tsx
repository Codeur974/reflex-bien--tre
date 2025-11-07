"use client";

import React, { useEffect } from "react";
import styles from "./activity.module.scss";
import Slider from "../slider/Slider";
import LastNews from "../lastnews/LastNews";
import Notice from "../notice/Notice";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchWorks } from "@/store/slices/worksSlice";

function Activity() {
  const dispatch: AppDispatch = useDispatch();
  const { works, isLoading, error } = useSelector(
    (state: RootState) => state.works
  );

  useEffect(() => {
    dispatch(fetchWorks());
  }, [dispatch]);

  // Trie les works par date décroissante (plus récent d'abord)
  const sortedWorks = [...works].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Récupère le dernier work (le plus récent)
  const lastWork = sortedWorks.length > 0 ? sortedWorks[0] : null;

  // Récupère la dernière image du tableau files, sinon la cover, sinon une image par défaut
  const lastImageRaw =
    lastWork && lastWork.files && lastWork.files.length > 0
      ? lastWork.files[lastWork.files.length - 1].url
      : lastWork?.cover || "";

  const lastImage =
    lastImageRaw && lastImageRaw.length > 0
      ? lastImageRaw.startsWith("/") || lastImageRaw.startsWith("http")
        ? lastImageRaw
        : "/" + lastImageRaw
      : "/default.jpg";
  // Mapping pour LastNews
  const firstNews = lastWork
    ? {
        id: 0,
        title: lastWork.title,
        description: lastWork.title,
        coverImage: lastImage,
        date: lastWork.date,
      }
    : null;

  return (
    <div className={styles.container}>
      <div className={styles.activity} id="evenements">
        <div className={styles.activity__actu}>
          <LastNews news={firstNews} />
        </div>
        <div className={styles.activity__works}>
          {isLoading && <p>Chargement...</p>}
          {error && <p>Erreur: {error}</p>}
          {sortedWorks.length > 0 && (
            <>
              <Slider items={sortedWorks} />
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <Link href="/public/works" className={styles.linkToWorks}>
                  Voir tous les travaux
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Notice />
    </div>
  );
}

export default Activity;
