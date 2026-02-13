<template>
  <section class="hero section-padding">
    <div class="hero__left">
      <h1 class="hero__title">
        Самые сочные
        <br />
        премьеры кино -
        <br />
        у вас дома
      </h1>
      <p class="hero__text">
        Ежедневно пополняемая библиотека
        <br />
        с лучшими фильмами и сериалами - в дубляже
        <br />
        и оригинале. Целый месяц бесплатно!
      </p>
      <BaseButton variant="primary">Смотреть сейчас</BaseButton>
    </div>
    <div class="hero__right">
      <HeroSlider />
    </div>
  </section>

  <section class="advantages section-padding">
    <h2 class="advantages__title">Преимущества КиноДома</h2>

    <ul class="advantages__list">
      <li v-for="item in advantages" :key="item.id" class="advantages__item">
        <div class="advantages__icon">
          <img
            :src="item.icon"
            alt=""
            aria-hidden="true"
            class="advantages__icon-img"
          />
        </div>
        <h3 class="advantages__item-title">{{ item.title }}</h3>
        <p class="advantages__item-text">{{ item.text }}</p>
      </li>
    </ul>
  </section>

  <section class="movies section-padding">
    <h2 class="movies__title">Каталог фильмов и сериалов</h2>

    <div v-for="genre in genresState" :key="genre.id" class="movies__genre">
      <h3 class="movie__title">{{ genre.label }}</h3>
      <div class="movies__cards">
        <div v-for="movie in genre.movies" :key="movie.id" class="movie-card">
          <img
            class="movie-card-img"
            :src="getMovieImage(movie)"
            :alt="movie.title"
          />
          <p class="movie-card-text">
            ⭐ {{ movie.vote_average }} • {{ movie.type }} •
            <span v-if="movie.genre_ids?.length">
              {{ getMovieGenres(movie.genre_ids) }}
            </span>
          </p>
          <h4 class="movie-card-title">{{ movie.title }}</h4>
        </div>
      </div>
    </div>
  </section>
  <section class="collections section-padding">
    <h2 class="collections__title">Тематические подборки</h2>

    <div class="collections__grid">
      <div v-for="item in collections" :key="item.id" class="collection-card">
        <img
          class="collection-card__img"
          :src="item.posterUrl || placeholder"
          :alt="item.title"
        />
        <div class="collection-card__overlay">
          <span class="collection-card__title">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </section>

  <section class="plans section-padding">
    <h2 class="plans__title">Тарифные планы</h2>

    <div class="plans__list">
      <div v-for="plan in plans" :key="plan.id" class="plans__item">
        <h3 class="plans__item-title">
          {{ plan.name }}
        </h3>

        <ul class="plans__item-features">
          <li
            v-for="feature in plan.features"
            :key="feature.id"
            class="plans__item-feature"
          >
            <img
              :src="feature.isActive ? checkIcon : lockIcon"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />

            <span
              class="plans__item-feature-text"
              :class="{ active: feature.isActive }"
            >
              {{ feature.text }}
            </span>
          </li>
        </ul>

        <div class="plans__item-footer">
          <BaseButton variant="primary">Оформить подписку</BaseButton>

          <span class="plans__item-price">{{ plan.price }}₽</span>
        </div>
      </div>
    </div>
  </section>

  <section class="discounts section-padding">
    <h2 class="discounts__title">Скидки на кино</h2>

    <ul class="discounts__list">
      <li v-for="item in discounts" :key="item.id" class="discounts__item">
        <div class="discounts__icon">
          <img
            :src="item.icon"
            alt=""
            aria-hidden="true"
            class="discounts__icon-img"
          />
        </div>

        <h3 class="discounts__item-title">
          {{ item.title }}
        </h3>

        <p class="discounts__item-text">
          {{ item.text }}
        </p>

        <BaseButton :variant="item.buttonVariant">
          {{ item.buttonText }}
        </BaseButton>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  import BaseButton from '@/components/buttons/BaseButton.vue';
  import HeroSlider from '@/components/slider/HeroSlider.vue';

  import { ADVANTAGES } from '@/data/advantages.data';
  import { DISCOUNTS } from '@/data/discounts.data';
  import { PLANS } from '@/data/plans.data';

  import {
    fetchGenres,
    fetchMediaByGenre,
    fetchFirstPoster,
  } from '@/api/base.api';

  import {
    shuffleArray,
    getMovieImage,
    getMovieGenres,
  } from '@/utils/movie.utils';

  import type { Movie, Genre, Collection } from '@/types/movie.types';

  import placeholder from '@/assets/placeholder-movie.jpg';
  import checkIcon from '@/assets/icons/check.svg';
  import lockIcon from '@/assets/icons/lock.svg';

  const advantages = ADVANTAGES;
  const discounts = DISCOUNTS;
  const plans = PLANS;

  const genresState = ref<Genre[]>([]);
  const collections = ref<Collection[]>([
    {
      id: 1,
      title: 'Любителям \n комиксов',
      genreId: 878,
      type: 'movie',
      posterUrl: '',
    },
    {
      id: 2,
      title: 'Классика \n фентези',
      genreId: 14,
      type: 'movie',
      posterUrl: '',
    },
    {
      id: 3,
      title: 'Японские \n мультфильмы',
      genreId: 16,
      type: 'movie',
      posterUrl: '',
    },
    {
      id: 4,
      title: 'Сатирические \n мультсериалы',
      genreId: 16,
      type: 'tv',
      posterUrl: '',
    },
  ]);

  onMounted(async (): Promise<void> => {
    genresState.value = await fetchGenres();

    for (const genre of genresState.value) {
      const movies: Movie[] = await fetchMediaByGenre(genre.id, 'movie');
      const tvs: Movie[] = await fetchMediaByGenre(genre.id, 'tv');

      genre.movies = shuffleArray([...movies, ...tvs]).slice(0, 4);
    }

    for (const collection of collections.value) {
      await fetchFirstPoster(collection);
    }
  });
</script>

<style scoped>
  .hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background-image: url('@/assets/bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .hero__left {
    flex: 1;
  }

  .hero__title {
    margin-bottom: 30px;
  }

  .hero__text {
    margin-bottom: 30px;
    color: var(--color-text-secondary);
  }

  .hero__right {
    flex: 1;
    min-width: 250px;
    max-width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero__img {
    width: 100%;
    height: auto;
    max-height: 500px;
    border-radius: 12px;
    object-fit: cover;
  }

  .advantages__title {
    margin-bottom: 70px;
  }

  .advantages__list {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    list-style: none;
  }

  .advantages__item-title {
    margin-bottom: 20px;
  }

  .advantages__item-text {
    color: var(--color-text-secondary);
  }

  .advantages__icon {
    width: 56px;
    height: 56px;
    margin-bottom: 25px;
    border-radius: 50%;
    background: var(--color-bg-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow:
      0 0 20px rgba(255, 255, 255, 0.4),
      0 0 20px rgba(255, 255, 255, 0.1);
  }

  .advantages__icon-img {
    width: 35px;
    height: 35px;
  }

  .discounts__title {
    margin-bottom: 70px;
  }

  .discounts__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    list-style: none;
  }

  .discounts__item {
    max-width: 400px;
  }

  .discounts__item-title {
    margin-bottom: 20px;
  }

  .discounts__item-text {
    color: var(--color-text-secondary);
    margin-bottom: 40px;
  }

  .discounts__icon {
    width: 56px;
    height: 56px;
    margin-bottom: 25px;
    border-radius: 50%;
    background: var(--color-bg-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow:
      0 0 20px rgba(255, 255, 255, 0.4),
      0 0 20px rgba(255, 255, 255, 0.1);
  }

  .discounts__icon-img {
    width: 35px;
    height: 35px;
  }

  .plans__title {
    margin-bottom: 70px;
  }

  .plans__list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .plans__item {
    max-width: 350px;
    background-color: rgba(54, 4, 112, 0.4);
    backdrop-filter: blur(10px);
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
  }

  .plans__item-title {
    margin-bottom: 40px;
  }

  .plans__item-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 40px;
  }

  .plans__item-feature-text {
    color: var(--color-text-secondary);
    font-size: 16px;
  }

  .plans__item-feature-text.active {
    color: var(--color-text-primary);
  }

  .plans__item-feature-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    display: inline-block;
    margin-right: 10px;
  }

  .plans__item-footer {
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 30px 0 0 0;
    border-top: 1px solid white;
  }

  .movies__title {
    margin-bottom: 70px;
  }

  .movie__title {
    font-size: 20px;
    margin-bottom: 30px;
  }

  .movies__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .movies__genre:not(:last-child) {
    margin-bottom: 60px;
  }

  .movie-card-img {
    width: 100%;
    height: 180px;
    border-radius: 8px;
    object-fit: cover;
  }

  .movie-card-title {
    margin-top: 10px;
    font-size: 16px;
  }

  .movie-card-text {
    font-size: 14px;
    color: var(--color-text-secondary);
    margin-top: 10px;
  }

  .collections__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .collections__title {
    margin-bottom: 70px;
  }

  .collection-card {
    position: relative;
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    overflow: hidden;
  }

  .collection-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .collection-card__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: flex-end;
    font-weight: bold;
    padding: 20px;
  }

  .collection-card__title {
    white-space: pre-line;
  }
</style>
