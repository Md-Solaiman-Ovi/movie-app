/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(
      localStorage.getItem("watchlist") || "[]"
    );
    setWatchlist(storedWatchlist);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">Your Watchlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
        {watchlist.length === 0 ? (
          <p>No movies in your watchlist</p>
        ) : (
          watchlist.map((movie: any) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;
