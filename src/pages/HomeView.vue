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
            и оригинале. Целый месяц бесплатно!
         </p>
         <BaseButton variant="primary">Смотреть сейчас</BaseButton>

      </div>
      <div class="hero__right">
         <img src="@/assets/placeholder-movie.jpg" alt="Пример фильма" class="hero__img">
      </div>
   </section>

   <section class="advantages">
      <h2 class="advantages__title">
         Преимущества КиноДома
      </h2>

      <ul class="advantages__list">
         <li class="advantages__item">
            <div class="advantages__icon">
               <img class="advantages__icon-img" src="@/assets/icons/avatar.png" alt="" aria-hidden="true" />
            </div>
            <h3 class="advantages__item-title">Большой выбор</h3>
            <p class="advantages__item-text">
               10 000 фильмов и сериалов уже в библиотеке.
               Ежедневное пополнение новинками кино
            </p>
         </li>

         <li class="advantages__item">
            <div class="advantages__icon">
               <img class="advantages__icon-img" src="@/assets/icons/avatar-ironman.png" alt="" aria-hidden="true" />
            </div>
            <h3 class="advantages__item-title">Рекомендации</h3>
            <p class="advantages__item-text">
               Персонализированный список рекомендаций, подобранных на основе ваших интересов
            </p>
         </li>

         <li class="advantages__item">
            <div class="advantages__icon">
               <img class="advantages__icon-img" src="@/assets/icons/avatar-yoda.png" alt="" aria-hidden="true" />
            </div>
            <h3 class="advantages__item-title">Лучшее мировое кино</h3>
            <p class="advantages__item-text">
               Кино, сериалы со всего мира, включая Европу и Азию. А так же достойное российское кино
            </p>
         </li>

         <li class="advantages__item">
            <div class="advantages__icon">
               <img class="advantages__icon-img" src="@/assets/icons/avatar-64.png" alt="" aria-hidden="true" />
            </div>
            <h3 class="advantages__item-title">Месяц бесплатно</h3>
            <p class="advantages__item-text">
               Весь каталог КиноДома, и все новинки кино и сериалов бесплатно целый месяц после регистрации
            </p>
         </li>
      </ul>
   </section>
   <section class="plans">
      <h2 class="plans__title">Тарифные планы</h2>

      <div class="plans__list">
         <!-- ЛАЙТ -->
         <div class="plans__item">
            <h3 class="plans__item-title">ЛАЙТ</h3>
            <ul class="plans__item-features">
               <li class="plans__item-feature">
                  <img src="@/assets/icons/check.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
                  <span class="plans__item-feature-text active">Кино и сериалы на каждый день</span>
               </li>
               <li class="plans__item-feature">
                  <img src="@/assets/icons/lock.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
                  <span class="plans__item-feature-text">Суперхиты</span>
               </li>
               <li class="plans__item-feature">
                  <img src="@/assets/icons/lock.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
                  <span class="plans__item-feature-text">Всё для детей</span>
               </li>
               <li class="plans__item-feature">
                  <img src="@/assets/icons/lock.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
                  <span class="plans__item-feature-text">Образовательные передачи</span>
               </li>
               <li class="plans__item-feature">
                  <img src="@/assets/icons/lock.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
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
                  <img src="@/assets/icons/check.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
                  <span class="plans__item-feature-text active">Кино и сериалы на каждый день</span>
               </li>
               <li class="plans__item-feature">
                  <img src="@/assets/icons/check.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
                  <span class="plans__item-feature-text active">Суперхиты</span>
               </li>
               <li class="plans__item-feature">
                  <img src="@/assets/icons/check.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
                  <span class="plans__item-feature-text active">Всё для детей</span>
               </li>
               <li class="plans__item-feature">
                  <img src="@/assets/icons/lock.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
                  <span class="plans__item-feature-text">Образовательные передачи</span>
               </li>
               <li class="plans__item-feature">
                  <img src="@/assets/icons/lock.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
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
                  <img src="@/assets/icons/check.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
                  <span class="plans__item-feature-text active">Кино и сериалы на каждый день</span>
               </li>
               <li class="plans__item-feature">
                  <img src="@/assets/icons/check.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
                  <span class="plans__item-feature-text active">Суперхиты</span>
               </li>
               <li class="plans__item-feature">
                  <img src="@/assets/icons/check.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
                  <span class="plans__item-feature-text active">Всё для детей</span>
               </li>
               <li class="plans__item-feature">
                  <img src="@/assets/icons/check.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
                  <span class="plans__item-feature-text active">Образовательные передачи</span>
               </li>
               <li class="plans__item-feature">
                  <img src="@/assets/icons/check.svg" alt="" aria-hidden="true" class="plans__item-feature-icon" />
                  <span class="plans__item-feature-text active">Amediateka и Start</span>
               </li>
            </ul>
            <div class="plans__item-footer">
               <BaseButton variant="primary">Оформить подписку</BaseButton>
               <span class="plans__item-price">400₽</span>
            </div>
         </div>
      </div>
   </section>

   <section class="discounts">
      <h2 class="discounts__title">
         Скидки на кино
      </h2>

      <ul class="discounts__list">
         <li class="discounts__item">
            <div class="discounts__icon">
               <img class="discounts__icon-img" src="@/assets/icons/ric-sanches.png" alt="" aria-hidden="true">
            </div>
            <h3 class="discounts__item-title">
               Скидка 50% на активность в сервисе
            </h3>
            <p class="discounts__item-text">
               Смотри кино, принимай участие в развитии сервиса: пиши рецензии, собирай подборки из фильмов
               и сериалов, проходи квизы.
               Копи баллы, и получай скидку 50% на любой тариф при следующей оплате подписки на КиноДом
            </p>
            <BaseButton variant="ghost">
               Подробнее
            </BaseButton>
         </li>
         <li class="discounts__item">
            <div class="discounts__icon">
               <img class="discounts__icon-img" src="@/assets/icons/gin.png" alt="" aria-hidden="true">
            </div>
            <h3 class="discounts__item-title">
               Скидка для студентов 50%
            </h3>
            <p class="discounts__item-text">
               Просто приложи фото действующего студенческого билета при оформлении подписки и наслаждайся кино!
               Важно! Скидка действует до конца текущего года.Студенческая скидка не суммируеться с другими скидками и
               акциями сервиса
            </p>
            <BaseButton variant="primary">
               Я студент, хочу скидку
            </BaseButton>
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

.discounts {
   padding: 60px 0;
}

.discounts__title {
   margin-bottom: 60px;
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

.discounts__icon--img {
   width: 35px;
   height: 35px;
}

.plans {
   padding: 60px 0;
}

.plans__title {
   margin-bottom: 60px;
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
</style>