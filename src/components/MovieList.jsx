import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ movies, loading, error, title }) => {
  if (loading) {
    return (
      <div className="movie-list-section">
        <h2 className="section-title">{title}</h2>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-list-section">
        <h2 className="section-title">{title}</h2>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list-section">
        <h2 className="section-title">{title}</h2>
        <div className="no-results">
          <div className="no-results-icon">🎬</div>
          <p>No movies found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-list-section">
      <h2 className="section-title">{title}</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
