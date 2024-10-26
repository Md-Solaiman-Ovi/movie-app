// // src/app/movies/[id]/page.tsx

// import RecommendationCard from "@/app/components/recommendationCard";
// import Image from "next/image";
// import { FC } from "react";

// interface Genre {
//   id: number;
//   name: string;
// }

// interface CastMember {
//   id: number;
//   name: string;
//   character: string;
//   profile_path: string | null;
// }

// interface Movie {
//   id: number;
//   title: string;
//   poster_path: string;
//   release_date: string;
//   vote_average: number;
//   overview: string;
//   genres: Genre[];
// }

// interface Recommendation {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
//   release_date: string;
// }

// // Define the component with the correct props structure
// const MovieDetails: FC<{ params: Promise<{ id: string }> }> = async ({
//   params,
// }) => {
//   const { id: movieId } = await params; // Await the params object

//   // Fetch movie details
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}?api_key=8c01d5c6e334cbb4f4456de6d14536e7`,
//     { next: { revalidate: 60 } }
//   );

//   if (!res.ok) throw new Error("Failed to fetch movie details");

//   const movie: Movie = await res.json();

//   // Fetch movie credits (cast)
//   const creditsRes = await fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=8c01d5c6e334cbb4f4456de6d14536e7`
//   );

//   if (!creditsRes.ok) throw new Error("Failed to fetch movie credits");

//   const creditsData = await creditsRes.json();
//   const cast: CastMember[] = creditsData.cast.slice(0, 5); // Top 5 cast members

//   // Fetch movie recommendations
//   const recommendationsRes = await fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=8c01d5c6e334cbb4f4456de6d14536e7`,
//     { next: { revalidate: 60 } }
//   );

//   if (!recommendationsRes.ok)
//     throw new Error("Failed to fetch recommendations");

//   const recommendationsData = await recommendationsRes.json();
//   const recommendations: Recommendation[] = recommendationsData.results.slice(
//     0,
//     5
//   ); // Top 5 recommendations

//   return (
//     <div className="bg-gray-900 text-white min-h-screen flex flex-col py-10">
//       <div className="flex flex-col md:flex-row px-4 md:px-0 gap-4 container mx-auto py-10 justify-center ">
//         <div className="md:w-1/3 mb-6 md:mb-0">
//           <Image
//             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             alt={movie.title}
//             width={300}
//             height={450}
//             className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 size-5/6"
//           />
//         </div>
//         <div className="md:w-2/3 md:pl-6">
//           <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
//           <p className="text-yellow-500 font-semibold text-lg mb-2">
//             ⭐ {movie.vote_average.toFixed(1)}/10
//           </p>
//           <p className="text-gray-400 mb-4">
//             Release Date: {new Date(movie.release_date).toLocaleDateString()}
//           </p>

//           <h2 className="text-xl font-semibold mb-2">Genres</h2>
//           <p className="text-gray-300 mb-4">
//             {movie.genres.map((genre) => genre.name).join(", ")}
//           </p>

//           <h2 className="text-xl font-semibold mb-2">Overview</h2>
//           <p className="text-gray-300 mb-4">{movie.overview}</p>

//           <h2 className="text-xl font-semibold mb-2">Cast</h2>
//           <ul className="list-disc list-inside text-gray-300">
//             {cast.map((member) => (
//               <li key={member.id} className="mb-1">
//                 <span className="font-semibold">{member.name}</span> as{" "}
//                 {member.character}
//                 {member.profile_path && (
//                   <Image
//                     src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
//                     alt={member.name}
//                     width={30}
//                     height={30}
//                     className="rounded-full inline-block ml-2 size-8"
//                   />
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Recommendations Section */}
//       <div className="mt-6 container mx-auto px-4 md:px-0  py-10">
//         <h2 className="text-2xl md:text-4xl font-bold mb-4">
//           Related Recommendations
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//           {recommendations.map((recommendation) => (
//             <RecommendationCard
//               key={recommendation.id}
//               id={recommendation.id}
//               title={recommendation.title}
//               posterPath={recommendation.poster_path}
//               rating={recommendation.vote_average}
//               releaseDate={recommendation.release_date}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

// src/app/movies/[id]/page.tsx
// src/app/movies/[id]/page.tsx
"use client";
import RecommendationCard from "@/app/components/recommendationCard";
import Image from "next/image";

import React from "react";
import { FC, useEffect, useState } from "react";

interface Genre {
  id: number;
  name: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genres: Genre[];
}

interface Recommendation {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

// Define the component with the correct props structure
const MovieDetails: FC<{ params: Promise<{ id: string }> }> = ({ params }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false); // State for watchlist status
  //   const { id: movieId } = useParams(); // Get movie ID from params
  const movieId = React.use(params).id;
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=8c01d5c6e334cbb4f4456de6d14536e7`,
          { next: { revalidate: 60 } }
        );

        if (!res.ok) throw new Error("Failed to fetch movie details");

        const movieData: Movie = await res.json();
        setMovie(movieData);

        // Fetch movie credits (cast)
        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=8c01d5c6e334cbb4f4456de6d14536e7`
        );

        if (!creditsRes.ok) throw new Error("Failed to fetch movie credits");

        const creditsData = await creditsRes.json();
        setCast(creditsData.cast.slice(0, 5)); // Top 5 cast members

        // Fetch movie recommendations
        const recommendationsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=8c01d5c6e334cbb4f4456de6d14536e7`,
          { next: { revalidate: 60 } }
        );

        if (!recommendationsRes.ok)
          throw new Error("Failed to fetch recommendations");

        const recommendationsData = await recommendationsRes.json();
        setRecommendations(recommendationsData.results.slice(0, 5)); // Top 5 recommendations

        // Check if movie is already in watchlist (you may want to fetch the watchlist from your server)
        const watchlistRes = await fetch("/redux");
        const watchlist: Movie[] = await watchlistRes.json();
        setInWatchlist(watchlist.some((item) => item.id === movieData.id)); // Check if the movie is in the watchlist
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]); // Fetch details when movieId changes

  // Loading state
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!movie) {
    return <div className="text-white">Movie not found.</div>;
  }

  // Handle adding/removing from the watchlist

  // Function to get current watchlist from localStorage
  const getWatchlist = async (): Promise<Movie[]> => {
    if (typeof window !== "undefined") {
      const watchlist = localStorage.getItem("watchlist");
      return watchlist ? JSON.parse(watchlist) : [];
    }
    return [];
  };

  // Function to update watchlist in localStorage
  const updateWatchlist = async (watchlist: Movie[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  };

  // Function to handle watchlist toggle
  const handleWatchlistToggle = async () => {
    const existingWatchlist = await getWatchlist();
    const movieIndex = existingWatchlist.findIndex((m) => m.id === movie.id);

    if (movieIndex === -1) {
      // Movie is not in the watchlist, add it
      const updatedWatchlist = [...existingWatchlist, movie];
      setInWatchlist(true);
      await updateWatchlist(updatedWatchlist);
    } else {
      // Movie is already in the watchlist, remove it
      const updatedWatchlist = existingWatchlist.filter(
        (m) => m.id !== movie.id
      );
      setInWatchlist(false);
      await updateWatchlist(updatedWatchlist);
    }
  };
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col py-10">
      <div className="flex flex-col md:flex-row px-4 md:px-0 gap-4 container mx-auto py-10 justify-center ">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 size-5/6"
          />
        </div>
        <div className="md:w-2/3 md:pl-6">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-yellow-500 font-semibold text-lg mb-2">
            ⭐ {movie.vote_average.toFixed(1)}/10
          </p>
          <p className="text-gray-400 mb-4">
            Release Date: {new Date(movie.release_date).toLocaleDateString()}
          </p>

          <h2 className="text-xl font-semibold mb-2">Genres</h2>
          <p className="text-gray-300 mb-4">
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>

          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-300 mb-4">{movie.overview}</p>

          <h2 className="text-xl font-semibold mb-2">Cast</h2>
          <ul className="list-disc list-inside text-gray-300">
            {cast.map((member) => (
              <li key={member.id} className="mb-1">
                <span className="font-semibold">{member.name}</span> as{" "}
                {member.character}
                {member.profile_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                    alt={member.name}
                    width={30}
                    height={30}
                    className="rounded-full inline-block ml-2 size-8"
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Watchlist Button */}
          <button
            onClick={handleWatchlistToggle}
            className={`mt-4 py-2 px-4 rounded-lg transition duration-300 ${
              inWatchlist
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mt-6 container mx-auto px-4 md:px-0 py-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Related Recommendations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              id={recommendation.id}
              title={recommendation.title}
              posterPath={recommendation.poster_path}
              rating={recommendation.vote_average}
              releaseDate={recommendation.release_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
