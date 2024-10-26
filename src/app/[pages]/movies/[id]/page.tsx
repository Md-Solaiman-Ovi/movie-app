// src/app/movies/[id]/page.tsx

import RecommendationCard from "@/app/components/recommendationCard";
import Image from "next/image";

interface Genre {
  id: number;
  name: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
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

// Fetch movie details and recommendations using SSR with ISR
const MovieDetails = async ({ params }: { params: { id: string } }) => {
  const movieId = params.id;

  // Fetch movie details
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=8c01d5c6e334cbb4f4456de6d14536e7`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const movie: Movie = await res.json();

  // Fetch movie credits (cast)
  const creditsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=8c01d5c6e334cbb4f4456de6d14536e7`
  );

  if (!creditsRes.ok) {
    throw new Error("Failed to fetch movie credits");
  }

  const creditsData = await creditsRes.json();
  const cast: CastMember[] = creditsData.cast.slice(0, 5); // Limit to top 5 cast members

  // Fetch movie recommendations
  const recommendationsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=8c01d5c6e334cbb4f4456de6d14536e7`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!recommendationsRes.ok) {
    throw new Error("Failed to fetch movie recommendations");
  }

  const recommendationsData = await recommendationsRes.json();
  const recommendations: Recommendation[] = recommendationsData.results.slice(
    0,
    5
  ); // Limit to top 5 recommendations

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col py-10">
      <div className="flex flex-col md:flex-row p-6 container mx-auto py-10">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="md:w-2/3 md:pl-6">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-yellow-500 font-semibold text-lg mb-2">
            ⭐ {movie.vote_average}/10
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
                    className="rounded-full inline-block ml-2 size-7"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="  mt-6 container mx-auto py-10">
        <h2 className="text-2xl font-bold mb-4">Related Recommendations</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 ">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              id={recommendation.id}
              title={recommendation.title}
              posterPath={recommendation.poster_path}
              rating={recommendation.vote_average} // Optional: if you want to show the rating
              releaseDate={recommendation.release_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
