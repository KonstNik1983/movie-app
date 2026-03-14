import { appFetch } from '@/api/app-fetch';
import type { TvSeasonVideos200ResultsItem } from '@/api/types';

export interface TvVideosResponse {
  id: number;
  results: TvSeasonVideos200ResultsItem[];
}

export interface TvVideosResponseFull {
  status: number;
  data: TvVideosResponse;
  headers: Headers;
}

export const tvVideos = async (tvId: number): Promise<TvVideosResponseFull> =>
  appFetch<TvVideosResponseFull>(
    `https://api.themoviedb.org/3/tv/${tvId}/videos?language=ru-RU`,
    { method: 'GET' }
  );
