import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const CATEGORIES = [
  { key: 'first-love',    label: 'First Love',    emoji: '🌹', desc: 'The story you never forgot.' },
  { key: 'heartbreak',    label: 'Heartbreak',    emoji: '💔', desc: 'The fracture that changed you.' },
  { key: 'long-distance', label: 'Long Distance', emoji: '✈️', desc: 'Love across miles and time zones.' },
  { key: 'unrequited',    label: 'Unrequited',    emoji: '🕯️', desc: 'A love that burned in silence.' },
  { key: 'self-love',     label: 'Self Love',     emoji: '🪞', desc: 'Coming home to yourself.' },
  { key: 'soulmates',     label: 'Soulmates',     emoji: '∞', desc: 'The ones who feel like fate.' },
];

const STATS = [
  { value: '2,400+', label: 'Stories Shared' },
  { value: '98',     label: 'Countries' },
  { value: '48hrs',  label: 'Hackathon Sprint' },
  { value: '∞',      label: 'Forms of Love' },
];

export default function LandingPage() {
  const heroRef = useRef(null);

  // Subtle parallax on hero text
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="landing">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg-orbs" aria-hidden>
          <div className="orb orb--1" />
          <div className="orb orb--2" />
          <div className="orb orb--3" />
        </div>

        <div className="hero__content" ref={heroRef}>
          <span className="hero__badge">♥ Hackathon 2025</span>
          <h1 className="hero__title">
            Every love story<br />
            <em>deserves to be told.</em>
          </h1>
          <p className="hero__subtitle">
            iFell is a 48-hour hackathon where developers, designers, and storytellers
            come together to build the most human thing imaginable — a place where love,
            in all its messy, beautiful forms, finally gets its platform.
          </p>
          <div className="hero__actions">
            <Link to="/submit" className="btn-primary hero__btn">Share Your Story</Link>
            <Link to="/read"   className="btn-ghost  hero__btn">Read Stories</Link>
          </div>
        </div>

        <div className="hero__scroll-hint" aria-hidden>
          <span />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats">
        <div className="container stats__grid">
          {STATS.map(s => (
            <div key={s.label} className="stats__item">
              <span className="stats__value">{s.value}</span>
              <span className="stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT / MANIFESTO ── */}
      <section className="manifesto container">
        <div className="manifesto__label">About the Hackathon</div>
        <h2 className="manifesto__heading">
          Built in 48 hours.<br />Rooted in a lifetime of feeling.
        </h2>
        <div className="manifesto__body">
          <p>
            Love is the most universal human experience — and the most underrepresented
            in the products we build. iFell was born from a simple frustration: why do
            we pour engineering hours into productivity tools and analytics dashboards,
            but almost nothing into helping people process, share, and celebrate the
            most formative emotional experiences of their lives?
          </p>
          <p>
            Over one weekend, teams from across the world will prototype apps, write
            stories, design interfaces, and build datasets — all centred on love.
            First love. Heartbreak. Long distance. Unrequited feelings. Self-discovery.
            The soulmate you found and the one you lost.
          </p>
          <p>
            The best submissions will be featured in the iFell app, published to the
            platform, and celebrated in our annual Love Issue — a curated anthology of
            the most moving, honest writing to come out of the event.
          </p>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="categories container">
        <div className="categories__header">
          <div className="manifesto__label">Themes</div>
          <h2 className="categories__title">Six categories.<br />One human thread.</h2>
        </div>
        <div className="categories__grid">
          {CATEGORIES.map(cat => (
            <div key={cat.key} className="cat-card">
              <span className="cat-card__emoji">{cat.emoji}</span>
              <h3 className="cat-card__name">{cat.label}</h3>
              <p  className="cat-card__desc">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DOWNLOAD ── */}
      <section className="download container">
        <div className="download__inner">
          <div className="download__text">
            <div className="manifesto__label">Get the App</div>
            <h2 className="download__title">Read love stories<br />anywhere you go.</h2>
            <p className="download__sub">
              The iFell app brings you real stories from real people — curated by our
              editorial team, searchable by theme, and readable offline. New stories
              drop every week.
            </p>
            <div className="download__buttons">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="store-btn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                  <path d="M3.18 23.76a2 2 0 0 0 2.06-.19l11.58-6.69-2.89-2.89L3.18 23.76zm16.1-10.53L16.66 11.5l-2.72 2.72 2.62 2.62c.63.63 1.65.63 2.28 0l.44-.44a1.61 1.61 0 0 0 0-2.17zM3.04.24a2 2 0 0 0-.54 1.4v20.72c0 .54.2 1.03.54 1.4l.07.07 11.6-11.6v-.27L3.11.17l-.07.07zm10.51 11.1L3.04.24l10.51 11.1z"/>
                </svg>
                <span>
                  <small>GET IT ON</small>
                  Google Play
                </span>
              </a>
            </div>
          </div>

          <div className="download__qr-wrap">
            <div className="download__qr-card">
              {/* Programmatic QR pattern — purely decorative SVG grid */}
              <svg
                className="qr-svg"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Scan to download iFell"
              >
                {/* Background */}
                <rect width="200" height="200" fill="#160B0F" rx="12"/>

                {/* Top-left finder */}
                <rect x="16" y="16" width="52" height="52" rx="6" fill="none" stroke="#E8294B" strokeWidth="6"/>
                <rect x="28" y="28" width="28" height="28" rx="3" fill="#E8294B"/>

                {/* Top-right finder */}
                <rect x="132" y="16" width="52" height="52" rx="6" fill="none" stroke="#E8294B" strokeWidth="6"/>
                <rect x="144" y="28" width="28" height="28" rx="3" fill="#E8294B"/>

                {/* Bottom-left finder */}
                <rect x="16" y="132" width="52" height="52" rx="6" fill="none" stroke="#E8294B" strokeWidth="6"/>
                <rect x="28" y="144" width="28" height="28" rx="3" fill="#E8294B"/>

                {/* Data dots — random-ish pattern */}
                {[
                  [84,16],[92,16],[100,16],[108,16],[84,24],[100,24],[108,24],
                  [84,32],[92,32],[84,40],[100,40],[84,48],[92,48],[108,48],
                  [84,56],[100,56],[108,56],[84,64],[92,64],[100,64],
                  [16,84],[32,84],[48,84],[56,84],[84,84],[92,84],[108,84],[116,84],[132,84],[148,84],[164,84],[180,84],
                  [16,92],[40,92],[56,92],[84,92],[100,92],[116,92],[132,92],[156,92],[172,92],
                  [16,100],[24,100],[40,100],[48,100],[60,100],[76,100],[92,100],[108,100],[124,100],[148,100],[164,100],[180,100],
                  [16,108],[32,108],[56,108],[72,108],[88,108],[108,108],[132,108],[140,108],[164,108],
                  [16,116],[24,116],[40,116],[56,116],[84,116],[100,116],[116,116],[140,116],[148,116],[164,116],[180,116],
                  [100,132],[116,132],[132,132],[148,132],[164,132],[180,132],
                  [100,140],[124,140],[148,140],[164,140],
                  [100,148],[108,148],[124,148],[132,148],[148,148],[180,148],
                  [100,156],[116,156],[140,156],[156,156],[164,156],
                  [100,164],[108,164],[124,164],[132,164],[148,164],[164,164],[180,164],
                  [100,172],[116,172],[132,172],[148,172],[164,172],[180,172],
                  [100,180],[108,180],[116,180],[140,180],[156,180],[172,180],
                ].map(([x,y], i) => (
                  <rect key={i} x={x} y={y} width="8" height="8" rx="1.5" fill="#E8294B" opacity="0.85"/>
                ))}

                {/* iFell text in centre */}
                <text x="100" y="106" textAnchor="middle" fill="#FFB3C6" fontSize="13" fontFamily="serif" fontStyle="italic" fontWeight="600">iFell</text>
              </svg>
              <p className="download__qr-label">Scan to download</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="cta-strip container">
        <div className="cta-strip__inner">
          <h2 className="cta-strip__title">Have a love story to tell?</h2>
          <p className="cta-strip__sub">No writing experience needed. Just honesty.</p>
          <Link to="/submit" className="btn-primary">Submit Your Story →</Link>
        </div>
      </section>

    </div>
  );
}
