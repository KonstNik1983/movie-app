import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import {
  IMAGE_BASE_URL,
  IMAGE_SIZES,
  PLACEHOLDER_IMAGE,
} from '@/constants/img.constants';

import { useGenreStore } from '@/store/genre/genre.ts';

dayjs.locale('ru');

export function buildImage(
  path: string | null | undefined,
  size: keyof typeof IMAGE_SIZES = 'medium'
): string {
  if (path) return `${IMAGE_BASE_URL}${IMAGE_SIZES[size]}${path}`;

  return PLACEHOLDER_IMAGE;
}

export function getReleaseLabel(movie: { release_date?: string }): string {
  if (!movie.release_date) return '';

  const today = dayjs();
  const release = dayjs(movie.release_date);

  return release.isBefore(today, 'day')
    ? 'В прокате'
    : release.format('D MMMM YYYY');
}

export function isInCinema(movie: { release_date?: string }): boolean {
  if (!movie.release_date) return false;
  const today = new Date();
  const release = new Date(movie.release_date);

  return release <= today;
}

export function buildMovieGenres(
  genreIds?: number[] | null,
  limit = 2
): string {
  if (!Array.isArray(genreIds) || genreIds.length === 0) return '';

  const genreStore = useGenreStore();

  return genreIds
    .map((id) => genreStore.getGenreById(id)?.name?.toLowerCase())
    .filter(Boolean)
    .slice(0, limit)
    .join(', ');
}

export function buildTvGenres(genreIds?: number[] | null, limit = 2): string {
  if (!Array.isArray(genreIds) || genreIds.length === 0) return '';

  const genreStore = useGenreStore();

  return genreIds
    .map((id) => genreStore.getTvGenreById(id)?.name?.toLowerCase())
    .filter(Boolean)
    .slice(0, limit)
    .join(', ');
}
