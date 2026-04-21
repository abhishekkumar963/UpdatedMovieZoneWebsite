import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { fetchTrendingMovies, fetchPopularMovies, searchMovies } from '../services/api';
import './Home.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  
  const { query } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      // Search mode
      setIsSearchMode(true);
      fetchSearchResults(query);
    } else {
      // Normal home mode
      setIsSearchMode(false);
      fetchHomeData();
    }
  }, [query]);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [trendingResponse, popularResponse] = await Promise.all([
        fetchTrendingMovies(),
        fetchPopularMovies()
      ]);
      
      setTrendingMovies(trendingResponse.results);
      setPopularMovies(popularResponse.results);
    } catch (err) {
      setError(err.message || 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async (searchQuery) => {
    try {
      setSearchLoading(true);
      setSearchError(null);
      
      const response = await searchMovies(searchQuery);
      setSearchResults(response.results);
    } catch (err) {
      setSearchError(err.message || 'Failed to search movies');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleRetry = () => {
    if (isSearchMode && query) {
      fetchSearchResults(query);
    } else {
      fetchHomeData();
    }
  };

    // TODO: Add movie click handlers when needed
  // const handleMovieClick = (movieId) => {
  //   navigate(`/movie/${movieId}`);
  // };
  // const addMovieClickHandler = (movie) => {
  //   return () => handleMovieClick(movie.id);
  // };

  if (isSearchMode) {
    return (
      <div className="home-container">
        <div className="container">
          <div className="search-header">
            <h1>Search Results for "{query}"</h1>
            <button 
              className="back-to-home-btn"
              onClick={() => navigate('/')}
            >
              ← Back to Home
            </button>
          </div>
          
          <MovieList 
            movies={searchResults}
            loading={searchLoading}
            error={searchError}
            title=""
          />
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Movie Zone</h1>
            <p className="hero-subtitle">
              Discover trending and popular movies from around the world
            </p>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="error-section">
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <p className="error-message">{error}</p>
              <button className="retry-button" onClick={handleRetry}>
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Movie Lists */}
        {!error && (
          <>
            <MovieList 
              movies={trendingMovies}
              loading={loading}
              error={null}
              title="🔥 Trending Now"
            />
            
            <MovieList 
              movies={popularMovies}
              loading={loading}
              error={null}
              title="⭐ Popular Movies"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
