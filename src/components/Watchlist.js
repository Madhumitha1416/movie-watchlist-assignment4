import React from "react";

/**
 * Watchlist
 * Displays the list of movies the user has added.
 * Props:
 *  - movies: array of movie objects currently in the watchlist
 *  - onRemove: callback(id) fired when a Remove button is clicked
 */
function Watchlist({ movies, onRemove }) {
  return (
    <section className="watchlist">
      <h2>🎯 My Watchlist ({movies.length})</h2>

      {movies.length === 0 ? (
        <p className="empty-message">
          Your watchlist is empty. Add some movies above!
        </p>
      ) : (
        <ul className="watchlist-items">
          {movies.map((movie) => (
            <li key={movie.id} className="watchlist-item">
              <div>
                <span className="watchlist-title">{movie.title}</span>
                <span className="watchlist-sub">
                  {movie.genre} • {movie.year} • ⭐ {movie.rating}
                </span>
              </div>
              <button
                className="remove-btn"
                onClick={() => onRemove(movie.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Watchlist;
