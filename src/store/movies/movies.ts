import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { discoverMovie } from '@/api/tmdb';
import { HOME_GENRES } from '@/config/constants';
import { buildImage, buildMovieGenres } from '@/utils/movie.utils';

import type { GenreSection, MovieByGenre } from '@/store/movies/movies.types';

export const useMoviesStore = defineStore('moviesStore', () => {
  const sections = ref<GenreSection[]>([]);
  const isLoading = ref(false);

  const formattedSections = computed(() => {
    return sections.value.map((section) => ({
      genre: section.genre,
      movies: section.movies.map((movie: MovieByGenre) => ({
        id: movie.id!,
        title: movie.title ?? movie.original_title ?? '',
        image: buildImage(movie.backdrop_path ?? movie.poster_path ?? ''),
        rating: movie.vote_average ?? '',
        genres: buildMovieGenres(movie.genre_ids),
      })),
    }));
  });

  const loadMovies = async () => {
    isLoading.value = true;

    try {
      const promises = HOME_GENRES.map(async (genre) => {
        const { data } = await discoverMovie({
          with_genres: String(genre.id),
        });

        const movies: MovieByGenre[] = (data.results ?? []).slice(0, 4);

        return {
          genre,
          movies,
        };
      });

      sections.value = await Promise.all(promises);
    } catch (error) {
      console.error('Ошибка загрузки фильмов по жанру:', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    sections,
    formattedSections,
    loadMovies,
  };
});
