import z from "zod";

// using zod package, this will make validations to ensure that client is passing the correct information
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required",
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(0),
  poster: z.string().url({
    message: "Poster must be a valid url",
  }),
  genre: z.array(
    z.enum([
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
    ])
  ),
});

export function validateMovie(object: {}) {
  return movieSchema.safeParse(object);
}

// will make all properties optional
export function validatePartialMovie(object: {}) {
  return movieSchema.partial().safeParse(object);
}
