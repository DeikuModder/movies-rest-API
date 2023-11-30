"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const movie_1 = require("../models/movie");
const movie_2 = require("../schemas/movie");
class MovieController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { genre, page } = req.query; // for the movies endpoint this will get all queries
            const moviesResult = yield movie_1.MovieModel.getAll({ genre, page });
            res.json(moviesResult);
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; // express internally uses path-to-regexp
            const moviesResult = yield movie_1.MovieModel.getById({ id });
            moviesResult
                ? res.json(moviesResult)
                : res.status(404).send("Movie not found");
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, movie_2.validateMovie)(req.body);
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const moviesResult = yield movie_1.MovieModel.create({ data: result.data });
            res.status(201).json(moviesResult);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, movie_2.validatePartialMovie)(req.body);
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const { id } = req.params;
            const moviesResult = yield movie_1.MovieModel.update({
                id,
                data: result.data,
            });
            res.json(moviesResult);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const moviesResult = yield movie_1.MovieModel.delete({ id });
            if (!moviesResult) {
                return res.status(404).json({ message: "Movie not found." });
            }
            res.json({ message: "Movie deleted" });
        });
    }
}
exports.MovieController = MovieController;
