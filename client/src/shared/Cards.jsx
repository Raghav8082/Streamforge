import { useEffect, useRef } from "react";

const cardData = {
  title: "ECLIPSE",
  badge: "NOW STREAMING",
  tags: ["SCI-FI", "THRILLER"],
  meta: "2025 · A VORTEX ORIGINAL",
  rating: "9.1",
};

export default function EclipseCard() {
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

  return (
    <div style={styles.scene}>
      <div ref={cardRef} style={styles.card}>
        {/* Background */}
        <div style={styles.bg} />

        {/* Geometric art */}
        <div style={styles.geoWrap}>
          <div style={{ ...styles.ring, ...styles.ringOuter }} />
          <div style={{ ...styles.ring, ...styles.ringInner }} />
          <div style={styles.crossH} />
          <div style={styles.crossV} />
          <div style={styles.geoDot} />
        </div>

        {/* HUD corners */}
        <div style={{ ...styles.hud, ...styles.hudTL }} />
        <div style={{ ...styles.hud, ...styles.hudTR }} />
        <div style={{ ...styles.hud, ...styles.hudBL }} />
        <div style={{ ...styles.hud, ...styles.hudBR }} />

        {/* Shine overlay */}
        <div style={styles.shine} />

        {/* Bottom info */}
        <div style={styles.bottom}>
          <div style={styles.badge}>
            <div style={styles.badgeDot} />
            {cardData.badge}
          </div>
          <div style={styles.tagsRow}>
            {cardData.tags.map((t) => (
              <span key={t} style={styles.tag}>{t}</span>
            ))}
          </div>
          <div style={styles.title}>{cardData.title}</div>
          <div style={styles.meta}>
            <span style={styles.star}>★</span>
            {cardData.meta} · ★ {cardData.rating}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Rajdhani:wght@600;700&display=swap');

        @keyframes spinOuter { to { transform: rotate(360deg); } }
        @keyframes spinInner { to { transform: rotate(-360deg); } }
        @keyframes nsPulse { 0%,100%{opacity:1} 50%{opacity:0.25} }

        .geo-outer-anim { animation: spinOuter 18s linear infinite; }
        .geo-inner-anim { animation: spinInner 12s linear infinite; }
        .ns-dot-anim    { animation: nsPulse 1.4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

const styles = {
  scene: {
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    perspective: "1000px",
  },
  card: {
    width: 260,
    height: 370,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.15s ease, box-shadow 0.4s ease",
    transformStyle: "preserve-3d",
    boxShadow:
      "0 30px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,106,0,0.4), 0 0 50px rgba(255,106,0,0.08)",
  },
  bg: {
    position: "absolute",
    inset: 0,
    borderRadius: 10,
    background: "linear-gradient(145deg,#200010 0%,#3d0020 40%,#0d0008 100%)",
  },
  geoWrap: {
    position: "absolute",
    top: "17%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 120,
    height: 120,
  },
  ring: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
  },
  ringOuter: {
    border: "1px solid rgba(255,106,0,0.35)",
    className: "geo-outer-anim",
    animation: "spinOuter 18s linear infinite",
  },
  ringInner: {
    inset: 18,
    border: "1px solid rgba(255,106,0,0.18)",
    animation: "spinInner 12s linear infinite",
  },
  crossH: {
    position: "absolute",
    top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    width: 60, height: 1,
    background: "rgba(255,106,0,0.45)",
  },
  crossV: {
    position: "absolute",
    top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    width: 1, height: 60,
    background: "rgba(255,106,0,0.45)",
  },
  geoDot: {
    position: "absolute",
    top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    width: 6, height: 6,
    borderRadius: "50%",
    background: "#FF6A00",
    boxShadow: "0 0 8px rgba(255,106,0,0.9)",
  },
  hud: {
    position: "absolute",
    width: 18, height: 18,
  },
  hudTL: {
    top: 10, left: 10,
    borderTop: "2px solid #FF6A00",
    borderLeft: "2px solid #FF6A00",
    borderRadius: "2px 0 0 0",
  },
  hudTR: {
    top: 10, right: 10,
    borderTop: "2px solid #FF6A00",
    borderRight: "2px solid #FF6A00",
    borderRadius: "0 2px 0 0",
  },
  hudBL: {
    bottom: 10, left: 10,
    borderBottom: "2px solid #FF6A00",
    borderLeft: "2px solid #FF6A00",
    borderRadius: "0 0 0 2px",
  },
  hudBR: {
    bottom: 10, right: 10,
    borderBottom: "2px solid #FF6A00",
    borderRight: "2px solid #FF6A00",
    borderRadius: "0 0 2px 0",
  },
  shine: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg,rgba(255,255,255,0.05) 0%,transparent 50%)",
    pointerEvents: "none",
    borderRadius: 10,
  },
  bottom: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    padding: "1.4rem 1.1rem 1rem",
    background:
      "linear-gradient(to top,rgba(0,0,0,0.97) 0%,rgba(0,0,0,0.6) 65%,transparent 100%)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "'Rajdhani',sans-serif",
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: "#FF6A00",
    border: "1px solid rgba(255,106,0,0.5)",
    padding: "2px 7px",
    borderRadius: 2,
    marginBottom: 7,
  },
  badgeDot: {
    width: 5, height: 5,
    borderRadius: "50%",
    background: "#FF6A00",
    animation: "nsPulse 1.4s ease-in-out infinite",
  },
  tagsRow: {
    display: "flex",
    gap: 5,
    marginBottom: 5,
  },
  tag: {
    fontFamily: "'Rajdhani',sans-serif",
    fontSize: 7.5,
    fontWeight: 700,
    letterSpacing: "2px",
    color: "rgba(255,255,255,0.45)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "1px 5px",
    borderRadius: 1,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "'Black Han Sans',sans-serif",
    fontSize: "2.2rem",
    letterSpacing: 4,
    color: "#fff",
    textShadow:
      "0 0 30px rgba(255,106,0,0.5),2px 2px 0 #aa3300,4px 4px 0 #550e00",
    lineHeight: 1,
    marginBottom: 6,
  },
  meta: {
    fontFamily: "'Rajdhani',sans-serif",
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: "2.5px",
    color: "rgba(255,255,255,0.38)",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  star: { color: "#FFB800" },
};