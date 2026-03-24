import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchMovieDetails, getImageUrl, getImageUrlOriginal } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchMovieData();
    checkFavoriteStatus();
  }, [id]);

  const fetchMovieData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const movieData = await fetchMovieDetails(id);
      setMovie(movieData);
    } catch (err) {
      setError(err.message || 'Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    setIsFavorite(favorites.includes(id));
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const newFavorites = favorites.filter(movieId => movieId !== id);
      localStorage.setItem('favoriteMovies', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      favorites.push(id);
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="movie-details-container">
        <LoadingSpinner size="large" text="Loading movie details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-details-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
          <div className="error-actions">
            <button className="retry-button" onClick={fetchMovieData}>
              Try Again
            </button>
            <Link to="/" className="home-button">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-details-container">
        <div className="error-container">
          <p>Movie not found</p>
          <Link to="/" className="home-button">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    poster_path,
    backdrop_path,
    overview,
    vote_average,
    release_date,
    genres,
    runtime,
    budget,
    revenue,
    production_companies,
    credits,
  } = movie;

  const backdropUrl = getImageUrlOriginal(backdrop_path);
  const posterUrl = getImageUrl(poster_path);
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
  const year = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const director = credits?.crew?.find(person => person.job === 'Director');
  const topCast = credits?.cast?.slice(0, 5) || [];

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'high';
    if (rating >= 6) return 'medium';
    return 'low';
  };

  return (
    <div className="movie-details-container">
      {/* Backdrop */}
      <div 
        className="movie-backdrop"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      <div className="movie-details-content">
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">{title}</span>
          </div>

          <div className="movie-details-grid">
            {/* Poster */}
            <div className="movie-poster-section">
              <img
                src={posterUrl}
                alt={title}
                className="movie-poster"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                }}
              />
              
              <button 
                className={`favorite-button ${isFavorite ? 'active' : ''}`}
                onClick={toggleFavorite}
              >
                {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
            </div>

            {/* Details */}
            <div className="movie-info-section">
              <h1 className="movie-title">{title}</h1>
              
              <div className="movie-meta">
                <span className={`rating-badge ${getRatingColor(vote_average)}`}>
                  ⭐ {rating}
                </span>
                <span className="release-year">{year}</span>
                <span className="runtime">{formatRuntime(runtime)}</span>
              </div>

              {/* Genres */}
              <div className="genres">
                {genres.map(genre => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="overview-section">
                <h2>Overview</h2>
                <p className="overview">{overview}</p>
              </div>

              {/* Cast */}
              {topCast.length > 0 && (
                <div className="cast-section">
                  <h2>Top Cast</h2>
                  <div className="cast-list">
                    {topCast.map(actor => (
                      <div key={actor.id} className="cast-item">
                        <span className="actor-name">{actor.name}</span>
                        <span className="character-name">as {actor.character}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Director */}
              {director && (
                <div className="director-section">
                  <h2>Director</h2>
                  <p className="director-name">{director.name}</p>
                </div>
              )}

              {/* Financial Info */}
              <div className="financial-info">
                {budget > 0 && (
                  <div className="financial-item">
                    <span className="label">Budget:</span>
                    <span className="value">{formatCurrency(budget)}</span>
                  </div>
                )}
                {revenue > 0 && (
                  <div className="financial-item">
                    <span className="label">Revenue:</span>
                    <span className="value">{formatCurrency(revenue)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
