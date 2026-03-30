<template>
  <div class="slider-skeleton">
    <div class="slider-bg skeleton-item"></div>
    <div class="title skeleton-item"></div>
    <div class="meta skeleton-item"></div>
  </div>
</template>

<style scoped>
  .slider-skeleton {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .slider-bg {
    width: 600px;
    height: 400px;
    border-radius: 8px;
  }

  .title {
    width: 60%;
    height: 32px;
    border-radius: 4px;
  }

  .meta {
    width: 40%;
    height: 20px;
    border-radius: 4px;
  }
</style>
