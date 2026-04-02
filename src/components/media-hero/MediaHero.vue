<template>
  <MediaHeroSkeleton v-if="isLoading" />
  <section v-else class="media-hero" :key="mediaId">
    <div class="media-hero__bg">
      <img v-if="backdrop" :src="backdrop" :alt="title" class="media-hero__image" />

      <div class="media-hero__overlay"></div>
      <div class="media-hero__gradient"></div>
    </div>

    <div class="media-hero__content">
      <div class="media-hero__title">
        <h1 class="media-hero__heading">
          {{ title }}
        </h1>

        <span v-if="badge" class="media-hero__badge">
          {{ badge }}
        </span>
      </div>

      <div v-if="meta" class="media-hero__meta">
        {{ meta }}
      </div>

      <div class="media-hero__actions">
        <BaseButton variant="primary">
          {{ buttonText }}
        </BaseButton>

        <BaseButton variant="ghost" @click="openModal">Трейлер</BaseButton>

        <button
          class="media-hero__btn"
          aria-label="Смотреть позже"
          @click="toggleWatchList"
          :class="{ active: inWatchList }"
        >
          <BookmarkIcon />
        </button>

        <button
          class="media-hero__btn"
          aria-label="Избранное"
          @click="toggleFavorite"
          :class="{ active: isFavorite }"
        >
          <HeartIcon />
        </button>
      </div>
    </div>

    <TrailerModal
      :isShow="isModalOpen"
      :mediaId="mediaId"
      :mediaType="mediaType"
      @close="closeModal"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "@/store/auth/auth";
import BaseButton from "@/components/base-button/BaseButton.vue";
import TrailerModal from "@/components/trailer-modal/TrailerModal.vue";
import MediaHeroSkeleton from "../skeletons/media-hero-skeleton/MediaHeroSkeleton.vue";

import HeartIcon from "@/components/icons/HeartIcon.vue";
import BookmarkIcon from "@/components/icons/BookmarkIcon.vue";

import { useToast } from "vue-toastification";

const toast = useToast();

const authStore = useAuthStore();

const props = defineProps<{
  isLoading: boolean;
  title: string;
  backdrop?: string;
  meta?: string;
  badge?: string;
  buttonText?: string;
  mediaId: number;
  mediaType: "movie" | "tv";
}>();

const isModalOpen = ref(false);
const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);

const isFavorite = computed(() => {
  if (!authStore.userData) return false;

  return authStore.userData.favorites.some(
    (item) => item.id === props.mediaId && item.type === props.mediaType,
  );
});

const toggleFavorite = () => {
  if (!authStore.isAuth) toast.warning("Зарегистрируйтесь!");
  authStore.addToFavoritesList(props.mediaId, props.mediaType);
};

const inWatchList = computed(() => {
  if (!authStore.userData) return false;

  return authStore.userData.watchList.some(
    (item) => item.id === props.mediaId && item.type === props.mediaType,
  );
});

const toggleWatchList = () => {
  if (!authStore.isAuth) toast.warning("Зарегистрируйтесь!");
  authStore.addToWatchList(props.mediaId, props.mediaType);
};
</script>

<style scoped>
.media-hero {
  position: relative;
  width: 100%;
  min-height: 600px;
  color: var(--color-text-primary);
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.media-hero__bg {
  position: absolute;
  inset: 0;
  z-index: var(--z-hero-bg);
}

.media-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.media-hero__overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: var(--z-hero-overlay);
}

.media-hero__gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  z-index: var(--z-hero-gradient);
}

.media-hero__content {
  position: relative;
  z-index: var(--z-hero-content);
  padding: 30px 40px;
}

.media-hero__title {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 20px;
}

.media-hero__heading {
  font-size: 38px;
  font-weight: 700;
  margin: 0;
}

.media-hero__badge {
  align-self: flex-start;
  transform: translateY(-12px);
  padding: 4px 10px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid var(--color-text-primary);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.6);
}

.media-hero__meta {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.media-hero__actions {
  margin-top: 20px;
  display: flex;
  align-items: stretch;
  gap: 15px;
}

.media-hero__btn {
  background: transparent;
  border: none;
  cursor: pointer;
  border: 1px solid var(--color-text-secondary);
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 12px;
  color: var(--color-text-secondary);
}

.media-hero__btn.active {
  color: var(--color-btn-primary);
}
</style>
