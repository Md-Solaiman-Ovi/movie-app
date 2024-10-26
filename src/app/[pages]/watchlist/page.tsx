// src/app/watchlist/page.tsx
"use client";
import React, { useEffect, useState } from "react";
// import Image from "next/image";
import RecommendationCard from "@/app/components/recommendationCard";
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const getWatchlist = (): Movie[] => {
  if (typeof window !== "undefined") {
    const watchlist = localStorage.getItem("watchlist");
    return watchlist ? JSON.parse(watchlist) : [];
  }
  return [];
};

const updateWatchlist = (watchlist: Movie[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
};

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    const initialWatchlist = getWatchlist();
    setWatchlist(initialWatchlist);
  }, []);

  const removeFromWatchlist = (id: number) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedWatchlist);
    updateWatchlist(updatedWatchlist);
  };

  return (
    <div className="flex gap-10 h-screen text-white flex-col container mx-auto">
      <h1 className="text-center text-2xl md:text-4xl font-bold py-10">
        Your Watchlist
      </h1>
      {watchlist.length === 0 ? (
        <p className="text-center">Your watchlist is empty.</p>
      ) : (
        <ul>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {watchlist.map((movie) => (
              <div
                key={movie.id}
                className="relative group hover:opacity-60 transition-opacity duration-300"
              >
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 bg-red-500 text-white px-2 py-1 rounded transition-opacity duration-300"
                >
                  Remove
                </button>
                <RecommendationCard
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  rating={movie.vote_average}
                  releaseDate={movie.release_date}
                />
              </div>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default WatchlistPage;
