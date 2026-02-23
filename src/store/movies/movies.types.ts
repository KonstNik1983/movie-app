import type { DiscoverMovie200ResultsItem } from '@/api/types';

export type MovieByGenre = DiscoverMovie200ResultsItem;

export interface GenreSection {
  genre: {
    id: number;
    title: string;
  };
  movies: MovieByGenre[];
}
