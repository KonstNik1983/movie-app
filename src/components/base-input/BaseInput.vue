<template>
  <div class="base-input-wrapper">
    <input
      :type="type || 'text'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="base-input__field"
    />

    <p v-if="error" class="base-input__error">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    modelValue: string;
    error?: string;
    type?: HTMLInputElement['type'];
    placeholder?: string;
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void;
  }>();

  const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  };
</script>

<style scoped>
  .base-input__field {
    width: 100%;
    padding: 13px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  .base-input__error {
    display: block;
    color: var(--color-btn-primary);
    font-size: 13px;
    margin-top: 6px;
  }
</style>
