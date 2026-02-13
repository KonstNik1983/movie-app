import type { Movie, TMDBMovie } from '@/types/movie.types';
import { buildImage } from '@/utils/movie.utils';
import { IMAGE_SIZES } from '@/config/constants';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export async function fetchMedia(type: 'movie' | 'tv'): Promise<Movie[]> {
  const url = `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=ru-RU&page=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!Array.isArray(data.results)) {
      console.error('Некорректный ответ API:', data);
      return [];
    }

    return data.results.map((item: TMDBMovie) => {
      const path = item.backdrop_path ?? item.poster_path;
      return {
        id: item.id,
        title: item.title || item.name,
        type: type === 'movie' ? 'Фильм' : 'Сериал',
        image: buildImage(path, 'medium'),
        release_date: item.release_date ?? item.first_air_date ?? '',
      };
    });
  } catch (error) {
    console.error('Ошибка при получении медиа:', error);
    return [];
  }
}
