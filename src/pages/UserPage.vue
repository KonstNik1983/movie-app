<template>
  <div class="user-page">
    <div class="user-header">
      <h1>Привет, {{ authStore.userData?.username }}</h1>
      <button class="logout-btn" @click="logout">Выйти</button>
    </div>

    <div class="user-tabs">
      <button
        :class="{ active: activeTab === 'profile' }"
        @click="activeTab = 'profile'"
      >
        Профиль
      </button>
      <button
        :class="{ active: activeTab === 'settings' }"
        @click="activeTab = 'settings'"
      >
        Настройки
      </button>
    </div>

    <div class="user-tab-content">
      <div v-if="activeTab === 'profile'">
        <p>Имя пользователя: {{ authStore.userData?.username }}</p>
        <p>ID: {{ authStore.userData?.id }}</p>
      </div>

      <div v-else>
        <p>Настройки аккаунта будут здесь...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/auth/auth';

  const authStore = useAuthStore();
  const router = useRouter();

  const activeTab = ref<'profile' | 'settings'>('profile');

  const logout = () => {
    authStore.logoutUser();
    router.push({ name: 'HomeView' });
  };
</script>

<style scoped>
  .user-page {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    border-top: 1px solid gray;
  }

  .user-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .logout-btn {
    padding: 8px 12px;
    border: none;
    background-color: #e53935;
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
  }

  .user-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .user-tabs button {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background-color: #eee;
    cursor: pointer;
  }

  .user-tabs button.active {
    background-color: #1e88e5;
    color: #fff;
  }

  .user-tab-content p {
    margin: 5px 0;
  }
</style>
