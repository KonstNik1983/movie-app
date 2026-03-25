<template>
  <BaseModal :isShow="isShow" @close="closeModal">
    <form class="auth-modal-form" @submit.prevent="handleLogin">
      <button
        type="button"
        class="auth-modal__close"
        @click="closeModal"
        aria-label="Закрыть"
      >
        <img
          src="@/assets/icons/close-icon.svg"
          alt=""
          class="auth-modal__close-icon"
        />
      </button>
      <h2 class="auth-modal-title">Авторизация</h2>

      <BaseInput
        v-model="username"
        :error="usernameField.errorMessage.value"
        placeholder="Логин"
      />

      <BaseInput
        v-model="password"
        :error="passwordField.errorMessage.value"
        type="password"
        placeholder="Пароль"
      />

      <div class="auth-modal-buttons">
        <BaseButton type="submit">Войти</BaseButton>

        <BaseButton
          type="button"
          variant="ghost-secondary"
          @click="handleRegister"
        >
          Зарегистрироваться
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import BaseModal from '@/components/base-modal/BaseModal.vue';
  import BaseButton from '@/components/base-button/BaseButton.vue';
  import BaseInput from '@/components/base-input/BaseInput.vue';
  import { useAuthStore } from '@/store/auth/auth.ts';

  import { useForm, useField } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import { z } from 'zod';

  const authStore = useAuthStore();

  const props = defineProps<{
    isShow: boolean;
  }>();

  const emit = defineEmits(['close']);

  const closeModal = () => {
    resetForm();
    emit('close');
  };

  const schema = z.object({
    username: z.string().min(3, 'Минимум 3 символа'),
    password: z.string().min(4, 'Минимум 4 символа'),
  });

  const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const usernameField = useField<string>('username');
  const passwordField = useField<string>('password');

  const username = computed({
    get: () => usernameField.value.value,
    set: (value: string) => usernameField.setValue(value),
  });

  const password = computed({
    get: () => passwordField.value.value,
    set: (value: string) => passwordField.setValue(value),
  });

  const handleLogin = handleSubmit((values) => {
    const success = authStore.loginUser(values.username, values.password);
    if (success) {
      closeModal();
      resetForm();
    }
    resetForm();
  });

  const handleRegister = handleSubmit((values) => {
    const success = authStore.registerUser(values.username, values.password);
    if (success) {
      closeModal();
      resetForm();
    }
    resetForm();
  });
</script>

<style scoped>
  .auth-modal-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color-text-primary);
    padding: 30px 20px 20px;
    border-radius: 12px;
    width: 420px;
    max-width: 90%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .auth-modal-title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
    color: var(--color-bg-primary);
  }

  .auth-modal__close {
    position: absolute;
    top: 6px;
    right: 10px;
    border: none;
    background: transparent;
    font-size: 25px;
    cursor: pointer;
    line-height: 1;
    color: var(--color-bg-primary);
  }

  .auth-modal__close-icon {
    width: 30px;
    height: 30px;
  }

  .auth-modal-buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
  }
</style>
