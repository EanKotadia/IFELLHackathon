import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <span className="nav__logo-i">i</span>Fell
        </Link>

        <div className="nav__links">
          <Link to="/read"   className={location.pathname === '/read'   ? 'active' : ''}>Read</Link>
          <Link to="/submit" className={location.pathname === '/submit' ? 'active' : ''}>Share a Story</Link>
        </div>

        <Link to="/submit" className="btn-primary nav__cta">
          Share ♥
        </Link>
      </div>
    </nav>
  );
}
