# Movie Zone 🎬

A modern, responsive movie discovery web application built with React.js that uses The Movie Database (TMDB) API to display trending and popular movies.

## 🚀 Features

- **🏠 Home Page**: Display trending and popular movies in a beautiful grid layout
- **🔍 Search**: Search movies by name with dynamic results
- **📊 Movie Details**: Comprehensive movie information including cast, director, ratings, and more
- **❤️ Favorites**: Add/remove movies from favorites using localStorage
- **📱 Responsive Design**: Mobile-friendly layout that works on all devices
- **🎨 Modern UI**: Netflix-inspired dark theme with smooth animations
- **⚡ Performance**: Optimized loading states and error handling

## 🛠️ Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Routing**: React Router DOM
- **API Client**: Axios for HTTP requests
- **Styling**: Custom CSS with responsive design
- **API**: The Movie Database (TMDB) API

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- TMDB API key (free registration required)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MovieZoneUpdated
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Get your TMDB API key:
     - Visit [TMDB API Settings](https://www.themoviedb.org/settings/api)
     - Sign up for a free account
     - Request an API key for your application
   - Add your API key to the `.env` file:
     ```
     REACT_APP_TMDB_API_KEY=your_actual_api_key_here
     ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar with search
│   ├── MovieCard.jsx   # Individual movie card
│   ├── MovieList.jsx   # Movie grid container
│   ├── SearchBar.jsx   # Search input component
│   └── LoadingSpinner.jsx # Loading indicator
├── pages/              # Page components
│   ├── Home.jsx        # Home page with movie lists
│   └── MovieDetails.jsx # Movie details page
├── services/           # API services
│   └── api.js          # TMDB API integration
├── App.js              # Main app component with routing
├── index.js            # App entry point
└── styles/             # CSS files
    ├── App.css
    ├── index.css
    └── component-specific CSS files
```

## 🎯 API Endpoints Used

- **Trending Movies**: `/trending/movie/day`
- **Popular Movies**: `/movie/popular`
- **Search Movies**: `/search/movie`
- **Movie Details**: `/movie/{id}` (with credits and videos)

## 🎨 Features Overview

### Home Page
- Hero section with welcome message
- Trending movies section
- Popular movies section
- Responsive grid layout
- Loading states and error handling

### Movie Details Page
- Movie poster and backdrop
- Rating, release year, and runtime
- Genre tags
- Overview/description
- Cast information
- Director information
- Budget and revenue details
- Add to favorites functionality

### Search Functionality
- Real-time search in navbar
- Search results page
- Breadcrumb navigation
- No results handling

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface
- Adaptive grid layouts

## 🔄 Additional Features

### Favorites System
- Uses localStorage for persistence
- Add/remove movies from favorites
- Visual feedback for favorite status

### Error Handling
- Network error handling
- API error responses
- User-friendly error messages
- Retry functionality

### Loading States
- Skeleton loading indicators
- Smooth transitions
- Progress feedback

## 🚀 Build and Deploy

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Deploy to static hosting**
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**
   - Ensure your `.env` file contains a valid TMDB API key
   - Restart the development server after changing environment variables

2. **CORS Issues**
   - The app uses a proxy configuration in package.json
   - If issues persist, check TMDB API documentation for CORS settings

3. **Images Not Loading**
   - Check your internet connection
   - Verify TMDB API key is valid
   - Some images may not have backdrops/posters available

4. **Build Errors**
   - Ensure all dependencies are installed
   - Check Node.js version compatibility
   - Clear npm cache: `npm cache clean --force`

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_TMDB_API_KEY` | Your TMDB API key | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the amazing API
- React.js team for the excellent framework
- All contributors and users of this project

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue with detailed information
4. Include your environment details and error messages

---

**Happy Movie Watching! 🍿🎬**
