<template>
  <div v-if="isOpen" class="search-modal">
    <div class="search-modal__overlay" @click="closeModal"></div>

    <div class="search-modal__container">
      <div class="search-modal__header">
        <div class="search-modal__logo">
          <router-link :to="{ name: ROUTES.home.name }" @click="closeModal">
            <img src="@/assets/logo.svg" alt="Кинодом Logo" class="logo" />
          </router-link>
        </div>
        <div class="search-modal__search">
          <img
            class="search-modal__search-img"
            src="@/assets/icons/search.svg"
            alt="Поиск"
          />

          <input
            ref="inputRef"
            v-model="searchQuery"
            class="search-modal__search-input"
            placeholder="Название фильма , сериала, или имя актёра, режисёра"
          />

          <button
            type="button"
            class="search-modal__search-close-btn"
            @click="closeModal"
          >
            <img src="@/assets/icons/modal-close.svg" alt="Закрыть" />
          </button>
        </div>
        <div class="search-modal__user">
          <BaseButton variant="ghost">Войти</BaseButton>
        </div>
      </div>
      <div class="search-modal__body">
        <div class="search-section__list">
          <h2 class="search-section__title">
            {{ searchQuery.length >= 2 ? 'Результаты поиска' : 'Часто ищут' }}
          </h2>
          <div class="search-section__list-movie">
            <div
              v-for="movie in searchStore.displayedMovies.slice(0, 3)"
              :key="movie.id"
              class="search-card"
            >
              <img
                class="search-card-img"
                :src="`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`"
                :alt="movie.title"
              />
              <p class="search-card__title">{{ movie.title }}</p>
            </div>
          </div>
          <div class="search-section__list-tv">
            <div
              v-for="tv in searchStore.displayedTv.slice(0, 3)"
              :key="tv.id"
              class="search-card"
            >
              <img
                class="search-card-img"
                :src="`https://image.tmdb.org/t/p/w200${tv.backdrop_path}`"
                :alt="tv.name ?? ''"
              />
              <p class="search-card__title">{{ tv.name }}</p>
            </div>
          </div>
          <h3 class="search-section__list-people-title">АКТЕРЫ И РЕЖИССЕРЫ</h3>
          <div class="search-section__list-people">
            <div
              v-for="person in searchStore.popularPeople.slice(0, 6)"
              :key="person.id"
              class="search-card"
            >
              <p class="search-card__title">{{ person.name }}</p>
              <p class="search-card__role">{{ getRole(person) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { ROUTES } from '@/router/paths';
  import BaseButton from '@/components/base-button/BaseButton.vue';

  import { useSearchStore } from '@/store/search/search';

  const isOpen = ref(false);
  const inputRef = ref<HTMLInputElement | null>(null);
  const searchQuery = ref('');

  const searchStore = useSearchStore();

  const openModal = () => {
    isOpen.value = true;
    inputRef.value?.focus();
    document.body.classList.add('modal-open');
    searchStore.loadPopular();
  };

  const closeModal = () => {
    isOpen.value = false;
    searchQuery.value = '';
    searchStore.reset();
    document.body.classList.remove('modal-open');
  };

  const getRole = (person: { known_for_department?: string }) => {
    const dep = person.known_for_department?.toLowerCase();
    if (dep?.includes('acting')) return 'Актёр';
    if (dep?.includes('directing')) return 'Режиссёр';
    return '—';
  };

  watch(searchQuery, (newVal) => {
    searchStore.searchMedia(newVal);
  });

  defineExpose({ openModal });
</script>

<style scoped>
  .search-modal {
    position: fixed;
    inset: 0;
    z-index: 1000;
  }

  .search-modal__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .search-modal__container {
    position: relative;
    background: black;
    width: 100%;
    padding: 40px 0;
    backdrop-filter: blur(20px);
  }

  .search-modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1250px;
    margin: 0 auto;
  }

  .search-modal__search {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .search-modal__search-input {
    background: transparent;
    border: none;
    outline: none;
    width: 500px;
    color: var(--color-text-primary);
    font-size: 16px;
    flex: 1;
  }

  .search-modal__search-img {
    width: 25px;
    height: 25px;
  }

  .search-modal__search-close-btn {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .search-modal__body {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 800px;
    margin-top: 50px;
  }

  .search-card {
    display: flex;
    flex-direction: column;
    width: 250px;
    flex-shrink: 0;
  }

  .search-section__title {
    font-size: 22px;
  }

  .search-card-img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
  }

  .search-card__title {
    margin-top: 10px;
    font-size: 14px;
    color: var(--color-text-primary);
  }
  .search-section__list-movie,
  .search-section__list-tv {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    overflow-x: auto;
    padding-bottom: 10px;
  }

  .search-section__list-people-title {
    margin-top: 30px;
    color: var(--color-text-secondary);
  }

  .search-section__list-people {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
  }

  .search-card__title {
    font-size: 16px;
    font-weight: bold;
  }

  .search-card__role {
    color: var(--color-text-secondary);
    margin-top: 5px;
    font-size: 14px;
  }
</style>
