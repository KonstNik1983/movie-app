<template>
  <BaseModal :isShow="isShow" @close="closeModal">
    <form class="auth-modal-form" @submit.prevent="handleLogin">
      <button type="button" class="auth-modal-close" @click="closeModal">
        ×
      </button>
      <h2 class="auth-modal-title">Авторизация</h2>
      <input
        class="auth-modal-input"
        type="text"
        v-model="username"
        placeholder="Логин"
      />
      <input
        class="auth-modal-input"
        type="password"
        v-model="password"
        placeholder="Пароль"
      />

      <div class="auth-modal-buttons">
        <BaseButton type="submit">Войти</BaseButton>

        <BaseButton type="button" variant="auth" @click="handleRegister">
          Зарегистрироваться
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import BaseModal from '@/components/base-modal/BaseModal.vue';
  import BaseButton from '@/components/base-button/BaseButton.vue';
  import { useAuthStore } from '@/store/auth/auth.ts';

  const authStore = useAuthStore();

  const props = defineProps<{
    isShow: boolean;
  }>();

  const emit = defineEmits(['close']);

  const closeModal = () => {
    emit('close');
  };

  const username = ref('');
  const password = ref('');

  const validate = () => {
    if (!username.value.trim() || !password.value.trim()) {
      alert('Заполните все поля');
      return false;
    }

    if (username.value.length < 3) {
      alert('Логин минимум 3 символа');
      return false;
    }

    if (password.value.length < 4) {
      alert('Пароль минимум 4 символа');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    username.value = '';
    password.value = '';
  };

  const handleRegister = () => {
    if (!validate()) return;

    const user = {
      username: username.value,
      password: password.value,
    };

    localStorage.setItem('user', JSON.stringify(user));

    authStore.isAuth = true;
    authStore.userData = user;
    closeModal();
    resetForm();
  };

  const handleLogin = () => {
    if (!username.value.trim() || !password.value.trim()) {
      alert('Введите логин и пароль');
      return;
    }
    const stored = localStorage.getItem('user');

    if (!stored) {
      alert('Пользователь не найден, зарегистрируйтесь');
      return;
    }

    const user = JSON.parse(stored);

    if (user.password !== password.value || user.username !== username.value) {
      alert('Неверный логин или пароль');
      return;
    }

    authStore.isAuth = true;
    authStore.userData = user;
    closeModal();
    resetForm();
  };
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

  .auth-modal-close {
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

  .auth-modal-input {
    padding: 13px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  .auth-modal-buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
  }
</style>
