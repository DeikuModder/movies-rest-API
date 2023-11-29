"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialMovie = exports.validateMovie = void 0;
const zod_1 = __importDefault(require("zod"));
// using zod package, this will make validations to ensure that client is passing the correct information
const movieSchema = zod_1.default.object({
    title: zod_1.default.string({
        invalid_type_error: "Movie title must be a string",
        required_error: "Movie title is required",
    }),
    year: zod_1.default.number().int().min(1900).max(2024),
    director: zod_1.default.string(),
    duration: zod_1.default.number().int().positive(),
    rate: zod_1.default.number().min(0).max(10).default(0),
    poster: zod_1.default.string().url({
        message: "Poster must be a valid url",
    }),
    genre: zod_1.default.array(zod_1.default.enum([
        "Action",
        "Adventure",
        "Sci-Fi",
        "Drama",
        "Romance",
        "Animation",
        "Comedy",
        "Biography",
        "Crime",
        "Documentary",
        "Fantasy",
        "Horror",
        "Mystery",
        "Thriller",
    ])),
});
function validateMovie(object) {
    return movieSchema.safeParse(object);
}
exports.validateMovie = validateMovie;
// will make all properties optional
function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object);
}
exports.validatePartialMovie = validatePartialMovie;
