<template>
   <div class="layout">
      <AppHeader />

      <main class="main">
         <router-view />
      </main>

      <AppFooter />
   </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/app-footer/AppFooter.vue';
import AppHeader from '@/components/app-header/AppHeader.vue'
</script>

<style scoped>
.layout {
   display: flex;
   flex-direction: column;
   width: 100%;
   min-height: 100vh;
   max-width: 1400px;
   margin: 0 auto;
   padding: 0 clamp(20px, 5%, 100px);
   background-image: url('@/assets/blur-ellipses.png');
   background-repeat: no-repeat;
   background-size: cover;
}

.main {
   flex: 1;
}
</style>