import type { DiscoverTv200ResultsItem } from '@/api/types';

export type TvByGenre = DiscoverTv200ResultsItem;

export interface TvGenreSection {
  genre: {
    id: number;
    title: string;
  };
  tv: TvByGenre[];
}
