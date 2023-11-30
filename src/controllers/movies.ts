import { Request, Response } from "express";
import { MovieModel } from "../models/movie";
import { validateMovie, validatePartialMovie } from "../schemas/movie";

export class MovieController {
  static async getAll(req: Request, res: Response) {
    const { genre, page } = req.query; // for the movies endpoint this will get all queries
    const moviesResult = await MovieModel.getAll<typeof genre>({ genre, page });
    res.json(moviesResult);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params; // express internally uses path-to-regexp
    const moviesResult = await MovieModel.getById<typeof id>({ id });
    moviesResult
      ? res.json(moviesResult)
      : res.status(404).send("Movie not found");
  }

  static async create(req: Request, res: Response) {
    const result = validateMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const moviesResult = await MovieModel.create({ data: result.data });

    res.status(201).json(moviesResult);
  }

  static async update(req: Request, res: Response) {
    const result = validatePartialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const moviesResult = await MovieModel.update<typeof id, typeof result.data>(
      {
        id,
        data: result.data,
      }
    );

    res.json(moviesResult);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const moviesResult = await MovieModel.delete<typeof id>({ id });

    if (!moviesResult) {
      return res.status(404).json({ message: "Movie not found." });
    }

    res.json({ message: "Movie deleted" });
  }
}
