<template>
  <BaseModal :isShow="isShow" @close="closeModal">
    <div class="search-modal">
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
              placeholder="Название фильма , сериала, или имя актёра, режиссёра"
            />
            <button
              type="button"
              class="search-modal__search-clear-btn"
              @click="resetQuery"
              title="Очистить поиск"
            >
              <img src="@/assets/icons/modal-close.svg" alt="Очистить" />
            </button>
          </div>

          <div class="search-modal__user">
            <BaseButton variant="ghost" @click="closeModal">Закрыть</BaseButton>
          </div>
        </div>

        <div class="search-modal__body">
          <div class="search-section__list">
            <h2 class="search-section__title">
              {{ searchQuery.length >= 2 ? 'Результаты поиска' : 'Часто ищут' }}
            </h2>

            <div class="search-section__list-movie">
              <template v-if="searchStore.displayedMovies.length">
                <router-link
                  v-for="movie in searchStore.displayedMovies.slice(0, 3)"
                  :key="movie.id"
                  :to="moviePage(movie.id)"
                  class="search-card"
                  @click="closeModal"
                >
                  <img
                    :src="buildImage(movie.backdrop_path)"
                    :alt="movie.title"
                    class="search-card-img"
                  />
                  <p class="search-card__title">{{ movie.title }}</p>
                </router-link>
              </template>
              <p v-else>Фильмы не найдены</p>
            </div>

            <div class="search-section__list-tv">
              <template v-if="searchStore.displayedTv.length">
                <router-link
                  v-for="tv in searchStore.displayedTv.slice(0, 3)"
                  :key="tv.id"
                  :to="tvPage(tv.id)"
                  class="search-card"
                  @click="closeModal"
                >
                  <img
                    :src="buildImage(tv.backdrop_path)"
                    :alt="tv.name ?? ''"
                    class="search-card-img"
                  />
                  <p class="search-card__title">{{ tv.name }}</p>
                </router-link>
              </template>
              <p v-else>Сериалы не найдены</p>
            </div>

            <h3 class="search-section__list-people-title">
              АКТЕРЫ И РЕЖИССЕРЫ
            </h3>
            <div class="search-section__list-people">
              <template v-if="searchStore.displayedPeople.length">
                <div
                  v-for="person in searchStore.displayedPeople.slice(0, 6)"
                  :key="person.id"
                  class="search-card"
                >
                  <p class="search-card__title">{{ person.name }}</p>
                  <p class="search-card__role">{{ getRole(person) }}</p>
                </div>
              </template>
              <p v-else>Люди не найдены</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import BaseModal from '@/components/base-modal/BaseModal.vue';
  import BaseButton from '@/components/base-button/BaseButton.vue';
  import { ROUTES } from '@/router/paths';
  import { buildImage } from '@/utils/movie.utils';
  import { moviePage, tvPage } from '@/router/paths';
  import { useSearchStore } from '@/store/search/search';

  const props = defineProps<{ isShow: boolean }>();
  const emit = defineEmits(['close']);

  const inputRef = ref<HTMLInputElement | null>(null);
  const searchQuery = ref('');
  const searchStore = useSearchStore();

  const closeModal = () => {
    searchQuery.value = '';
    searchStore.reset();
    searchStore.cancelSearch();
    emit('close');
  };

  const resetQuery = () => (searchQuery.value = '');

  const getRole = (person: { known_for_department?: string }) => {
    const dep = person.known_for_department?.toLowerCase();
    if (dep?.includes('acting')) return 'Актёр';
    if (dep?.includes('directing')) return 'Режиссёр';
    return '—';
  };

  watch(
    () => props.isShow,
    (val) => {
      if (val) inputRef.value?.focus();
      searchStore.loadPopular();
    }
  );

  watch(searchQuery, (newVal) => searchStore.searchMedia(newVal));
</script>

<style scoped>
  .search-modal__container {
    position: relative;
    background: var(--color-bg-primary);
    width: 100%;
    max-height: 100vh;
    padding: 40px 0;
    overflow-y: auto;
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

  .search-modal__search-clear-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .search-modal__search-clear-btn:hover {
    opacity: 1;
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
    text-decoration: none;
    color: inherit;
  }

  .search-section__title {
    font-size: 26px;
    margin-bottom: 50px;
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
    font-size: 16px;
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
