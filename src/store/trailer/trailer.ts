import { ref } from "vue";
import { defineStore } from "pinia";
import { movieVideos } from "@/api/tmdb";
import type { MovieVideos200ResultsItem, TvSeasonVideos200ResultsItem } from "@/api/types";
import { tvVideos } from "@/store/trailer/trailer-tv.api";

import { useToast } from "vue-toastification";

type VideoItem = TvSeasonVideos200ResultsItem | MovieVideos200ResultsItem;

export const useTrailerStore = defineStore("trailerStore", () => {
  const toast = useToast();

  const trailerKey = ref<string | null>(null);
  const isLoading = ref(false);

  const loadTrailer = async (id: number, type: "movie" | "tv") => {
    isLoading.value = true;

    try {
      let videos: VideoItem[];

      if (type === "movie") {
        const response = await movieVideos(id);
        videos = response.data.results || [];
      } else {
        const response = await tvVideos(id);
        videos = response.data.results || [];
      }

      const trailer =
        videos.find(
          (video) => video.site === "YouTube" && video.type === "Trailer" && video.official,
        ) ||
        videos.find((video) => video.site === "YouTube" && video.type === "Trailer") ||
        videos.find((video) => video.site === "YouTube");

      trailerKey.value = trailer?.key ?? null;
    } catch {
      toast.error("Ошибка загрузки трейлера");
      reset();
    } finally {
      isLoading.value = false;
    }
  };

  const reset = () => {
    trailerKey.value = null;
    isLoading.value = false;
  };

  return { trailerKey, isLoading, loadTrailer, reset };
});
