import {
  IMAGE_BASE_URL,
  IMAGE_SIZES,
  PLACEHOLDER_IMAGE,
  HOME_GENRES,
} from '@/config/constants';

import { useGenreStore } from '@/store/genre/genre.ts';

export function buildImage(
  path: string | null | undefined,
  size: keyof typeof IMAGE_SIZES = 'medium'
): string {
  if (path) return `${IMAGE_BASE_URL}${IMAGE_SIZES[size]}${path}`;

  return PLACEHOLDER_IMAGE;
}

export function getReleaseLabel(movie: { release_date?: string }): string {
  if (!movie.release_date) return '';
  const today = new Date();
  const release = new Date(movie.release_date);

  return release <= today
    ? 'В прокате'
    : release.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
}

export function isInCinema(movie: { release_date?: string }): boolean {
  if (!movie.release_date) return false;
  const today = new Date();
  const release = new Date(movie.release_date);

  return release <= today;
}

export function getMovieGenres(genreIds?: number[] | null): string {
  if (!Array.isArray(genreIds) || genreIds.length === 0) {
    return '';
  }

  return genreIds
    .map((id) => HOME_GENRES.find((g) => g.id === id)?.title)
    .filter(Boolean)
    .join(', ');
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

export function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
