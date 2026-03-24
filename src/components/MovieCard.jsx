import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/api';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;
  
  const imageUrl = getImageUrl(poster_path);
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
  const year = release_date ? new Date(release_date).getFullYear() : 'N/A';

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'high';
    if (rating >= 6) return 'medium';
    return 'low';
  };

  const ratingColor = getRatingColor(vote_average);

  return (
    <Link to={`/movie/${id}`} className="movie-card-link">
      <div className="movie-card">
        <div className="movie-poster-container">
          <img
            src={imageUrl}
            alt={title}
            className="movie-poster"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
            }}
          />
          <div className="movie-overlay">
            <div className="movie-rating">
              <span className={`rating-badge ${ratingColor}`}>
                ⭐ {rating}
              </span>
            </div>
          </div>
        </div>
        
        <div className="movie-info">
          <h3 className="movie-title">{title}</h3>
          <div className="movie-meta">
            <span className="movie-year">{year}</span>
            <span className="movie-rating-text">
              <span className="rating-star">⭐</span>
              {rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
