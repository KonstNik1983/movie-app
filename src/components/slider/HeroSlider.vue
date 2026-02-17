<template>
  <div class="slider">
    <div ref="emblaRef" class="slider__viewport">
      <div class="slider__container">
        <div
          v-for="movie in sliderStore.formattedSlides"
          :key="movie.id"
          class="slider__slide"
        >
          <img class="slider__image" :src="movie.image" :alt="movie.title" />

          <div class="slider__info">
            <h2 class="slider__title">{{ movie.title }}</h2>
            <span
              class="slider__label"
              :class="{
                'slider__label--in-cinema': isInCinema(movie),
                'slider__label--upcoming': !isInCinema(movie),
              }"
            >
              Премьера • {{ getReleaseLabel(movie) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <button class="slider__btn slider__btn--prev" @click="scrollPrev">←</button>

    <button class="slider__btn slider__btn--next" @click="scrollNext">→</button>
  </div>
</template>

<script setup lang="ts">
  import useEmblaCarousel from 'embla-carousel-vue';
  import { useSliderStore } from '@/store/slider/slider.ts';
  import { isInCinema, getReleaseLabel } from '@/utils/movie.utils';
  import { onMounted } from 'vue';

  const sliderStore = useSliderStore();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  function scrollPrev() {
    if (emblaApi.value) emblaApi.value.scrollPrev();
  }

  function scrollNext() {
    if (emblaApi.value) emblaApi.value.scrollNext();
  }

  onMounted(() => {
    console.log(emblaRef.value);
  });
</script>

<style scoped>
  .slider {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .slider__viewport {
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
  }

  .slider__container {
    display: flex;
  }

  .slider__slide {
    flex: 0 0 100%;
    display: flex;
    flex-direction: column;
  }

  .slider__image {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    max-height: 400px;
    display: block;
    border-radius: 12px;
  }

  .slider__info {
    width: 100%;
    padding: 10px 0;
  }

  .slider__title {
    font-size: 24px;
    margin: 5px 0;
  }

  .slider__label {
    font-size: 16px;
    color: var(--color-text-secondary);
  }

  .slider__btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.2);
    border: none;
    color: var(--color-text-primary);
    font-size: 2rem;
    cursor: pointer;
    padding: 5px 8px;
    border-radius: 10px;
    z-index: 10;
  }

  .slider__btn--prev {
    left: 15px;
  }
  .slider__btn--next {
    right: 15px;
  }

  .slider__label--in-cinema {
    color: green;
  }

  .slider__label--upcoming {
    color: red;
  }
</style>
