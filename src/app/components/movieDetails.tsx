// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToWatchlist, removeFromWatchlist } from "../redux/watchlistSlice";
// import { RootState } from "../redux/store";

// const MovieDetails = ({ movie }: { movie: any }) => {
//   const dispatch = useDispatch();
//   const watchlist = useSelector(
//     (state: RootState) => state.watchlist.watchlist
//   ); // Access the watchlist from Redux
//   const [isInWatchlist, setIsInWatchlist] = useState(false); // Track if movie is in watchlist

//   // Check if the movie is in the watchlist when the component renders
//   useEffect(() => {
//     const isMovieInWatchlist = watchlist.some((item) => item.id === movie.id);
//     setIsInWatchlist(isMovieInWatchlist);
//   }, [watchlist, movie.id]);

//   const handleWatchlistToggle = () => {
//     if (isInWatchlist) {
//       dispatch(removeFromWatchlist(movie.id)); // Remove from watchlist
//     } else {
//       dispatch(addToWatchlist(movie)); // Add to watchlist
//     }
//     setIsInWatchlist(!isInWatchlist);
//   };

//   return (
//     <div className="container mx-auto">
//       <h1>{movie.title}</h1>
//       <p>{movie.overview}</p>

//       {/* Add/Remove from Watchlist button */}
//       <button
//         onClick={handleWatchlistToggle}
//         className={`px-4 py-2 ${
//           isInWatchlist ? "bg-red-600" : "bg-blue-600"
//         } text-white rounded-md mt-4`}
//       >
//         {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
//       </button>
//     </div>
//   );
// };

// export default MovieDetails;
