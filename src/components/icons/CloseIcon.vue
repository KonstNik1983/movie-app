<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class="base-close-icon"
  >
    <path
      d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
    />
  </svg>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      size?: number;
    }>(),
    {
      size: 24,
    }
  );
</script>

<style scoped>
  .base-close-icon {
    fill: currentColor;
  }
</style>
