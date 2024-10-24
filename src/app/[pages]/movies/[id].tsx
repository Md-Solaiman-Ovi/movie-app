import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

// Define the Movie interface
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get the movie ID from the URL

  const [movie, setMovie] = useState<Movie | null>(null); // Define the type here
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=8c01d5c6e334cbb4f4456de6d14536e7`
          );
          const data: Movie = await response.json(); // Specify the type for data
          setMovie(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      };
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!movie) return <p>No movie found.</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row items-start">
        <div className="relative w-full md:w-1/3 h-96">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="md:ml-10 mt-5 md:mt-0">
          <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
          <p className="text-gray-400 mt-4">{movie.overview}</p>
          <p className="text-yellow-400 font-semibold mt-4">
            ⭐ {movie.vote_average.toFixed(1)}/10
          </p>
          <p className="text-gray-400 mt-2">
            Release Date: {new Date(movie.release_date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
