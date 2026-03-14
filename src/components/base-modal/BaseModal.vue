<template>
  <div v-if="isShow" class="base-modal">
    <div class="base-modal__overlay" @click="close"></div>

    <slot />
  </div>
</template>

<script setup lang="ts">
  import { watch, onUnmounted } from 'vue';
  import { lock, unlock } from 'tua-body-scroll-lock';

  const props = defineProps<{ isShow: boolean }>();
  const emit = defineEmits(['close']);
  const close = () => emit('close');

  watch(
    () => props.isShow,
    (val) => (val ? lock() : unlock())
  );
  onUnmounted(() => unlock());
</script>

<style scoped>
  .base-modal {
    position: fixed;
    inset: 0;
    z-index: var(--z-modal);
  }

  .base-modal__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
  }
</style>
