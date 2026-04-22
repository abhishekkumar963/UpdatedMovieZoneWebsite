import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Validate API key
if (!API_KEY) {
  console.error('TMDB API key is missing! Please set REACT_APP_TMDB_API_KEY environment variable.');
}

// Image base URLs for different sizes
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const IMAGE_BASE_URL_ORIGINAL = 'https://image.tmdb.org/t/p/original';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Error handling helper
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error Response:', error.response.data);
    throw new Error(error.response.data.message || 'API request failed');
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API Error Request:', error.request);
    throw new Error('No response from server');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('API Error Setup:', error.message);
    throw new Error('Request setup failed');
  }
};

// API functions
export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await api.get('/trending/movie/day', {
      params: { page }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', {
      params: { page }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: { query, page }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos'
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await api.get('/discover/movie', {
      params: { 
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc'
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getImageUrlOriginal = (path) => {
  if (!path) return 'https://via.placeholder.com/1280x720?text=No+Image';
  return `https://image.tmdb.org/t/p/original${path}`;
};

export default api;
