<template>
  <div v-if="isShow" class="trailer-modal">
    <div class="overlay" @click="closeModal"></div>
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">×</button>

      <div v-if="trailerStore.isLoading" class="loader">Загрузка...</div>

      <iframe
        v-else-if="trailerStore.trailerKey"
        :src="youtubeUrl"
        frameborder="0"
        allowfullscreen
      ></iframe>

      <div v-else class="no-trailer">Трейлер недоступен</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue';
  import { useTrailerStore } from '@/store/trailer/trailer';
  import { lock, unlock } from 'tua-body-scroll-lock';

  const props = defineProps<{
    isShow: boolean;
    mediaId: number;
    mediaType: 'movie' | 'tv';
  }>();
  const emit = defineEmits(['close']);

  const trailerStore = useTrailerStore();

  const youtubeUrl = computed(() =>
    trailerStore.trailerKey
      ? `https://www.youtube.com/embed/${trailerStore.trailerKey}`
      : ''
  );

  watch(
    () => props.isShow,
    (val) => {
      if (val) {
        trailerStore.loadTrailer(props.mediaId, props.mediaType);
        lock();
      } else {
        unlock();
        trailerStore.reset();
      }
    }
  );

  const closeModal = () => {
    emit('close');
  };
</script>

<style scoped>
  .trailer-modal {
    position: fixed;
    inset: 0;
    z-index: var(--z-modal);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .modal-content {
    position: relative;
    background: var(--color-bg-primary);
    padding: 0;
    width: 80%;
    max-width: 900px;
    height: 60%;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: var(--color-text-primary);
    background: none;
    border: none;
    cursor: pointer;
  }
  .loader,
  .no-trailer {
    color: var(--color-text-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 20px;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
</style>
