<template>
   <section class="hero">
      <div class="hero__left">
         <h1 class="hero__title">
            Самые сочные <br>
            премьеры кино - <br>
            у вас дома
         </h1>
         <p class="hero__text">
            Ежедневно пополняемая библиотека <br>
            с лучшими фильмами и сериалами - в дубляже <br>
            и оригенале. Целый месяц бесплатно!
         </p>
         <BaseButton variant="primary">Смотреть сейчас</BaseButton>

      </div>
      <div class="hero__right">
         <img src="@/assets/placeholder-movie.jpg" alt="Пример фильма" class="hero__img">
      </div>
   </section>

</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue';
</script>

<style scoped>
.hero {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 60px 0;
   flex-wrap: wrap;
   background-image: url('@/assets/bg.png');
   background-repeat: no-repeat;
   background-size: cover;
}

.hero__left {
   flex: 1;
}

.hero__title {
   font-size: 2.5rem;
   font-weight: bold;
}

.hero__text {
   margin-bottom: 30px;
   color: var(--color-text-secondary);
}

.hero__btn {
   padding: 12px 24px;
   font-size: 1rem;
   background-color: var(--color-btn-primary);
   color: #fff;
   border: none;
   border-radius: 8px;
   cursor: pointer;
   transition: background 0.3s;
}

.hero__btn:hover {
   background-color: var(--color-btn-primary-hover);
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
</style>