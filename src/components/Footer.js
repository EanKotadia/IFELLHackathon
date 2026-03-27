import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo"><span className="footer__i">i</span>Fell</span>
          <p>Stories of love, written by those who've lived them.</p>
        </div>

        <div className="footer__links">
          <Link to="/read">Read</Link>
          <Link to="/submit">Share a Story</Link>
          <Link to="/admin">Admin</Link>
        </div>

        <p className="footer__copy">© {new Date().getFullYear()} iFell Hackathon. Made with ♥</p>
      </div>
    </footer>
  );
}
