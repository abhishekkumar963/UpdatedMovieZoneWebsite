import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import { fetchGenres } from '../services/api';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [genresLoading, setGenresLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Popular genre IDs (these are standard TMDB genre IDs)
  const popularGenres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 878, name: 'Sci-Fi' },
    { id: 10749, name: 'Romance' },
    { id: 53, name: 'Thriller' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await fetchGenres();
        setGenres(genresData.genres);
      } catch (error) {
        console.error('Failed to load genres:', error);
        // Fallback to popular genres if API fails
        setGenres(popularGenres);
      } finally {
        setGenresLoading(false);
      }
    };

    loadGenres();
  }, [popularGenres]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search/${query}`);
      setMobileMenuOpen(false);
    }
  };

  const handleGenreClick = (genreId, genreName) => {
    navigate(`/genre/${genreId}/${genreName.toLowerCase()}`);
    setMobileMenuOpen(false);
  };

  const isActiveGenre = (genreId) => {
    return location.pathname.includes(`/genre/${genreId}`);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-background">
        <div className="animated-gradient"></div>
      </div>
      
      <div className="navbar-container">
        {/* Left Section - Logo */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">Movie Zone</span>
          </Link>
        </div>

        {/* Center Section - Genre Buttons */}
        <div className="navbar-center">
          <div className="genre-buttons">
            {!genresLoading && (
              <div className="genre-list">
                {popularGenres.map((genre, index) => (
                  <button
                    key={genre.id}
                    className={`genre-button ${isActiveGenre(genre.id) ? 'active' : ''}`}
                    onClick={() => handleGenreClick(genre.id, genre.name)}
                    style={{ '--index': index }}
                  >
                    <span className="genre-text">{genre.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Search and Links */}
        <div className="navbar-right">
          <div className="navbar-search">
            <SearchBar onSearch={handleSearch} placeholder="Search movies..." />
          </div>
          
          <div className="navbar-links">
            <Link to="/" className="nav-link">
              <span className="link-text">Home</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="navbar-mobile">
            <button 
              className="mobile-menu-button"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-background">
          <div className="mobile-gradient"></div>
        </div>
        <div className="mobile-menu-content">
          <div className="mobile-search">
            <SearchBar onSearch={handleSearch} placeholder="Search movies..." />
          </div>
          <div className="mobile-links">
            <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              <span className="mobile-link-text">Home</span>
              <span className="mobile-link-icon">🏠</span>
            </Link>
          </div>
          
          {/* Mobile Genre Buttons */}
          <div className="mobile-genres">
            <h3 className="mobile-genres-title">
              <span className="title-text">Browse by Genre</span>
            </h3>
            <div className="mobile-genre-list">
              {!genresLoading && popularGenres.map((genre, index) => (
                <button
                  key={genre.id}
                  className={`mobile-genre-button ${isActiveGenre(genre.id) ? 'active' : ''}`}
                  onClick={() => handleGenreClick(genre.id, genre.name)}
                  style={{ '--index': index }}
                >
                  <span className="mobile-genre-text">{genre.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
