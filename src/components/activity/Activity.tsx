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

  const lastNews = sortedNews.length > 0 ? sortedNews[0] : null;

  return (
    <div className={styles.container}>
      <div className={styles.activity} id="evenements">
        <div className={styles.activity__actu}>
          <LastNews news={lastNews} />
        </div>
        <div className={styles.activity__works}>
          {worksLoading && <p>Chargement...</p>}
          {worksError && <p>Erreur: {worksError}</p>}
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
