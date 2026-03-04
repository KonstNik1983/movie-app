import type { DiscoverMovie200ResultsItem } from '@/api/types';

export type MovieByGenre = DiscoverMovie200ResultsItem;

export interface MovieGenreSection {
  genre: {
    id: number;
    title: string;
  };
  movies: MovieByGenre[];
}
