<template>
  <div ref="target">
    <slot v-if="isVisible" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const target = ref<HTMLElement | null>(null);
  const isVisible = ref(false);

  onMounted(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    });

    if (target.value) observer.observe(target.value);
  });
</script>
