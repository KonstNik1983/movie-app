import { tvSeriesSimilar } from '@/api/tmdb';

export const tvSimilar = (seriesId: number) =>
  tvSeriesSimilar(String(seriesId));
