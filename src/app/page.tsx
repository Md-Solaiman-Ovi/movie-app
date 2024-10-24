"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMovies,
  incrementPage,
  searchMovies,
  clearSearchResults,
} from "../app/redux/moviesSlice";
import MovieCard from "../app/components/movieCard";
import SearchBar from "../app/components/searchBar";

import { RootState, AppDispatch } from "../app/redux/store"; // Import your RootState type
import ScrollToTopButton from "./components/scrollToTopButton";
import Loading from "./loading";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { popularMovies, searchResults, page, status } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchPopularMovies(page));
  }, [page, dispatch]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      dispatch(clearSearchResults()); // Clear previous search results
      dispatch(searchMovies(query)); // Dispatch the search action
    } else {
      // Optionally, you can clear search results when the input is empty
      dispatch(clearSearchResults());
    }
  };

  const moviesToDisplay =
    searchResults.length > 0 ? searchResults : popularMovies; // Display search results if available

  return (
    <div className="">
      <SearchBar onSearch={handleSearch} />
      <div className="container mx-auto py-10">
        <div className="text-white font-bold text-4xl mb-8">Popular Movies</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {moviesToDisplay.map((movie, index) => {
            console.log(movie.vote_average);
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
        <div className="text-center my-8">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={handleLoadMore}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
