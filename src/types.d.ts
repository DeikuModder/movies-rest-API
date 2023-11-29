export interface Movie {
  id: `${string}-${string}-${string}-${string}`;
  title: string;
  year: number;
  director: string;
  duration: number;
  poster: string;
  genre: Genre[];
  rate: number;
}

enum Genre {
  Action = "Action",
  Adventure = "Adventure",
  Animation = "Animation",
  Comedy = "Comedy",
  Crime = "Crime",
  Drama = "Drama",
  Fantasy = "Fantasy",
  Horror = "Horror",
  Scifi = "Sci-fi",
  Thriller = "Thriller",
  Biography = "Biography",
  Romance = "Romance",
}
