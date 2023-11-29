import express from "express";
import crypto from "node:crypto";
import cors from "cors";
import { Movie } from "./src/types";
import movies from "./src/movies.json";
import { validateMovie, validatePartialMovie } from "./src/schemas/movie";

const moviesCollection = movies as Movie[];
const PORT = process.env.PORT || 1235;
const app = express();
app.disable("x-powered-by");
//middleware that helps with cors error, and specifying the origins that has access to the api
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://127.0.0.1:5500",
        "http://localhost:1235",
        "https://movies.com",
        "https://midu.dev",
      ];

      if (ACCEPTED_ORIGINS.includes(origin as string)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json()); // for parsing application/json

app.get("/", (_req, res) => {
  res.send("Hello Typescript!");
});

// will get all MOVIES resources
app.get("/movies", (req, res) => {
  const { genre, page } = req.query; // for the movies endpoint this will get all queries

  if (genre) {
    const filteredMovies = moviesCollection.filter((movie) =>
      movie.genre.some(
        (g) => g.toLowerCase() === genre.toString().toLowerCase()
      )
    );
    return res.json(filteredMovies);
  }

  if (page) {
    const movieIndex = page as unknown as number;

    if (movieIndex > moviesCollection.length) {
      return res.send(404).json({ message: "Movie not found" });
    }

    return res.json(moviesCollection[movieIndex]);
  }

  res.json(moviesCollection);
});

// get movie by its id
app.get("/movies/:id", (req, res) => {
  const { id } = req.params; // express internally uses path-to-regexp
  const movie = moviesCollection.find((movie) => movie.id === id);

  movie ? res.json(movie) : res.status(404).send("Movie not found");
});

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  // this wouldn't be REST, since we're storing data in the application memory
  // the correct way to do it would be storing it in a database
  moviesCollection.push(newMovie as Movie);

  res.status(201).json(newMovie);
});

app.patch("/movies/:id", (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = moviesCollection.findIndex((movie) => movie.id === id);

  if (movieIndex < 0) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const updateMovie = {
    ...moviesCollection[movieIndex],
    ...result.data,
  };

  moviesCollection[movieIndex] = updateMovie as Movie;

  return res.json(updateMovie);
});

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = moviesCollection.findIndex((movie) => movie.id === id);

  if (movieIndex < 0) {
    return res.status(404).json({ message: "Movie not found." });
  }

  moviesCollection.splice(movieIndex, 1);

  return res.json({ message: "Movie deleted" });
});

app.use((_req, res) => {
  res.status(404).send("404 not found");
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
