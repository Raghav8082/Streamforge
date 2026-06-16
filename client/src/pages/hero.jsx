import React, { useEffect, useRef, useState } from "react";
import "./hero.css";
import Navbar from "../shared/Navbar.jsx";
import EclipseCard from "../shared/Cards.jsx";

export default function HeroPage() {
  const curRef = useRef(null);
  const ringRef = useRef(null);
  const cardStackRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Setup custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (curRef.current) {
        curRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Hover scale effects on interactive elements
    const handleMouseEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
        ringRef.current.style.borderColor = "rgba(255, 106, 0, 0.9)";
      }
    };

    const handleMouseLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "32px";
        ringRef.current.style.height = "32px";
        ringRef.current.style.borderColor = "";
      }
    };

    const targets = document.querySelectorAll("button, a, .g-card, .m-card, .f-card");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Generate floating particles
  useEffect(() => {
    const list = [];
    for (let i = 0; i < 20; i++) {
      list.push({
        id: i,
        l: Math.random() * 100 + "%",
        d: 6 + Math.random() * 10 + "s",
        dl: Math.random() * 8 + "s",
      });
    }
    setParticles(list);
  }, []);

  // 3D Visual Stack Hover Tilt
  const handleStackMouseMove = (e) => {
    const stack = cardStackRef.current;
    if (!stack) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    stack.style.animation = "none";
    stack.style.transform = `rotateX(${5 - y * 15}deg) rotateY(${-15 + x * 20}deg)`;
  };

  const handleStackMouseLeave = () => {
    const stack = cardStackRef.current;
    if (!stack) return;
    stack.style.animation = "stackFloat 6s ease-in-out infinite";
  };

  // 3D Card tilt handler creator
  const handleTiltMouseMove = (e, maxRotate = 10, translateZ = 0) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    card.style.transform = translateZ
      ? `rotateX(${-y * maxRotate}deg) rotateY(${x * maxRotate}deg) translateZ(${translateZ}px)`
      : `translateZ(20px) rotateX(${-y * maxRotate}deg) rotateY(${x * maxRotate}deg) scale(1.05)`;
  };

  const handleTiltMouseLeave = (e) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <div className="hero-body">
      {/* Custom Cursor */}
      <div id="cur" ref={curRef}></div>
      <div id="cur-ring" ref={ringRef}></div>

      {/* Nav */}
      <Navbar />

      {/* Hero */}
      <section className="hero-sec">
        <div className="grid-floor"></div>
        <div className="scanlines"></div>
        <div className="beam"></div>
        <div className="particles">
          {particles.map((p) => (
            <div
              key={p.id}
              className="p"
              style={{
                "--l": p.l,
                "--d": p.d,
                "--dl": p.dl,
              }}
            />
          ))}
        </div>

        <div className="hero-text">
          <div className="eyebrow">Premium Streaming</div>
          <h1 className="hero-text-h1">
            <span className="main-word">DEVOUR</span>
            <span className="accent-word">CINEMA</span>
            <span className="small-word">50,000+ Titles · 4K Dolby · No Limits</span>
          </h1>
          <p className="hero-desc">
            Built for those who take film seriously. Every frame in full resolution, every genre without compromise — streamed at the edge of what's possible.
          </p>
          <div className="hero-actions">
            <button className="btn-fire">
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Start Watching
            </button>
            <button className="btn-steel">Browse Catalog →</button>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">
                50<b>K+</b>
              </div>
              <div className="stat-label">Titles</div>
            </div>
            <div>
              <div className="stat-num">
                4<b>K</b>
              </div>
              <div className="stat-label">Ultra HD</div>
            </div>
            <div>
              <div className="stat-num">
                12<b>M</b>
              </div>
              <div className="stat-label">Members</div>
            </div>
          </div>
        </div>

        {/* 3D Tilted Eclipse Card */}
        <div className="hero-visual">
          <div style={{
            width: "260px",
            height: "370px",
            transform: "perspective(1000px) rotateX(15deg) rotateY(15deg)",
            transformStyle: "preserve-3d"
          }}>
            <EclipseCard />
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          <div className="ticker-item"><span className="hi">▸ TRENDING</span></div>
          <div className="ticker-item">ECLIPSE</div>
          <div className="ticker-item">FRACTURED SKY</div>
          <div className="ticker-item">NEON NOIR</div>
          <div className="ticker-item">THE LAST VIGIL</div>
          <div className="ticker-item"><span class="cx">◆ NEW DROP</span></div>
          <div className="ticker-item">VOID WALKER</div>
          <div className="ticker-item">GHOST CIRCUIT</div>
          <div className="ticker-item">SOLARIS REBORN</div>
          <div className="ticker-item">MERIDIAN</div>
          <div className="ticker-item"><span className="hi">▸ ORIGINALS</span></div>
          <div className="ticker-item">PARALLEL</div>
          <div className="ticker-item">BLOODLINE</div>
          <div className="ticker-item">ZERO HOUR</div>
          {/* duplicate */}
          <div className="ticker-item"><span className="hi">▸ TRENDING</span></div>
          <div className="ticker-item">ECLIPSE</div>
          <div className="ticker-item">FRACTURED SKY</div>
          <div className="ticker-item">NEON NOIR</div>
          <div className="ticker-item">THE LAST VIGIL</div>
          <div className="ticker-item"><span class="cx">◆ NEW DROP</span></div>
          <div className="ticker-item">VOID WALKER</div>
          <div className="ticker-item">GHOST CIRCUIT</div>
          <div className="ticker-item">SOLARIS REBORN</div>
          <div className="ticker-item">MERIDIAN</div>
          <div className="ticker-item"><span className="hi">▸ ORIGINALS</span></div>
          <div className="ticker-item">PARALLEL</div>
          <div className="ticker-item">BLOODLINE</div>
          <div className="ticker-item">ZERO HOUR</div>
        </div>
      </div>

      {/* Genres */}
      <section className="sec" style={{ background: "var(--chrome)" }}>
        <div className="sec-label">Choose Your Weapon</div>
        <div className="sec-title">
          Every Genre.<br />
          <span className="og">Zero</span> Compromise.
        </div>
        <div className="genre-grid">
          <div
            className="g-card g-bg-1"
            onMouseMove={(e) => handleTiltMouseMove(e, 10)}
            onMouseLeave={handleTiltMouseLeave}
          >
            <div className="g-icon">🚀</div>
            <div className="g-name">Sci-Fi</div>
          </div>
          <div
            className="g-card g-bg-2"
            onMouseMove={(e) => handleTiltMouseMove(e, 10)}
            onMouseLeave={handleTiltMouseLeave}
          >
            <div className="g-icon">💀</div>
            <div className="g-name">Horror</div>
          </div>
          <div
            className="g-card g-bg-3"
            onMouseMove={(e) => handleTiltMouseMove(e, 10)}
            onMouseLeave={handleTiltMouseLeave}
          >
            <div className="g-icon">⚔️</div>
            <div className="g-name">Action</div>
          </div>
          <div
            className="g-card g-bg-4"
            onMouseMove={(e) => handleTiltMouseMove(e, 10)}
            onMouseLeave={handleTiltMouseLeave}
          >
            <div className="g-icon">🔬</div>
            <div className="g-name">Thriller</div>
          </div>
          <div
            className="g-card g-bg-5"
            onMouseMove={(e) => handleTiltMouseMove(e, 10)}
            onMouseLeave={handleTiltMouseLeave}
          >
            <div className="g-icon">🎭</div>
            <div className="g-name">Drama</div>
          </div>
          <div
            className="g-card g-bg-6"
            onMouseMove={(e) => handleTiltMouseMove(e, 10)}
            onMouseLeave={handleTiltMouseLeave}
          >
            <div className="g-icon">🌌</div>
            <div className="g-name">Fantasy</div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="sec">
        <div className="sec-label">This Week</div>
        <div className="sec-title">
          Top <span className="cx">Trending</span>
        </div>
        <div className="movies-grid">
          <div className="m-card">
            <div className="m-poster mp-1">
              <div className="m-shine"></div>
              <div className="m-rank">01</div>
              <div className="m-poster-text">ECLIPSE</div>
              <div className="m-play-overlay">
                <div className="m-play-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="m-info">
              <div className="m-name">Eclipse</div>
              <div className="m-sub">
                <span>Sci-Fi · Thriller</span>
                <span className="rt">★ 9.1</span>
              </div>
            </div>
          </div>

          <div className="m-card">
            <div className="m-poster mp-2">
              <div className="m-shine"></div>
              <div className="m-rank">02</div>
              <div className="m-poster-text" style={{ fontSize: "1.2rem" }}>
                NEON
                <br />
                NOIR
              </div>
              <div className="m-play-overlay">
                <div className="m-play-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="m-info">
              <div className="m-name">Neon Noir</div>
              <div className="m-sub">
                <span>Thriller · Crime</span>
                <span className="rt">★ 8.7</span>
              </div>
            </div>
          </div>

          <div className="m-card">
            <div className="m-poster mp-3">
              <div className="m-shine"></div>
              <div className="m-rank">03</div>
              <div className="m-poster-text" style={{ fontSize: "1.1rem" }}>
                VOID
                <br />
                WALKER
              </div>
              <div className="m-play-overlay">
                <div className="m-play-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="m-info">
              <div className="m-name">Void Walker</div>
              <div className="m-sub">
                <span>Action · Sci-Fi</span>
                <span className="rt">★ 8.4</span>
              </div>
            </div>
          </div>

          <div className="m-card">
            <div className="m-poster mp-4">
              <div className="m-shine"></div>
              <div className="m-rank">04</div>
              <div className="m-poster-text">MERIDIAN</div>
              <div className="m-play-overlay">
                <div className="m-play-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="m-info">
              <div className="m-name">Meridian</div>
              <div className="m-sub">
                <span>Drama · Mystery</span>
                <span className="rt">★ 9.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="sec" style={{ background: "var(--chrome)" }}>
        <div className="sec-label">Why Vortex</div>
        <div className="sec-title">
          Built <span className="og">Hard</span>
        </div>
        <div className="feat-grid">
          <div
            className="f-card"
            onMouseMove={(e) => handleTiltMouseMove(e, 6, 16)}
            onMouseLeave={handleTiltMouseLeave}
          >
            <div className="f-num">01</div>
            <div className="f-icon-wrap">🎬</div>
            <div className="f-title">4K Dolby Vision</div>
            <div className="f-desc">
              Every frame delivered at director-spec resolution. HDR, lossless audio, 120fps where it counts — no compression excuses.
            </div>
          </div>

          <div
            className="f-card"
            onMouseMove={(e) => handleTiltMouseMove(e, 6, 16)}
            onMouseLeave={handleTiltMouseLeave}
          >
            <div className="f-num">02</div>
            <div className="f-icon-wrap">⬇️</div>
            <div className="f-title">Offline. Unlimited.</div>
            <div className="f-desc">
              Download 100 titles. Watch on planes, trains, mountains. No expiry, no throttle, no excuses for not watching.
            </div>
          </div>

          <div
            className="f-card"
            onMouseMove={(e) => handleTiltMouseMove(e, 6, 16)}
            onMouseLeave={handleTiltMouseLeave}
          >
            <div className="f-num">03</div>
            <div className="f-icon-wrap">🤖</div>
            <div className="f-title">AI That Gets It</div>
            <div className="f-desc">
              Our engine reads your taste at the level of theme, pacing and tone — not just genre tags. It finds films you didn't know you needed.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-wrap">
        <div className="cta-slash cs-tl"></div>
        <div className="cta-slash cs-br"></div>
        <div className="cta-eyebrow">Ready to Devour</div>
        <div className="cta-title">
          Your Next
          <br />
          <span className="og">Obsession</span>
          <br />
          Starts Now
        </div>
        <div className="cta-sub">30 days free. No card required. Cancel any time.</div>
        <div className="cta-row">
          <input className="cta-input" type="email" placeholder="Enter your email" />
          <button className="cta-submit">Ignite →</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="hero-footer">
        <div className="f-logo">
          VOR<b>TEX</b>
        </div>
        <div className="f-links">
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
        <div className="f-copy">© 2025 Vortex Streaming. All rights reserved.</div>
      </footer>
    </div>
  );
}