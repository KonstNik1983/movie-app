<template>
  <section class="media-hero-skeleton">
    <div class="media-hero-skeleton__content">
      <div class="title skeleton-item"></div>
      <div class="meta skeleton-item"></div>

      <div class="actions">
        <div class="btn primary skeleton-item"></div>
        <div class="btn skeleton-item"></div>
        <div class="icon-btn skeleton-item"></div>
        <div class="icon-btn skeleton-item"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .media-hero-skeleton {
    width: 100%;
    height: 600px;
    background: #1a1a1a;
    display: flex;
    align-items: flex-end;
  }

  .media-hero-skeleton__content {
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .skeleton-item {
    background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
  }

  .title {
    width: 250px;
    height: 40px;
    margin-bottom: 20px;
  }

  .meta {
    width: 300px;
    height: 20px;
  }

  .actions {
    display: flex;
    gap: 15px;
    margin-top: 10px;
  }

  .btn {
    height: 55px;
    width: 130px;
    border-radius: 6px;
  }

  .btn.primary {
    width: 200px;
  }

  .icon-btn {
    width: 55px;
    height: 55px;
    border-radius: 6px;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
</style>
