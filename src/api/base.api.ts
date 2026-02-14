import { IMAGE_BASE_URL, IMAGE_SIZES } from '@/config/constants';
import { GENRE_TITLES, ALLOWED_GENRE_IDS } from '@/config/constants';
import placeholder from '@/assets/placeholder-movie.jpg';

import type {
  Genre,
  Movie,
  Collection,
  TMDBMovie,
  TMDBGenre,
} from '@/types/movie.types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export async function fetchGenres(): Promise<Genre[]> {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ru-RU`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!Array.isArray(data.genres)) {
      console.error('Некорректный ответ API жанров', data);
      return [];
    }

    return data.genres
      .filter((genre: TMDBGenre) => ALLOWED_GENRE_IDS.includes(genre.id))
      .map((genre: TMDBGenre) => ({
        id: genre.id,
        label: GENRE_TITLES[genre.id],
        movies: [],
      }));
  } catch (error) {
    console.error('Ошибка при получении жанров:', error);
    return [];
  }
}

export async function fetchMediaByGenre(
  genreId: number,
  type: 'movie' | 'tv'
): Promise<Movie[]> {
  const url = `${BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&language=ru-RU&page=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!Array.isArray(data.results)) {
      console.error('Некорректный ответ API фильмов', data);
      return [];
    }

    return data.results.map((item: TMDBMovie) => ({
      id: item.id,
      title: item.title,
      name: item.name,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
      vote_average: item.vote_average,
      release_date: item.release_date,
      first_air_date: item.first_air_date,
      genre_ids: item.genre_ids || [],
      type: type === 'movie' ? 'Фильм' : 'Сериал',
    }));
  } catch (error) {
    console.error('Ошибка при получении фильмов по жанру:', error);
    return [];
  }
}

export async function fetchFirstPoster(collection: Collection): Promise<void> {
  const url = `${BASE_URL}/discover/${collection.type}?api_key=${API_KEY}&with_genres=${collection.genreId}&page=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!Array.isArray(data.results) || !data.results.length) {
      collection.posterUrl = placeholder;
      return;
    }

    const movie = data.results[0] as TMDBMovie;
    const path = movie.backdrop_path ?? movie.poster_path;

    collection.posterUrl = path
      ? `${IMAGE_BASE_URL}${IMAGE_SIZES.medium}${path}`
      : placeholder;
  } catch (error) {
    console.error('Ошибка при получении постера:', error);
    collection.posterUrl = placeholder;
  }
}
