import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ApiTest from './components/ApiTest';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import GenrePage from './pages/GenrePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <ApiTest />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search/:query" element={<Home />} />
            <Route path="/genre/:genreId/:genreName" element={<GenrePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
