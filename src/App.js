import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";
import "./App.css";

// Genres shown as filter buttons. "All" is handled separately below.
const GENRES = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Thriller"];

function App() {
  // All movies fetched from movies.json
  const [movies, setMovies] = useState([]);

  // Movies the user has added to their watchlist
  const [watchlist, setWatchlist] = useState([]);

  // Currently selected genre filter
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Loading + error state for the fetch request
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies from public/movies.json once, on mount, using Axios
  useEffect(() => {
    axios
      .get("/movies.json")
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again later.");
        setLoading(false);
      });
  }, []); // empty dependency array -> runs only once

  // Add a movie to the watchlist, preventing duplicates.
  // Uses functional state update + spread to avoid mutating state directly.
  const handleAddToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => {
      const alreadyAdded = prevWatchlist.some((m) => m.id === movie.id);
      if (alreadyAdded) {
        return prevWatchlist; // no change -> duplicate prevented
      }
      return [...prevWatchlist, movie];
    });
  };

  // Remove a movie from the watchlist by id, without mutating state directly
  const handleRemoveFromWatchlist = (id) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((movie) => movie.id !== id)
    );
  };

  // Derive the list of movies to display based on the selected genre.
  // "All" shows everything; otherwise filter by exact genre match.
  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);

  // Helper to check if a given movie id is already in the watchlist
  const isInWatchlist = (id) => watchlist.some((movie) => movie.id === id);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 Movie Watchlist</h1>
        <p className="app-subtitle">
          Discover movies and build your personal watchlist
        </p>
      </header>

      <main className="app-main">
        {/* Genre filter buttons */}
        <div className="genre-filters">
          {GENRES.map((genre) => (
            <button
              key={genre}
              className={`genre-btn ${
                selectedGenre === genre ? "active" : ""
              }`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="status-message">
            <div className="spinner"></div>
            <p>Loading movies...</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="status-message error">
            <p>{error}</p>
          </div>
        )}

        {/* Conditional rendering: no movies found for the selected genre */}
        {!loading && !error && filteredMovies.length === 0 && (
          <div className="status-message">
            <p>No movies found</p>
          </div>
        )}

        {/* Movie grid */}
        {!loading && !error && filteredMovies.length > 0 && (
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                genre={movie.genre}
                year={movie.year}
                rating={movie.rating}
                isAdded={isInWatchlist(movie.id)}
                onAdd={() => handleAddToWatchlist(movie)}
              />
            ))}
          </div>
        )}

        {/* Watchlist section */}
        <Watchlist movies={watchlist} onRemove={handleRemoveFromWatchlist} />
      </main>

      <footer className="app-footer">
        <p>Built with React • Entri Assignment 4</p>
      </footer>
    </div>
  );
}

export default App;
