<template>
  <div class="base-input-wrapper">
    <input
      v-model="field.value.value"
      :type="type || 'text'"
      :placeholder="placeholder || ''"
      @blur="field.handleBlur"
      class="base-input"
    />

    <span v-if="errorText" class="base-input-error">
      {{ errorText }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { FieldContext } from 'vee-validate';

  const { field, type, placeholder } = defineProps<{
    field: FieldContext<string>;
    type?: string;
    placeholder?: string;
  }>();

  const errorText = computed(() =>
    field.meta.touched ? field.errorMessage.value : ''
  );
</script>
<style scoped>
  .base-input {
    width: 100%;
    box-sizing: border-box;
    padding: 13px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  .base-input-error {
    display: block;
    color: var(--color-btn-primary);
    font-size: 13px;
    margin-top: 6px;
  }
</style>
