"use client";

import { useDispatch, useSelector } from "react-redux";
import { searchMovies, clearSearchResults } from "../app/redux/moviesSlice";
import SearchBar from "../app/components/searchBar";

import { RootState, AppDispatch } from "../app/redux/store"; // Import your RootState type
import ScrollToTopButton from "./components/scrollToTopButton";
import PopularMovies from "./components/popularMovies";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { popularMovies, searchResults } = useSelector(
    (state: RootState) => state?.movies
  );

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
  console.log(moviesToDisplay);
  return (
    <div className={`${moviesToDisplay ? "" : "h-screen "} bg-gray-900`}>
      <SearchBar onSearch={handleSearch} />
      <PopularMovies moviesToDisplay={moviesToDisplay} />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
