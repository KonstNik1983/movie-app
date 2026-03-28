<template>
  <BaseModal :isShow="isShow" @close="closeModal">
    <div class="modal__content">
      <button
        class="close-btn"
        @click="closeModal"
        aria-label="Закрыть трейлер"
      >
        <CloseIcon />
      </button>

      <div v-if="trailerStore.isLoading" class="loader">Загрузка...</div>

      <iframe
        v-else-if="trailerStore.trailerKey"
        :src="youtubeUrl"
        frameborder="0"
        allowfullscreen
      ></iframe>

      <div v-else class="no-trailer">Трейлер недоступен</div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue';
  import BaseModal from '@/components/base-modal/BaseModal.vue';
  import CloseIcon from '@/components/icons/CloseIcon.vue';
  import { useTrailerStore } from '@/store/trailer/trailer';

  const props = defineProps<{
    isShow: boolean;
    mediaId: number;
    mediaType: 'movie' | 'tv';
  }>();
  const emit = defineEmits(['close']);

  const trailerStore = useTrailerStore();

  const closeModal = () => emit('close');

  const youtubeUrl = computed(() =>
    trailerStore.trailerKey
      ? `https://www.youtube.com/embed/${trailerStore.trailerKey}`
      : ''
  );

  watch(
    () => props.isShow,
    (val) => {
      if (val) trailerStore.loadTrailer(props.mediaId, props.mediaType);
      else trailerStore.reset();
    }
  );
</script>

<style scoped>
  .modal__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: var(--color-bg-primary);
    width: 80%;
    max-width: 900px;
    aspect-ratio: 16/9;
    overflow: hidden;
  }

  .modal__content iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  .loader,
  .no-trailer {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: var(--color-text-primary);
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text-primary);
    z-index: var(--z-modal-close);
  }
</style>
