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
}

.main {
   flex: 1;
   margin: 0 auto;
}
</style>