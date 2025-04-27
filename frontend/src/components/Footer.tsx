// src/components/Footer.tsx
import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__section footer__section--brand">
            <h3>GigMap</h3>
            <p>
              Connecting freelancers and clients worldwide through an interactive map-based platform.
            </p>
            <div className="footer__social-links">
              <a href="#" className="footer__social-link">
                Facebook
              </a>
              <a href="#" className="footer__social-link">
                Twitter
              </a>
              <a href="#" className="footer__social-link">
                Instagram
              </a>
            </div>
          </div>
          <div className="footer__section">
            <h3>Quick Links</h3>
            <ul className="footer__quick-links">
              <li>
                <a href="/" className="footer__quick-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/create" className="footer__quick-link">
                  Create Pin
                </a>
              </li>
              <li>
                <a href="/freelancers" className="footer__quick-link">
                  Browse Freelancers
                </a>
              </li>
              <li>
                <a href="/about" className="footer__quick-link">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__section">
            <h3>Contact</h3>
            <ul className="footer__contact-links">
              <li>
                <a href="mailto:jjingofaroukk@gmail.com" className="footer__contact-link">
                  support@gigmap.com
                </a>
              </li>
              <li>
                <a href="tel:+256751360385" className="footer__contact-link">
                  +256 751 360 385
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__divider">
          <p className="footer__copyright">© {year} GigMap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;