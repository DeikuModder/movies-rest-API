import movies from "../movies.json";
import crypto from "node:crypto";
import { Movie } from "../types";

const moviesCollection = movies as Movie[];

export class MovieModel {
  static async getAll<T>({ genre, page }: { genre: T; page: T }) {
    if (genre) {
      const filteredMovies = moviesCollection.filter((movie) =>
        movie.genre.some(
          (g) => g.toLowerCase() === genre.toString().toLowerCase()
        )
      );
      return filteredMovies;
    }

    if (page) {
      const movieIndex = page as unknown as number;

      if (movieIndex > moviesCollection.length) {
        return { message: "Movie not found" };
      }

      return moviesCollection[movieIndex];
    }

    return moviesCollection;
  }

  static async getById<T>({ id }: { id: T }) {
    const movie = moviesCollection.find((movie) => movie.id === id);

    return movie;
  }

  static async create<T>({ data }: { data: T }) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...data,
    };

    // this wouldn't be REST, since we're storing data in the application memory
    // the correct way to do it would be storing it in a database
    moviesCollection.push(newMovie as unknown as Movie);

    return newMovie;
  }

  static async update<T, E>({ id, data }: { id: T; data: E }) {
    const movieIndex = moviesCollection.findIndex((movie) => movie.id === id);

    const updateMovie = {
      ...moviesCollection[movieIndex],
      ...data,
    };

    moviesCollection[movieIndex] = updateMovie as Movie;

    return updateMovie;
  }

  static async delete<T>({ id }: { id: T }) {
    const movieIndex = moviesCollection.findIndex((movie) => movie.id === id);

    if (movieIndex) {
      return moviesCollection.splice(movieIndex, 1);
    }

    return false;
  }
}
