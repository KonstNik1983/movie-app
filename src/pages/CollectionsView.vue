<template>
   <div class="collections-page">
      <h2>Подборки</h2>
      <p>Ваши любимые фильмы и сериалы будут отображаться здесь.</p>
      <div class="collection-grid">

      </div>
   </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.collections-page {
   padding: 20px;
}

.collection-grid {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
   gap: 20px;
   margin-top: 20px;
}
</style>