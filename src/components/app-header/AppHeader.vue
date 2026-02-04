<template>
   <header class="app-header">
      <div class="header-left">
         <router-link to="/">
            <img src="@/assets/logo.svg" alt="Logo" class="logo" />
         </router-link>

         <nav class="header-nav">
            <ul class="header-nav-list">
               <li class="header-nav-item">
                  <router-link to="/movies" class="header-nav-link">Фильмы</router-link>
               </li>
               <li class="header-nav-item">
                  <router-link to="/series" class="header-nav-link">Сериалы</router-link>
               </li>
               <li class="header-nav-item">
                  <router-link to="/collections" class="header-nav-link">Подборки</router-link>
               </li>
            </ul>
         </nav>
      </div>

      <div class="header-right">
         <button class="header-btn">
            <img src="@/assets/icons/search.svg" alt="Поиск" class="" />
            <span class="header-btn-text">Поиск</span>
         </button>
         <button class="header-btn">
            <img src="@/assets/icons/notification.svg" alt="Уведомления" class="" />
         </button>
         <button class="header-btn">
            <img src="@/assets/icons/account.svg" alt="Логин" class="" />
         </button>
      </div>

   </header>
</template>

<script setup lang="ts">

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

.header-btn {
   display: flex;
   align-items: center;
   justify-content: center;
   background: transparent;
   border: none;
   cursor: pointer;
}

.header-btn-text {
   margin-left: 5px;
   color: gray;
}

.header-nav-list {
   display: flex;
   align-items: center;
   gap: 25px;
   list-style: none;
}

.header-nav-link {
   color: gray;
   text-decoration: none;
}

.header-nav-link:hover {
   color: #fff;
}

.header-nav-link.router-link-active {
   color: white;
}
</style>