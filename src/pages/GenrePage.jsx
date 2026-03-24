import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { fetchMoviesByGenre } from '../services/api';
import './GenrePage.css';

const GenrePage = () => {
  const { genreId, genreName } = useParams();
  const navigate = useNavigate();
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (genreId) {
      fetchGenreMovies(genreId, 1);
    }
  }, [genreId]);

  const fetchGenreMovies = async (id, page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchMoviesByGenre(id, page);
      setMovies(response.results);
      setTotalPages(response.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message || 'Failed to fetch genre movies');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      fetchGenreMovies(genreId, currentPage + 1);
    }
  };

  const handleRetry = () => {
    if (genreId) {
      fetchGenreMovies(genreId, 1);
    }
  };

  const getGenreDisplayName = (name) => {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Genre';
  };

  const displayName = getGenreDisplayName(genreName);

  return (
    <div className="genre-page-container">
      <div className="container">
        {/* Header */}
        <div className="genre-header">
          <div className="genre-breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="separator">/</span>
            <span className="current">{displayName} Movies</span>
          </div>
          
          <div className="genre-title-section">
            <h1 className="genre-title">{displayName} Movies</h1>
            <p className="genre-subtitle">
              Discover the best {displayName.toLowerCase()} movies from around the world
            </p>
          </div>
          
          <button 
            className="back-to-home-btn"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>

        {/* Movie List */}
        <MovieList 
          movies={movies}
          loading={loading}
          error={error}
          title=""
        />

        {/* Load More Button */}
        {!loading && !error && movies.length > 0 && currentPage < totalPages && (
          <div className="load-more-container">
            <button 
              className="load-more-button"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : `Load More (${currentPage}/${totalPages})`}
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && movies.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🎬</div>
            <h3>No {displayName.toLowerCase()} movies found</h3>
            <p>Try exploring other genres or check back later for new releases.</p>
            <Link to="/" className="explore-more-btn">
              Explore Other Genres
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
