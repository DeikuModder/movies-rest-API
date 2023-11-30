import { Router } from "express";
import { MovieController } from "../controllers/movies";

export const moviesRouter = Router();

// will get all MOVIES resources
moviesRouter.get("/", MovieController.getAll);

// get movie by its id
moviesRouter.get("/:id", MovieController.getById);

moviesRouter.post("/", MovieController.create);

moviesRouter.patch("/:id", MovieController.update);

moviesRouter.delete("/:id", MovieController.delete);
