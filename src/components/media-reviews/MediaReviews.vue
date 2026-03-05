<template>
  <div class="media-reviews">
    <div v-if="reviews.length">
      <p class="media-review__description">{{ overview }}</p>
      <div
        v-for="review in visibleReviews"
        :key="review.id"
        class="media-review"
      >
        <div class="media-review__header">
          <img
            :src="getAvatar(review)"
            alt="Author avatar"
            class="media-review__avatar"
          />

          <div class="media-review__meta">
            <span class="media-review__author">{{ review.author }}</span>
            <span class="media-review__date">
              {{ formatDate(review.created_at) }}
            </span>
          </div>
        </div>

        <div class="media-review__content">
          <div
            class="media-review__content-description"
            v-html="review.contentHtml"
          ></div>
        </div>
      </div>

      <BaseButton
        v-if="hasMoreReviews"
        variant="ghost"
        @click="toggleShowReviews"
      >
        {{ showAllReviews ? 'Скрыть' : 'Смотреть все' }}
      </BaseButton>
    </div>

    <div v-else>Рецензии к данному материалу не найдены!</div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import BaseButton from '@/components/base-button/BaseButton.vue';
  import { formatDate } from '@/utils/date';
  import { buildAvatarUrl } from '@/utils/image';

  import type { MovieReviews200ResultsItem } from '@/api/types';

  const props = defineProps<{
    reviews: (MovieReviews200ResultsItem & { contentHtml: string })[];
    overview?: string | null;
  }>();

  const showAllReviews = ref(false);

  const visibleReviews = computed(() =>
    showAllReviews.value ? props.reviews : props.reviews.slice(0, 2)
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
  }
</style>
