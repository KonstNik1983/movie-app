import { ref } from "vue";
import { defineStore } from "pinia";
import { useGenreStore } from "@/store/genre/genre.ts";
import { useAuthStore } from "@/store/auth/auth";

import { useToast } from "vue-toastification";
const toast = useToast();

export const useInitStore = defineStore("init", () => {
  const genreStore = useGenreStore();

  const isInitialized = ref(false);
  const isLoading = ref(false);

  const init = async () => {
    if (isInitialized.value || isLoading.value) return;

    isLoading.value = true;

    try {
      const authStore = useAuthStore();
      authStore.initAuth();

      await Promise.all([genreStore.loadGenres(), genreStore.loadTvGenres()]);
      isInitialized.value = true;
    } catch {
      toast.error("App init error!");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isInitialized,
    isLoading,
    init,
  };
});
