"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./zoomModal.module.scss";

interface ZoomModalProps {
  src: string;
  alt?: string;
  onClose: () => void;
}

export default function ZoomModal({ src, alt = "Zoom", onClose }: ZoomModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTouchDist = useRef<number | null>(null);

  const clampScale = (s: number) => Math.min(Math.max(s, 1), 5);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Fermer avec Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Empêcher le scroll de la page derrière
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Zoom molette
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => clampScale(s - e.deltaY * 0.002));
  };

  // Drag souris
  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - lastPosition.current.x, y: e.clientY - lastPosition.current.y };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const newPos = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    lastPosition.current = newPos;
    setPosition(newPos);
  };

  const onMouseUp = () => { isDragging.current = false; };

  // Double clic pour zoom rapide
  const onDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((s) => {
      const next = s < 2 ? 2 : s < 3.5 ? 3.5 : 1;
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
        lastPosition.current = { x: 0, y: 0 };
      }
      return next;
    });
  };

  // Pinch touch mobile
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDist.current = Math.hypot(dx, dy);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDist.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const delta = dist - lastTouchDist.current;
      lastTouchDist.current = dist;
      setScale((s) => clampScale(s + delta * 0.01));
    }
  };

  const onTouchEnd = () => { lastTouchDist.current = null; };

  const zoomIn = (e: React.MouseEvent) => { e.stopPropagation(); setScale((s) => clampScale(s + 0.5)); };
  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((s) => {
      const next = clampScale(s - 0.5);
      if (next === 1) { setPosition({ x: 0, y: 0 }); lastPosition.current = { x: 0, y: 0 }; }
      return next;
    });
  };
  const onReset = (e: React.MouseEvent) => { e.stopPropagation(); resetZoom(); lastPosition.current = { x: 0, y: 0 }; };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onDoubleClick={onDoubleClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ cursor: scale > 1 ? (isDragging.current ? "grabbing" : "grab") : "zoom-in" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={styles.image}
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          }}
          draggable={false}
        />
      </div>

      <div className={styles.controls} onClick={(e) => e.stopPropagation()}>
        <button className={styles.btn} onClick={zoomOut} title="Zoom -">−</button>
        <span className={styles.scaleLabel}>{Math.round(scale * 100)}%</span>
        <button className={styles.btn} onClick={zoomIn} title="Zoom +">+</button>
        <button className={styles.btn} onClick={onReset} title="Réinitialiser">⊙</button>
      </div>

      <button className={styles.close} onClick={onClose} title="Fermer">×</button>
    </div>
  );
}
