/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import MovieCard from "./movieCard";
import Loading from "../loading";
import { fetchPopularMovies, incrementPage } from "../redux/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Movie } from "../redux/moviesSlice";

const PopularMovies = ({ moviesToDisplay }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, status } = useSelector((state: RootState) => state?.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies(page));
  }, [page, dispatch]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <div className="container mx-auto py-10">
      <div className="text-white font-bold text-4xl mb-8">Popular Movies</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {moviesToDisplay?.map((movie: Movie, index: number) => {
          return (
            <MovieCard
              key={`${movie.id}-${index}`}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
            />
          );
        })}
      </div>
      {status === "loading" && <Loading />}
      {moviesToDisplay.length > 10 && (
        <div className="text-center my-8">
          <button
            className="px-4 py-2 bg-gradient-to-r from-indigo-900  to-purple-900 text-white rounded-md"
            onClick={handleLoadMore}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PopularMovies;
