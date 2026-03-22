<template>
  <div class="user-page">
    <div class="user-header">
      <div class="user-header-info">
        <h1 class="user-header-title">
          Привет, {{ authStore.userData?.username }} !
        </h1>
        <p class="user-header-description">
          Конокритик 2 уровня.
          <span class="highlight">До 3 уровня осталось 150 баллов</span>
        </p>
      </div>
      <BaseButton @click="logoutUser">Выйти</BaseButton>
    </div>

    <div class="user-tabs">
      <button
        class="user-tabs-btn"
        :class="{ active: activeTab === 'watch-list' }"
        @click="activeTab = 'watch-list'"
      >
        Смотреть позже
      </button>
      <button
        class="user-tabs-btn"
        :class="{ active: activeTab === 'favorites' }"
        @click="activeTab = 'favorites'"
      >
        Избранное
      </button>
      <button
        class="user-tabs-btn"
        :class="{ active: activeTab === 'settings' }"
        @click="activeTab = 'settings'"
      >
        Настройки аккаунта
      </button>
    </div>

    <div class="user-tab-content">
      <div v-if="activeTab === 'watch-list' || activeTab === 'favorites'">
        <p class="user-tab-content--title">
          {{
            activeTab === 'watch-list' ? 'Хочу посмотреть' : 'Мне понравились'
          }}
        </p>

        <div class="movies__cards">
          <MediaCard
            v-for="item in userMediaStore.userMedia"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :image="item.image"
            :rating="item.rating"
            :media="item.media"
            :genres="item.genres"
            :link="item.link"
          />
        </div>
      </div>

      <div v-else>
        <p>Настройки аккаунта будут здесь...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/auth/auth';
  import { useUserMediaStore } from '@/store/user-media/user-media';
  import BaseButton from '@/components/base-button/BaseButton.vue';
  import MediaCard from '@/components/media-card/MediaCard.vue';
  import { ROUTES } from '@/router/paths';

  const authStore = useAuthStore();
  const userMediaStore = useUserMediaStore();
  const router = useRouter();

  const activeTab = ref<'watch-list' | 'favorites' | 'settings'>('watch-list');

  const logoutUser = () => {
    authStore.logoutUser();
    router.push({ name: ROUTES.home.name });
  };

  watch(activeTab, (tab) => {
    if (tab === 'watch-list') {
      userMediaStore.loadUserMedia(authStore.userData?.watchList ?? []);
    } else if (tab === 'favorites') {
      userMediaStore.loadUserMedia(authStore.userData?.favorites ?? []);
    }
  });

  onMounted(() => {
    if (activeTab.value === 'watch-list') {
      userMediaStore.loadUserMedia(authStore.userData?.watchList ?? []);
    }
  });
</script>

<style scoped>
  .user-page {
    margin: 0 auto;
  }

  .user-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-top: 1px solid var(--color-text-secondary);
    border-bottom: 1px solid var(--color-text-secondary);
  }

  .user-header-info {
    margin: 30px 0;
  }

  .user-header-title {
    margin-bottom: 8px;
  }

  .highlight {
    color: var(--color-text-secondary);
  }

  .user-tabs {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--color-text-secondary);
  }

  .user-tab-content--title {
    margin-bottom: 20px;
  }

  .user-tabs-btn {
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--color-text-primary);
    cursor: pointer;
    font-size: 15px;
    margin-bottom: 20px;
  }

  .user-tabs-btn.active {
    color: var(--color-btn-primary);
  }

  .movies__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }
</style>
