import React from "react";
import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  rating: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  // id,
  title,
  posterPath,
  releaseDate,
  rating,
}) => {
  return (
    <Link href={`/pages/movies`} passHref>
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl cursor-pointer h-[400px]">
        <div className="relative w-full h-64">
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm ">
              Release Date: {new Date(releaseDate).toLocaleDateString()}
            </p>
            <p className="text-yellow-400 font-semibold">
              ⭐ {rating.toFixed(1)}/10
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
