// src/components/RecommendationCard.tsx

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface RecommendationCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  releaseDate: string;
  // Optional: if you want to show the rating
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  id,
  title,
  posterPath,
  rating,
  releaseDate,
}) => {
  return (
    <Link href={`/movies/${id}`} passHref className="">
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden text-center transform transition duration-500 hover:scale-105 hover:shadow-xl cursor-pointer h-[400px]">
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
            {rating && (
              <p className="text-yellow-400 font-semibold">
                ⭐ {rating.toFixed(1)}/10
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecommendationCard;
