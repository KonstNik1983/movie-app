import { appFetch } from '@/api/app-fetch';

export interface TvVideosItem {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string; // 'Trailer'
  official?: boolean;
  published_at: string;
}

export interface TvVideosResponse {
  id: number;
  results: TvVideosItem[];
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
