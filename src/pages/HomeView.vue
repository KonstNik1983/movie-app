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
      <li class="advantages__item">
        <div class="advantages__icon">
          <img
            class="advantages__icon-img"
            src="@/assets/icons/avatar.png"
            alt=""
            aria-hidden="true"
          />
        </div>
        <h3 class="advantages__item-title">Большой выбор</h3>
        <p class="advantages__item-text">
          10 000 фильмов и сериалов уже в библиотеке. Ежедневное пополнение
          новинками кино
        </p>
      </li>

      <li class="advantages__item">
        <div class="advantages__icon">
          <img
            class="advantages__icon-img"
            src="@/assets/icons/avatar-ironman.png"
            alt=""
            aria-hidden="true"
          />
        </div>
        <h3 class="advantages__item-title">Рекомендации</h3>
        <p class="advantages__item-text">
          Персонализированный список рекомендаций, подобранных на основе ваших
          интересов
        </p>
      </li>

      <li class="advantages__item">
        <div class="advantages__icon">
          <img
            class="advantages__icon-img"
            src="@/assets/icons/avatar-yoda.png"
            alt=""
            aria-hidden="true"
          />
        </div>
        <h3 class="advantages__item-title">Лучшее мировое кино</h3>
        <p class="advantages__item-text">
          Кино, сериалы со всего мира, включая Европу и Азию. А так же достойное
          российское кино
        </p>
      </li>

      <li class="advantages__item">
        <div class="advantages__icon">
          <img
            class="advantages__icon-img"
            src="@/assets/icons/avatar-64.png"
            alt=""
            aria-hidden="true"
          />
        </div>
        <h3 class="advantages__item-title">Месяц бесплатно</h3>
        <p class="advantages__item-text">
          Весь каталог КиноДома, и все новинки кино и сериалов бесплатно целый
          месяц после регистрации
        </p>
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
      <div class="plans__item">
        <h3 class="plans__item-title">ЛАЙТ</h3>
        <ul class="plans__item-features">
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/check.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text active">
              Кино и сериалы на каждый день
            </span>
          </li>
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/lock.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text">Суперхиты</span>
          </li>
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/lock.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text">Всё для детей</span>
          </li>
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/lock.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text">
              Образовательные передачи
            </span>
          </li>
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/lock.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text">Amediateka и Start</span>
          </li>
        </ul>
        <div class="plans__item-footer">
          <BaseButton variant="primary">Оформить подписку</BaseButton>
          <span class="plans__item-price">250₽</span>
        </div>
      </div>

      <div class="plans__item">
        <h3 class="plans__item-title">ОПТИМУМ</h3>
        <ul class="plans__item-features">
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/check.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text active">
              Кино и сериалы на каждый день
            </span>
          </li>
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/check.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text active">Суперхиты</span>
          </li>
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/check.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text active">Всё для детей</span>
          </li>
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/lock.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text">
              Образовательные передачи
            </span>
          </li>
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/lock.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text">Amediateka и Start</span>
          </li>
        </ul>
        <div class="plans__item-footer">
          <BaseButton variant="primary">Оформить подписку</BaseButton>
          <span class="plans__item-price">300₽</span>
        </div>
      </div>

      <div class="plans__item">
        <h3 class="plans__item-title">ПРЕМИУМ</h3>
        <ul class="plans__item-features">
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/check.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text active">
              Кино и сериалы на каждый день
            </span>
          </li>
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/check.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text active">Суперхиты</span>
          </li>
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/check.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text active">Всё для детей</span>
          </li>
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/check.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text active">
              Образовательные передачи
            </span>
          </li>
          <li class="plans__item-feature">
            <img
              src="@/assets/icons/check.svg"
              alt=""
              aria-hidden="true"
              class="plans__item-feature-icon"
            />
            <span class="plans__item-feature-text active">
              Amediateka и Start
            </span>
          </li>
        </ul>
        <div class="plans__item-footer">
          <BaseButton variant="primary">Оформить подписку</BaseButton>
          <span class="plans__item-price">400₽</span>
        </div>
      </div>
    </div>
  </section>

  <section class="discounts section-padding">
    <h2 class="discounts__title">Скидки на кино</h2>

    <ul class="discounts__list">
      <li class="discounts__item">
        <div class="discounts__icon">
          <img
            class="discounts__icon-img"
            src="@/assets/icons/ric-sanches.png"
            alt=""
            aria-hidden="true"
          />
        </div>
        <h3 class="discounts__item-title">
          Скидка 50% на активность в сервисе
        </h3>
        <p class="discounts__item-text">
          Смотри кино, принимай участие в развитии сервиса: пиши рецензии,
          собирай подборки из фильмов и сериалов, проходи квизы. Копи баллы, и
          получай скидку 50% на любой тариф при следующей оплате подписки на
          КиноДом
        </p>
        <BaseButton variant="ghost">Подробнее</BaseButton>
      </li>
      <li class="discounts__item">
        <div class="discounts__icon">
          <img
            class="discounts__icon-img"
            src="@/assets/icons/gin.png"
            alt=""
            aria-hidden="true"
          />
        </div>
        <h3 class="discounts__item-title">Скидка для студентов 50%</h3>
        <p class="discounts__item-text">
          Просто приложи фото действующего студенческого билета при оформлении
          подписки и наслаждайся кино! Важно! Скидка действует до конца текущего
          года.Студенческая скидка не суммируеться с другими скидками и акциями
          сервиса
        </p>
        <BaseButton variant="primary">Я студент, хочу скидку</BaseButton>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/buttons/BaseButton.vue';
  import HeroSlider from '@/components/slider/HeroSlider.vue';

  import { ref, onMounted } from 'vue';
  import placeholder from '@/assets/placeholder-movie.jpg';

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

  interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path?: string | null;
    vote_average: number;
    type: 'Фильм' | 'Сериал';
    genre_ids?: number[];
  }

  interface Genre {
    id: number;
    label: string;
    movies: Movie[];
  }

  interface Collection {
    id: number;
    title: string;
    genreId: number;
    type: 'movie' | 'tv';
    posterUrl: string;
  }

  interface TMDBGenre {
    id: number;
    name: string;
  }

  interface TMDBMovie {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    backdrop_path?: string | null;
    vote_average: number;
    genre_ids?: number[];
  }

  const genreTitles: Record<number, string> = {
    35: 'Комедии',
    18: 'Драмы',
    14: 'Фэнтези',
    53: 'Триллеры',
    9648: 'Детективы',
  };

  const allowedGenreIds = [35, 18, 14, 53, 9648];

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

  async function fetchGenres(): Promise<Genre[]> {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ru-RU`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!Array.isArray(data.genres)) {
        console.error('Некорректный ответ  API жанров', data);

        return [];
      }

      return data.genres
        .filter((genre: TMDBGenre) => allowedGenreIds.includes(genre.id))
        .map((genre: TMDBGenre) => ({
          id: genre.id,
          label: genreTitles[genre.id],
          movies: [],
        }));
    } catch (error) {
      console.error('Ошибка при получении жанров:', error);

      return [];
    }
  }

  async function fetchMediaByGenre(
    genreId: number,
    type: 'movie' | 'tv'
  ): Promise<Movie[]> {
    const url = `${BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&language=ru-RU&page=1`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!Array.isArray(data.results)) {
        console.error('Некорректный ответ API фильмов', data);

        return [];
      }

      return data.results.map((item: TMDBMovie) => ({
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        vote_average: item.vote_average,
        type: type === 'movie' ? 'Фильм' : 'Сериал',
        genre_ids: item.genre_ids || [],
      }));
    } catch (error) {
      console.error('Ошибка при получении фильмов по жанру:', error);

      return [];
    }
  }

  async function fetchFirstPoster(collection: Collection): Promise<void> {
    const url = `${BASE_URL}/discover/${collection.type}?api_key=${API_KEY}&with_genres=${collection.genreId}&page=1`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!Array.isArray(data.results)) {
        console.error('Некорректный ответ API коллекции:', data);
        collection.posterUrl = placeholder;

        return;
      }

      if (data.results?.length) {
        const movie = data.results[0] as TMDBMovie;
        const path = movie.backdrop_path ?? movie.poster_path;
        collection.posterUrl = path
          ? `https://image.tmdb.org/t/p/w500${path}`
          : placeholder;
      } else {
        collection.posterUrl = placeholder;
      }
    } catch (error) {
      console.error('Ошибка при получении постера:', error);
      collection.posterUrl = placeholder;
    }
  }

  function getMovieImage(movie: Movie): string {
    const path = movie.backdrop_path ?? movie.poster_path;
    if (!path) return placeholder;
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  function getMovieGenres(genreIds: number[]): string {
    return genreIds
      .map((id) => genreTitles[id])
      .filter(Boolean)
      .join(', ');
  }

  function shuffleArray<T>(arr: T[]): T[] {
    return arr.sort(() => Math.random() - 0.5);
  }

  onMounted(async (): Promise<void> => {
    const allGenres = await fetchGenres();
    genresState.value = allGenres;

    for (const genre of genresState.value) {
      const movies = await fetchMediaByGenre(genre.id, 'movie');
      const tvs = await fetchMediaByGenre(genre.id, 'tv');
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
    width: 335px;
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
