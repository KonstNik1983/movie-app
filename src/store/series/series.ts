import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { discoverTv } from "@/api/tmdb";

import { buildImage, buildTvGenres } from "@/utils/movie.utils";
import { capitalize } from "@/utils/string-helpers";
import { tvPage } from "@/router/paths";
import { getSettledDataApi } from "@/utils/promise";

import { useGenreStore } from "@/store/genre/genre";

import type { TvGenreSection, TvByGenre } from "@/store/series/series.types";
import type { discoverTvResponse200 } from "@/api/tmdb";

import { useToast } from "vue-toastification";
const toast = useToast();

export const useTvStore = defineStore("tvStore", () => {
  const genreStore = useGenreStore();

  const tvSections = ref<TvGenreSection[]>([]);
  const isLoading = ref(false);

  const formattedTvSections = computed(() =>
    tvSections.value.map((section) => ({
      genre: section.genre,
      movies: section.tv.map((tv: TvByGenre) => ({
        id: tv.id!,
        title: tv.name ?? tv.original_name ?? "",
        image: buildImage(tv.backdrop_path ?? tv.poster_path ?? ""),
        rating: tv.vote_average?.toFixed(1) ?? "",
        genres: buildTvGenres(tv.genre_ids),
        link: tvPage(tv.id),
        media: "Сериал",
      })),
    })),
  );

  const formattedHomeTvSections = computed(() => formattedTvSections.value.slice(0, 3));

  const loadTv = async () => {
    isLoading.value = true;

    try {
      if (!genreStore.allTvGenres.length) {
        await genreStore.loadTvGenres();
      }

      const genres = genreStore.allTvGenres.slice(0, 6);

      const promises = genres.map((genre) => discoverTv({ with_genres: String(genre.id) }));

      const results = await Promise.allSettled(promises);

      tvSections.value = results.map((res, index): TvGenreSection => {
        const genre = genres[index];
        if (!genre) throw new Error("Жанр не найден");

        const data = getSettledDataApi<discoverTvResponse200>(res)?.data;
        const tv: TvByGenre[] = data?.results?.slice(0, 4) ?? [];

        return {
          genre: { id: Number(genre.id), title: capitalize(genre.name!) },
          tv,
        };
      });
    } catch {
      toast.error("Ошибка загрузки сериалов по жанру!");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    tvSections,
    formattedTvSections,
    formattedHomeTvSections,
    loadTv,
    isLoading,
  };
});
