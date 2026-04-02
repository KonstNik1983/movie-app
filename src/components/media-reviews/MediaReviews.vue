<template>
  <div class="media-reviews">
    <template v-if="isLoading">
      <div class="skeleton-overview">
        <p class="description-skeleton skeleton-item"></p>
        <p class="description-skeleton skeleton-item"></p>
        <p class="description-skeleton skeleton-item short"></p>
      </div>
      <MediaReviewsSkeleton v-for="n in 2" :key="n" />
    </template>

    <template v-else>
      <div v-if="reviews.length">
        <p class="media-review__description">{{ overview }}</p>
        <div v-for="review in visibleReviews" :key="review.id" class="media-review">
          <div class="media-review__header">
            <img :src="getAvatar(review)" alt="Author avatar" class="media-review__avatar" />

            <div class="media-review__meta">
              <span class="media-review__author">{{ review.author }}</span>
              <span class="media-review__date">
                {{ formatDate(review.created_at) }}
              </span>
            </div>
          </div>

          <div class="media-review__content">
            <div class="media-review__content-description" v-html="review.contentHtml"></div>
            <div class="media-review__actions">
              <button class="review-action-btn" aria-label="Комментарии">
                <img src="@/assets/icons/comment.svg" alt="" />
              </button>

              <button class="review-action-btn" aria-label="Лайк">
                <img src="@/assets/icons/like.svg" alt="" />
              </button>

              <button class="review-action-btn down" aria-label="Дизлайк">
                <img src="@/assets/icons/dislike.svg" alt="" />
              </button>
            </div>
          </div>
        </div>

        <BaseButton v-if="hasMoreReviews" variant="ghost" @click="toggleShowReviews">
          {{ showAllReviews ? "Скрыть" : "Смотреть все" }}
        </BaseButton>
      </div>
      <div v-else>Рецензии к данному материалу не найдены!</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import BaseButton from "@/components/base-button/BaseButton.vue";
import MediaReviewsSkeleton from "../skeletons/media-reviews-skeleton/MediaReviewsSkeleton.vue";
import { formatDate } from "@/utils/date";
import { buildAvatarUrl } from "@/utils/image";

import type { MovieReviews200ResultsItem } from "@/api/types";

const props = defineProps<{
  reviews: (MovieReviews200ResultsItem & { contentHtml: string })[];
  overview?: string | null;
  isLoading: boolean;
}>();

const showAllReviews = ref(false);

const visibleReviews = computed(() =>
  showAllReviews.value ? props.reviews : props.reviews.slice(0, 2),
);

const hasMoreReviews = computed(() => props.reviews.length > 2);

const toggleShowReviews = () => {
  showAllReviews.value = !showAllReviews.value;
};

const getAvatar = (review: MovieReviews200ResultsItem) =>
  buildAvatarUrl(review.author_details?.avatar_path);
</script>

<style scoped>
.media-review {
  margin-bottom: 40px;
  padding-bottom: 40px;
}

.media-review:not(:last-of-type) {
  border-bottom: 1px solid var(--color-text-secondary);
}

.media-review__description {
  margin-bottom: 40px;
}

.skeleton-overview {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 40px;
}

.description-skeleton {
  width: 80%;
  height: 15px;
  border-radius: 4px;
}

.short {
  width: 60%;
}

.media-review__header {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}

.media-review__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.media-review__meta {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.media-review__author {
  font-weight: 600;
}

.media-review__date {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.media-review__content-description {
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
  white-space: pre-line;
}

.media-review__content-description * {
  color: inherit;
}

.media-review__actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
}

.review-action-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.down {
  transform: translateY(6px);
}
</style>
