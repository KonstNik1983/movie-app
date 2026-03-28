<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    class="base-heart-icon"
  >
    <path
      d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"
    />
  </svg>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      size?: number;
    }>(),
    {
      size: 30,
    }
  );
</script>

<style scoped>
  .base-heart-icon {
    fill: transparent;
    stroke: currentColor;
    stroke-width: 1.5;
    transition: all 0.2s;
  }
</style>
