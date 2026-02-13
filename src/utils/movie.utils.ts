import {
  IMAGE_BASE_URL,
  IMAGE_SIZES,
  PLACEHOLDER_IMAGE,
} from '@/config/constants';
import type { Movie } from '@/types/movie.types';
import { GENRE_TITLES } from '@/config/constants';

export function buildImage(
  path: string | null | undefined,
  size: keyof typeof IMAGE_SIZES = 'medium'
): string {
  if (path) return `${IMAGE_BASE_URL}${IMAGE_SIZES[size]}${path}`;
  return PLACEHOLDER_IMAGE;
}

export function getReleaseLabel(movie: Movie): string {
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

export function isInCinema(movie: Movie): boolean {
  if (!movie.release_date) return false;
  const today = new Date();
  const release = new Date(movie.release_date);
  return release <= today;
}

export function getMovieImage(
  movie: Movie,
  size: keyof typeof IMAGE_SIZES = 'medium'
): string {
  const path = movie.backdrop_path ?? movie.poster_path;

  if (!path) return PLACEHOLDER_IMAGE;

  return `${IMAGE_BASE_URL}${IMAGE_SIZES[size]}${path}`;
}

export function getMovieGenres(genreIds: number[]): string {
  return genreIds
    .map((id) => GENRE_TITLES[id])
    .filter(Boolean)
    .join(', ');
}

export function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
