import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Movie Zone': [
      { name: 'About Us', href: '#about' },
      { name: 'Contact', href: '#contact' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
    ],
    'Browse': [
      { name: 'Trending Movies', href: '/' },
      { name: 'Popular Movies', href: '/' },
      { name: 'Action Movies', href: '/genre/28/action' },
      { name: 'Comedy Movies', href: '/genre/35/comedy' },
    ],
    'Genres': [
      { name: 'Action', href: '/genre/28/action' },
      { name: 'Adventure', href: '/genre/12/adventure' },
      { name: 'Comedy', href: '/genre/35/comedy' },
      { name: 'Drama', href: '/genre/18/drama' },
      { name: 'Horror', href: '/genre/27/horror' },
      { name: 'Sci-Fi', href: '/genre/878/sci-fi' },
    ],
    'Connect': [
      { name: 'Facebook', href: '#facebook' },
      { name: 'Twitter', href: '#twitter' },
      { name: 'Instagram', href: '#instagram' },
      { name: 'YouTube', href: '#youtube' },
    ],
  };

  const socialIcons = {
    'Facebook': '📘',
    'Twitter': '🐦',
    'Instagram': '📷',
    'YouTube': '📺',
  };

  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="floating-particles"></div>
        <div className="gradient-overlay"></div>
      </div>
      
      <div className="footer-content">
        <div className="container">
          {/* Main Footer Content */}
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">🎬</span>
                <span className="logo-text">Movie Zone</span>
              </div>
              <p className="footer-description">
                Your ultimate destination for discovering and exploring amazing movies from around the world. 
                Find your next favorite film with our curated collection.
              </p>
              <div className="footer-social">
                {Object.entries(socialIcons).map(([platform, icon]) => (
                  <a 
                    key={platform}
                    href={footerLinks['Connect'].find(link => link.name === platform)?.href || '#'}
                    className="social-link"
                    aria-label={platform}
                  >
                    <span className="social-icon">{icon}</span>
                    <span className="social-text">{platform}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-links-grid">
              {Object.entries(footerLinks).slice(0, 3).map(([category, links]) => (
                <div key={category} className="footer-links-section">
                  <h3 className="footer-links-title">{category}</h3>
                  <ul className="footer-links-list">
                    {links.map((link, index) => (
                      <li key={index}>
                        <Link to={link.href} className="footer-link">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-copyright">
                <p>&copy; {currentYear} Movie Zone. All rights reserved.</p>
                <p>Made with ❤️ for movie lovers everywhere</p>
              </div>
              
              <div className="footer-bottom-links">
                <Link to="#privacy" className="footer-bottom-link">Privacy Policy</Link>
                <span className="separator">•</span>
                <Link to="#terms" className="footer-bottom-link">Terms of Service</Link>
                <span className="separator">•</span>
                <Link to="#cookies" className="footer-bottom-link">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="footer-decoration">
        <div className="decoration-line"></div>
        <div className="decoration-dots">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="dot" style={{ '--delay': `${i * 0.1}s` }}></span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
