import type {
  GenreMovieList200GenresItem,
  GenreTvList200GenresItem,
} from '@/api/types';

export interface GenreState {
  allGenres: GenreMovieList200GenresItem[];
  allTvGenres: GenreTvList200GenresItem[];
  isLoading: boolean;
}
