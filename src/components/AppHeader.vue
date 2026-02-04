<template>
   <header class="app-header">
      <div class="header-left">
         <router-link to="/">
            <img src="@/assets/logo.svg" alt="Logo" class="logo" />
         </router-link>

         <nav>
            <ul>
               <li><router-link to="/movies">Фильмы</router-link></li>
               <li><router-link to="/series">Сериалы</router-link></li>
               <li><router-link to="/collections">Подборки</router-link></li>
            </ul>
         </nav>
      </div>

      <div class="header-right"> <!-- Иконки и поиск -->
         <button class="search-btn">
            <img src="@/assets/icons/search.svg" alt="Поиск" class="" />
            <span>Поиск</span>
         </button>
         <button class="notifications-btn">
            <img src="@/assets/icons/notification.svg" alt="Уведомления" class="" />
         </button>
         <button class="account-btn">
            <img src="@/assets/icons/account.svg" alt="Логин" class="" />
         </button>
      </div>

   </header>
</template>

<script setup lang="ts">
// Пока логики нет, просто верстка
</script>

<style scoped>
.app-header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: transparent;
   padding: 30px 0;

}

.header-left {
   display: flex;
   align-items: center;
}

.logo {
   margin-right: 60px;
}

.header-right {
   display: flex;
   align-items: center;
   gap: 35px;
}

.header-right button {
   display: flex;
   align-items: center;
   justify-content: center;
   background: transparent;
   border: none;
   cursor: pointer;
}

.header-right button span {
   margin-left: 5px;
   color: gray;
}

nav ul {
   display: flex;
   align-items: center;
   gap: 25px;
   list-style: none;
}

nav a {
   color: gray;
   text-decoration: none;
}

nav a:hover {
   color: #fff;
}
</style>