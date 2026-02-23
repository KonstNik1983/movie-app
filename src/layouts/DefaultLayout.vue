<template>
  <div class="page">
    <div class="bg" />
    <div class="layout">
      <AppHeader />

      <main class="main">
        <router-view />
      </main>

      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
  import AppFooter from '@/components/app-footer/AppFooter.vue';
  import AppHeader from '@/components/app-header/AppHeader.vue';

  import { onMounted } from 'vue';
  import { useInitStore } from '@/store/init/init';

  const initStore = useInitStore();

  onMounted(async () => {
    await initStore.init();
  });
</script>

<style scoped>
  .layout {
    position: relative;
    z-index: 1;
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
  }

  .page {
    position: relative;
    min-height: 100vh;
    z-index: 0;
  }

  .bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    background:
      radial-gradient(
        600px 500px at 0% 20%,
        rgba(124, 58, 237, 0.35),
        transparent 70%
      ),
      radial-gradient(
        700px 600px at 100% 10%,
        rgba(56, 189, 248, 0.25),
        transparent 70%
      ),
      radial-gradient(
        600px 500px at 0% 80%,
        rgba(236, 72, 153, 0.25),
        transparent 70%
      );
    filter: blur(100px);
    pointer-events: none;
  }
</style>
