"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesRouter = void 0;
const express_1 = require("express");
const movies_1 = require("../controllers/movies");
exports.moviesRouter = (0, express_1.Router)();
// will get all MOVIES resources
exports.moviesRouter.get("/", movies_1.MovieController.getAll);
// get movie by its id
exports.moviesRouter.get("/:id", movies_1.MovieController.getById);
exports.moviesRouter.post("/", movies_1.MovieController.create);
exports.moviesRouter.patch("/:id", movies_1.MovieController.update);
exports.moviesRouter.delete("/:id", movies_1.MovieController.delete);
