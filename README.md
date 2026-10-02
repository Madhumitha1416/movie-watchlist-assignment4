# 🎬 Movie Watchlist App

**Entri — Week 10, Session 30 — Assignment 4**
**Max Marks:** 10

## Objective

Build a Movie Watchlist application using React that fetches a list of
movies, lets the user filter them by genre, and lets the user add or
remove movies from a personal watchlist.

## Features

- Fetches at least 12 movies from a local `movies.json` file using
  **Axios** inside a **`useEffect`** hook.
- Shows a **loading spinner/message** while movies are being fetched.
- Displays each movie in a reusable **`MovieCard`** component showing
  its title, genre, year, and rating.
- **Add to Watchlist** button on every card:
  - Adds the movie to the watchlist.
  - Prevents duplicate entries.
  - Changes to **"Added"** and becomes disabled once the movie is in
    the watchlist.
- Separate **`Watchlist`** component that lists every added movie with
  a **Remove** button to take it back out.
- **Genre filter buttons** (All, Action, Comedy, Drama, Sci-Fi,
  Thriller) built with `useState`, filtering the movie grid instantly.
- **Conditional rendering** of a "No movies found" message when a
  genre has no matching movies.
- Modern, responsive UI with hover effects on cards, a movie grid,
  and clean button styling. Uses emoji as poster placeholders instead
  of external images, so nothing can break due to broken image links.
- State is always updated immutably (spread / `filter`, never direct
  mutation).

## Technologies Used

- React 18 (functional components + hooks)
- `useState`, `useEffect`
- Axios (HTTP requests)
- Create React App (`react-scripts`) — **no Vite**
- Plain CSS (no external UI library)

## Project Structure

```
movie-watchlist/
│
├── public/
│   └── movies.json          # 14 sample movies across 5 genres
│
├── src/
│   ├── components/
│   │   ├── MovieCard.js     # Displays one movie + Add to Watchlist button
│   │   └── Watchlist.js     # Displays the watchlist + Remove buttons
│   │
│   ├── App.js                # Main component: fetching, filtering, state
│   ├── App.css                # App styling
│   ├── index.js               # React entry point
│   └── index.css              # Global reset styles
│
├── package.json
└── README.md
```

## How to Install

1. Make sure you have **Node.js** (v16 or newer) installed.
2. Open a terminal in the `movie-watchlist` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

   This installs React, React DOM, React Scripts, and Axios (already
   listed in `package.json`).

## How to Run

```bash
npm start
```

This starts the development server (via `react-scripts`, **not
Vite**) and opens the app at:

```
http://localhost:3000
```

The app fetches `public/movies.json` at `/movies.json` using Axios as
soon as it loads.

## Assignment Requirements Implemented

| Requirement                                             | Status |
|-----------------------------------------------------------|:----:|
| Separate `MovieCard.js` component with props              | ✅ |
| Movie card shows title, genre, year, rating                | ✅ |
| "Add to Watchlist" button on each card                    | ✅ |
| Button shows "Added" and is disabled once added            | ✅ |
| Duplicate movies cannot be added                           | ✅ |
| Separate `Watchlist.js` component                          | ✅ |
| Watchlist state managed with `useState` in `App.js`        | ✅ |
| Remove button removes a movie from the watchlist            | ✅ |
| No direct state mutation                                    | ✅ |
| `movies.json` with 12+ movies in `public/`                 | ✅ (14 movies) |
| Movies loaded with `useEffect` + Axios from `/movies.json` | ✅ |
| Loading spinner/message while fetching                     | ✅ |
| Genre filter buttons (All, Action, Comedy, Drama, Sci-Fi, Thriller) | ✅ |
| Genre filtering via `useState`                              | ✅ |
| "No movies found" conditional rendering                    | ✅ |
| Header, movie grid, filter buttons, watchlist section        | ✅ |
| Responsive design with hover effects and clean buttons      | ✅ |
| No external/broken images (emoji placeholders used)         | ✅ |
| Proper React keys on all mapped lists                       | ✅ |
| Comments included for interview/review explanation           | ✅ |

## Notes for the Review / Interview

- `App.js` owns the two pieces of shared state — `movies` (fetched
  data) and `watchlist` (user selections) — and passes data + handler
  functions down to `MovieCard` and `Watchlist` via props. This keeps
  the child components simple and reusable ("lifting state up").
- `handleAddToWatchlist` and `handleRemoveFromWatchlist` both use the
  functional form of `setState` (`setWatchlist(prev => ...)`) and
  return new arrays (via spread or `filter`) instead of mutating the
  existing array, which is the correct React pattern.
- Filtering is done with a simple derived variable
  (`filteredMovies`) computed on every render from `movies` and
  `selectedGenre` — no extra state is needed for the filtered list.
- The `useEffect` that fetches movies has an empty dependency array
  (`[]`), so the Axios request runs exactly once when the app mounts.
