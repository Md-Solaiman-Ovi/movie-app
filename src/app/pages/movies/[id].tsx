/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
// import Image from "next/image";

const MovieDetails = ({ movie }: { movie: any }) => {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      {/* <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="my-4"
      /> */}
      <p>{movie.overview}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_TMDB_API_BASE}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const paths = response.data.results.map((movie: any) => ({
    params: { id: movie.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_TMDB_API_BASE}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const movie = response.data;

  return {
    props: { movie },
    revalidate: 60, // ISR
  };
};

export default MovieDetails;
