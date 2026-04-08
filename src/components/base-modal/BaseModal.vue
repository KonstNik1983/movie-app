<template>
  <div v-if="isShow" class="base-modal" data-testid="BaseModal_root">
    <div
      class="base-modal__overlay"
      @click="closeModal"
      data-testid="BaseModal_overlay"
    ></div>

    <div class="base-modal__content" data-testid="BaseModal_content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { watch, onUnmounted } from 'vue';
  import { lock, unlock } from 'tua-body-scroll-lock';

  const props = defineProps<{ isShow: boolean }>();
  const emit = defineEmits(['close']);
  const closeModal = () => emit('close');

  watch(
    () => props.isShow,
    (val) => (val ? lock() : unlock()),
    { immediate: true }
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
    background: rgba(0, 0, 0, 0.4);
  }
</style>
