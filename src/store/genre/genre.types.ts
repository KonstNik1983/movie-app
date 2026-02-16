import type { GenreMovieList200GenresItem } from '@/api/types';

export interface GenreState {
  allGenres: GenreMovieList200GenresItem[];
  isLoading: boolean;
}
