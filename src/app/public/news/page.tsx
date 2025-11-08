"use client";

import type { AppDispatch, RootState } from "@/store";
import { fetchNews } from "@/store/slices/newsSlice";
import type { News } from "@/types/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function NewsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { news, isLoading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (isLoading) return <div>Chargement des annonces...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!news || news.length === 0) return <div>Aucune annonce trouvée.</div>;

  return (
    <div>
      <h1>Liste des annonces</h1>
      <div>
        {news.map((item: News) => {
          const imageUrl =
            item.cover &&
            (item.cover.startsWith("http") || item.cover.startsWith("//"))
              ? item.cover
              : `${backendUrl}${
                  item.cover.startsWith("/") ? item.cover : "/" + item.cover
                }`;

          return (
            <div
              key={item._id}
              style={{ marginBottom: "2rem", cursor: "pointer" }}
              onClick={() => router.push(`/public/news/${item._id}`)}
            >
              {item.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={item.title}
                  width={300}
                  height={200}
                />
              ) : (
                <div>Image non disponible</div>
              )}
              <h3>{item.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
