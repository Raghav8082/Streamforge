import { useEffect, useRef } from "react";
import "./cards.css";

const cardData = {
  title: "ECLIPSE",
  badge: "NOW STREAMING",
  tags: ["SCI-FI", "THRILLER"],
  meta: "2025 · A VORTEX ORIGINAL",
  rating: "9.1",
};
// Get the card Data from the data base API request ....

export default function EclipseCard({ standalone = false }) {
  const cardRef = useRef(null);

  // 3D mouse tilt
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      card.style.transform = `rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.03)`;
    };
    const handleLeave = () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };
    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const cardContent = (
    <div ref={cardRef} className="card">
      {/* Background */}
      <div className="bg" />

      {/* Geometric art */}
      <div className="geo-wrap">
        <div className="ring ring-outer" />
        <div className="ring ring-inner" />
        <div className="cross-h" />
        <div className="cross-v" />
        <div className="geo-dot" />
      </div>

      {/* HUD corners */}
      <div className="hud hud-tl" />
      <div className="hud hud-tr" />
      <div className="hud hud-bl" />
      <div className="hud hud-br" />

      {/* Shine overlay */}
      <div className="shine" />

      {/* Bottom info */}
      <div className="bottom">
        <div className="badge">
          <div className="badge-dot" />
          {cardData.badge}
        </div>
        <div className="tags-row">
          {cardData.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <div className="title">{cardData.title}</div>
        <div className="meta">
          <span className="star">★</span>
          {cardData.meta} · ★ {cardData.rating}
        </div>
      </div>
    </div>
  );

  if (standalone) {
    return <div className="scene">{cardContent}</div>;
  }

  return cardContent;
}
