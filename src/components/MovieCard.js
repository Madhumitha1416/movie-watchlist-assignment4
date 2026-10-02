import React from "react";

// A poster-placeholder emoji set, picked based on genre so cards look varied
// without depending on any external image URLs (which can break).
const GENRE_EMOJI = {
  Action: "💥",
  Comedy: "😂",
  Drama: "🎭",
  "Sci-Fi": "🚀",
  Thriller: "🔪",
};

/**
 * MovieCard
 * Presentational component. Receives movie details + behaviour via props.
 * Props:
 *  - title, genre, year, rating: movie details to display
 *  - isAdded: whether this movie is already in the watchlist
 *  - onAdd: callback fired when "Add to Watchlist" is clicked
 */
function MovieCard({ title, genre, year, rating, isAdded, onAdd }) {
  const emoji = GENRE_EMOJI[genre] || "🎬";

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <span>{emoji}</span>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-meta">
          <span className="genre-tag">{genre}</span>
          <span>{year}</span>
        </p>
        <p className="movie-rating">⭐ {rating}</p>

        {/* Button becomes disabled + shows "Added" once the movie is in the watchlist */}
        <button
          className={`add-btn ${isAdded ? "added" : ""}`}
          onClick={onAdd}
          disabled={isAdded}
        >
          {isAdded ? "Added" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
