export interface Movie {
  id: number;
  title?: string;
  name?: string;
  type?: 'Фильм' | 'Сериал';
  image?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  genre_ids?: number[];
}

export interface TMDBMovie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  genre_ids?: number[];
}

export interface Genre {
  id: number;
  label: string;
  movies: Movie[];
}

export interface Collection {
  id: number;
  title: string;
  genreId: number;
  type: 'movie' | 'tv';
  posterUrl: string;
}

export interface TMDBGenre {
  id: number;
  name: string;
}
