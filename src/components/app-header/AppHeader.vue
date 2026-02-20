<template>
  <header class="app-header">
    <div class="app-header-left">
      <router-link :to="{ name: ROUTES.home.name }">
        <img src="@/assets/logo.svg" alt="Кинодом Logo" class="logo" />
      </router-link>

      <nav class="header-nav">
        <ul class="header-nav-list">
          <li class="header-nav-item">
            <router-link
              :to="{ name: ROUTES.movies.name }"
              class="header-nav-link"
            >
              Фильмы
            </router-link>
          </li>
          <li class="header-nav-item">
            <router-link
              :to="{ name: ROUTES.series.name }"
              class="header-nav-link"
            >
              Сериалы
            </router-link>
          </li>
          <li class="header-nav-item">
            <router-link
              :to="{ name: ROUTES.collections.name }"
              class="header-nav-link"
            >
              Подборки
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div class="app-header-right">
      <button class="header-btn">
        <img src="@/assets/icons/search.svg" alt="" />
        <span class="header-btn-text">Поиск</span>
      </button>
      <button class="header-btn" aria-label="Уведомления">
        <img src="@/assets/icons/notification.svg" alt="" />
      </button>

      <button
        v-if="authStore.isAuth"
        class="header-btn header-avatar"
        aria-label="Профиль пользователя"
      >
        <img
          src="https://i.pravatar.cc/150"
          alt="Аватар пользователя"
          class="user-avatar"
        />
      </button>

      <button v-else class="header-btn" aria-label="Логин">
        <img src="@/assets/icons/account.svg" alt="" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth/auth.ts';
  import { ROUTES } from '@/router/paths';

  const authStore = useAuthStore();
</script>

<style scoped>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    padding: 20px 0;
  }

  .app-header-left {
    display: flex;
    align-items: center;
  }

  .logo {
    margin-right: 60px;
  }

  .app-header-right {
    display: flex;
    align-items: center;
    gap: 35px;
  }

  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .header-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .header-btn-text {
    margin-left: 5px;
    color: var(--color-text-secondary);
  }

  .header-nav {
    margin-right: 25px;
  }

  .header-nav-list {
    display: flex;
    align-items: center;
    gap: 25px;
    list-style: none;
  }

  .header-nav-link {
    color: var(--color-text-secondary);
    text-decoration: none;
  }

  .header-nav-link:hover {
    color: var(--color-text-primary);
  }

  .header-nav-link.router-link-active {
    color: var(--color-text-primary);
  }
</style>
