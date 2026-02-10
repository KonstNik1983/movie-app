<template>
   <button class="base-btn" :class="buttonClass">
      <slot />
   </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
   variant?: 'primary' | 'secondary' | 'ghost'
}>()

const buttonClass = computed(() => {
   return props.variant ? `base-btn--${props.variant}` : ''
})
</script>

<style scoped>
.base-btn {
   padding: 12px 20px;
   font-size: 1rem;
   font-weight: 600;
   border: none;
   border-radius: 8px;
   cursor: pointer;
   transition: background 0.3s;
}

.base-btn--primary {
   background: var(--color-btn-primary);
   color: var(--color-text-primary);
}

.base-btn--primary:hover {
   background: var(--color-btn-primary-hover);
}

.base-btn--ghost {
   background: transparent;
   color: var(--color-text-primary);
   border: 1px solid rgba(255, 255, 255, .4);
}

.base-btn--ghost:hover {
   background: rgba(255, 255, 255, .1);
}
</style>