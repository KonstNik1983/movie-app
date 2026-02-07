<template>
   <footer class="site-footer">
      <div class="site-footer__top">
         <div class="site-footer__logo">
            <router-link to="/">
               <img src="@/assets/logo.svg" alt="Кинодом Logo" />
            </router-link>
         </div>

         <div class="site-footer__columns">

            <div class="site-footer__column">

               <h3 class="site-footer__column-title">Меню</h3>
               <ul class="site-footer__column-list">
                  <li class="site-footer__column-item"><router-link
class="site-footer__column-link"
                        to="/movies">Фильмы</router-link></li>
                  <li class="site-footer__column-item"><router-link
class="site-footer__column-link"
                        to="/series">Сериалы</router-link></li>
                  <li class="site-footer__column-item"><router-link
class="site-footer__column-link"
                        to="/collections">Подборки</router-link></li>
               </ul>
               <h3 class="site-footer__column-title">Подписка</h3>
               <ul class="site-footer__column-list">
                  <li class="site-footer__column-item"><router-link
class="site-footer__column-link"
                        to="/movies">Тарифный план</router-link></li>
                  <li class="site-footer__column-item"><router-link
class="site-footer__column-link"
                        to="/series">Акции</router-link></li>
                  <li class="site-footer__column-item"><router-link
class="site-footer__column-link"
                        to="/collections">Подписка за баллы</router-link></li>
               </ul>
            </div>

            <div class="site-footer__column">
               <h3 class="site-footer__column-title">Кино и сериалы</h3>
               <ul class="site-footer__column-list">
                  <li class="site-footer__column-item"><a href="#">Весь каталог</a></li>
                  <li class="site-footer__column-item"><a href="#">Комедии</a></li>
                  <li class="site-footer__column-item"><a href="#">Драмы</a></li>
                  <li class="site-footer__column-item"><a href="#">Фэнтези</a></li>
                  <li class="site-footer__column-item"><a href="#">Триллеры</a></li>
                  <li class="site-footer__column-item"><a href="#">Детективы</a></li>
               </ul>
            </div>

            <div class="site-footer__column">
               <h3 class="site-footer__column-title">Сотрудничество</h3>
               <ul class="site-footer__column-list">
                  <li class="site-footer__column-item"><a href="#">Размещение рекламы</a></li>
                  <li class="site-footer__column-item"><a href="#">Партнёрам</a></li>
                  <li class="site-footer__column-item"><a href="#">Партнерская программа</a></li>
                  <li class="site-footer__column-item"><a href="#">Пользовательское соглашение</a></li>
                  <li class="site-footer__column-item"><a href="#">Политика конфедициальности</a></li>
               </ul>
               <h3 class="site-footer__column-title">Вопросы и ответы</h3>
            </div>

            <div class="site-footer__column">
               <h3 class="site-footer__column-title">Техподдержка</h3>
               <ul class="site-footer__column-list">
                  <li class="site-footer__column-item">
                     <a href="#" class="site-footer__contact">
                        <img
src="@/assets/icons/phone.svg" alt="" aria-hidden="true"
                           class="site-footer__contact-icon" />
                        <span>8 800 800 80 80</span>
                     </a>
                  </li>
                  <li class="site-footer__column-item">
                     <a href="#" class="site-footer__contact">
                        <img
src="@/assets/icons/mail.svg" alt="" aria-hidden="true"
                           class="site-footer__contact-icon" />
                        <span>support@mail.ru</span>
                     </a>
                  </li>
               </ul>
               <h3 class="site-footer__column-title">Подписывайтесть на нас</h3>
               <div class="site-footer__social">
                  <a href="#" aria-label="Facebook" class="site-footer__social-link">
                     <img src="@/assets/icons/facebook.svg" alt="Facebook" />
                  </a>
                  <a href="#" aria-label="VK" class="site-footer__social-link">
                     <img src="@/assets/icons/VK.svg" alt="VK" />
                  </a>
                  <a href="#" aria-label="Instagram" class="site-footer__social-link">
                     <img src="@/assets/icons/instagram.svg" alt="Instagram" />
                  </a>
               </div>
            </div>
         </div>
      </div>
      <div class="site-footer__bottom">
         <p>© КиноДом {{ currentYear }}</p>
      </div>
   </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.site-footer {
   background-color: transparent;
   padding: 60px 0 30px 0;
   border-top: 1px solid var(--color-text-secondary);
}

.site-footer__top {
   display: flex;
   flex-wrap: wrap;
   gap: 60px;
   margin-bottom: 60px;
}

.site-footer__bottom {
   font-size: 14px;
   color: var(--color-text-secondary);
}

.site-footer__columns {
   display: flex;
   justify-content: space-between;
   flex: 1;
   gap: 40px;
}

.site-footer__column {
   display: flex;
   flex-direction: column;
}

.site-footer__column-title {
   font-size: 16px;
   margin-bottom: 15px;
}

.site-footer__column-list {
   list-style: none;
   padding: 0;
   margin: 0;
   display: flex;
   flex-direction: column;
   gap: 8px;
   margin-bottom: 30px;
}

.site-footer__column-link,
.site-footer__column-list a {
   color: var(--color-text-secondary);
   text-decoration: none;
   transition: color 0.2s;
}

.site-footer__column-link:hover,
.site-footer__column-list a:hover {
   color: var(--color-text-primary);
}

.site-footer__social {
   display: flex;
   gap: 16px;
   margin-top: 8px;
}

.site-footer__social-link img {
   width: 32px;
   height: 32px;
   transition: transform 0.2s, filter 0.2s;
}

.site-footer__social-link:hover img {
   transform: scale(1.1);
   filter: brightness(1.2);
}

.site-footer__contact {
   display: inline-flex;
   align-items: center;
   gap: 10px;
   color: var(--color-text-secondary);
   text-decoration: none;
}

.site-footer__contact:hover {
   color: var(--color-text-primary);
}

.site-footer__contact-icon {
   width: 16px;
   height: 16px;
   flex-shrink: 0;
}
</style>