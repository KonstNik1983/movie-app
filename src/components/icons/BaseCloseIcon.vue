<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="base-close-icon"
  >
    <path
      d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
      :fill="color"
    />
  </svg>
</template>

<script setup lang="ts">
  const props = defineProps({
    size: { type: [String, Number], default: 24 },
    color: { type: String, default: 'white' },
  });
</script>

<style scoped>
  .base-close-icon path {
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .base-close-icon:hover path {
    opacity: 1;
  }
</style>
