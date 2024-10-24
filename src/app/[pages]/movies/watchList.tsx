// In your Watchlist component
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../components/movieCard";
import {
  fetchWatchlist, // Now correctly imported
  removeFromWatchlist,
} from "../../redux/watchlistSlice";
import { AppDispatch, RootState } from "@/app/redux/store";

const Watchlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const watchlist = useSelector(
    (state: RootState) => state.watchlist.watchlist
  );

  useEffect(() => {
    dispatch(fetchWatchlist()); // Dispatch the async action to fetch the watchlist
  }, [dispatch]);

  const handleRemove = (movieId: number) => {
    dispatch(removeFromWatchlist(movieId)); // Remove movie from the watchlist
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-center text-3xl my-10">My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="text-center text-lg">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.id}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
              />
              <button
                onClick={() => handleRemove(movie.id)}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
