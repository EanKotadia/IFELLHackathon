import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import QRCode from "react-qr-code";

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
          <span className="hero__badge">♥ Hackathon 2026</span>
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
                      <path d="M12.1 21.05l-.1-.1-.11.1C7.14 16.74 4 13.86 4 10.5 4 7.97 5.97 6 8.5 6c1.54 0 3.04.81 3.87 2.09h.26C13.46 6.81 14.96 6 16.5 6 19.03 6 21 7.97 21 10.5c0 3.36-3.14 6.24-7.9 10.55z"/>
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
                    <div className="qr-real">
                        <QRCode
                            value="https://your-deployed-ifell-link.com"
                            size={180}
                            bgColor="#FFFFFF"
                            fgColor="#FF5C8A"
                            level="H"
                        />
                    </div>
                    <p className="download__qr-label">Scan to open iFell</p>
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
