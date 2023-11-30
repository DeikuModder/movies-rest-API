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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
const movies_json_1 = __importDefault(require("../movies.json"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const moviesCollection = movies_json_1.default;
class MovieModel {
    static getAll({ genre, page }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (genre) {
                const filteredMovies = moviesCollection.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toString().toLowerCase()));
                return filteredMovies;
            }
            if (page) {
                const movieIndex = page;
                if (movieIndex > moviesCollection.length) {
                    return { message: "Movie not found" };
                }
                return moviesCollection[movieIndex];
            }
            return moviesCollection;
        });
    }
    static getById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = moviesCollection.find((movie) => movie.id === id);
            return movie;
        });
    }
    static create({ data }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMovie = Object.assign({ id: node_crypto_1.default.randomUUID() }, data);
            // this wouldn't be REST, since we're storing data in the application memory
            // the correct way to do it would be storing it in a database
            moviesCollection.push(newMovie);
            return newMovie;
        });
    }
    static update({ id, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieIndex = moviesCollection.findIndex((movie) => movie.id === id);
            const updateMovie = Object.assign(Object.assign({}, moviesCollection[movieIndex]), data);
            moviesCollection[movieIndex] = updateMovie;
            return updateMovie;
        });
    }
    static delete({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieIndex = moviesCollection.findIndex((movie) => movie.id === id);
            if (movieIndex) {
                return moviesCollection.splice(movieIndex, 1);
            }
            return false;
        });
    }
}
exports.MovieModel = MovieModel;
