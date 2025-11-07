"use client";

import type { AppDispatch, RootState } from "@/store";
import { fetchWorks } from "@/store/slices/worksSlice";
import type { Work } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function WorksPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { works, isLoading, error } = useSelector(
    (state: RootState) => state.works
  );

  // Ajout de l'état pour la modal
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  useEffect(() => {
    dispatch(fetchWorks());
  }, [dispatch]);

  if (isLoading) return <div>Chargement des travaux...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!works || works.length === 0) return <div>Aucun travail trouvé.</div>;

  return (
    <div>
      <h1>Liste des travaux</h1>
      <div>
        {works.map((item: Work) => {
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
              onClick={() => setSelectedWork(item)}
            >
              {item.cover ? (
                <Image
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

      {/* Modal */}
      {selectedWork && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedWork(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: 30,
              borderRadius: 8,
              minWidth: 300,
              maxWidth: 800,
              maxHeight: "80vh",
              overflowY: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: 20,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setSelectedWork(null)}
            >
              ×
            </button>
            <h2>{selectedWork.title}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {selectedWork.files && selectedWork.files.length > 0 ? (
                selectedWork.files.map((file, idx) => {
                  const imgSrc = file.url.startsWith("http")
                    ? file.url
                    : file.url.startsWith("uploads/")
                    ? `${backendUrl}/${file.url}`
                    : `${backendUrl}/uploads/${file.url}`;

                  return file.type === "video" ? (
                    <video key={idx} controls width={200}>
                      <source src={imgSrc} type="video/mp4" />
                      Votre navigateur ne supporte pas la vidéo.
                    </video>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={idx}
                      src={imgSrc}
                      alt={`media-${idx}`}
                      width={200}
                    />
                  );
                })
              ) : (
                <p>Aucun média pour ce travail.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
