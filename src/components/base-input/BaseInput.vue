<template>
  <div class="base-input-wrapper">
    <input
<<<<<<< HEAD
      v-model="field.value.value"
      :type="type || 'text'"
      :placeholder="placeholder || ''"
      @blur="field.handleBlur"
      class="base-input"
    />

    <span v-if="errorText" class="base-input-error">
      {{ errorText }}
    </span>
=======
      :type="type || 'text'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="base-input__field"
    />

    <p v-if="error" class="base-input__error">
      {{ error }}
    </p>
>>>>>>> feature/auth
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
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
=======
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
>>>>>>> feature/auth
    padding: 13px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

<<<<<<< HEAD
  .base-input-error {
=======
  .base-input__error {
>>>>>>> feature/auth
    display: block;
    color: var(--color-btn-primary);
    font-size: 13px;
    margin-top: 6px;
  }
</style>
