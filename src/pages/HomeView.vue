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

   <section class="advantages">
      <h2 class="advantages__title">Преимущества КиноДома</h2>

      <ul class="advantages__list">
         <li class="advantages__item">
            <div class="advantages__icon">
               <img class="advantages__icon--img" src="@/assets/icons/avatar.png" alt="Аватар" />
            </div>
            <h3 class="advantages__item-title">Большой выбор</h3>
            <p class="advantages__item-text">
               10 000 фильмов и сериалов уже в библиотеке.
               Ежедневное пополнение новинками кино
            </p>
         </li>

         <li class="advantages__item">
            <div class="advantages__icon">
               <img class="advantages__icon--img" src="@/assets/icons/avatar-ironman.png" alt="Железный человек" />
            </div>
            <h3 class="advantages__item-title">Рекомендации</h3>
            <p class="advantages__item-text">
               Персонализированный список рекомендаций, подобранных на основе ваших интересов
            </p>
         </li>

         <li class="advantages__item">
            <div class="advantages__icon">
               <img class="advantages__icon--img" src="@/assets/icons/avatar-yoda.png" alt="Малыш Йода" />
            </div>
            <h3 class="advantages__item-title">Лучшее мировое кино</h3>
            <p class="advantages__item-text">
               Кино, сереалы со всего мира, включая Европу и Азию. А так же достойное российское кино
            </p>
         </li>

         <li class="advantages__item">
            <div class="advantages__icon">
               <img class="advantages__icon--img" src="@/assets/icons/avatar-64.png" alt="Человек с улыбкой" />
            </div>
            <h3 class="advantages__item-title">Месяц бесплатно</h3>
            <p class="advantages__item-text">
               Весь коталог КиноДома, и все новинки кино и сериалов бесплатно целый месяц после регистрации
            </p>
         </li>
      </ul>
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

.advantages {
   padding: 60px 0;
}

.advantages__title {
   margin-bottom: 60px;
}

.advantages__list {
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 40px;
   list-style: none;
   padding: 0;
   margin: 0;
}

.advantages__item {
   display: flex;
   flex-direction: column;

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

.advantages__ico--img {
   width: 32px;
   height: 32px;
   border-radius: 50%;
}
</style>