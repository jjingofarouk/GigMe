// src/components/Header.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            <div className="header__logo-icon">G</div>
            <span className="header__logo-text">GigMap</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="header__nav-desktop">
            <Link to="/" className="header__nav-link">
              Home
            </Link>
            <Link to="/freelancers" className="header__nav-link">
              Browse
            </Link>
            <Link to="/about" className="header__nav-link">
              About
            </Link>
            <Link to="/contact" className="header__nav-link">
              Contact
            </Link>
            <Link to="/create" className="header__nav-create">
              Create Pin
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="header__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* Mobile navigation */}
        <nav className={`header__nav-mobile ${mobileMenuOpen ? 'header__nav-mobile--open' : ''}`}>
          <ul className="header__nav-mobile-list">
            <li>
              <Link
                to="/"
                className="header__nav-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/freelancers"
                className="header__nav-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="header__nav-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="header__nav-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="header__nav-mobile-create"
                onClick={() => setMobileMenuOpen(false)}
              >
                Create Pin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;