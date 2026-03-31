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
    min-height: 600px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2));
    display: flex;
    align-items: flex-end;
  }

  .media-hero-skeleton__content {
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .title {
    width: 50%;
    height: 40px;
    border-radius: 4px;
  }

  .meta {
    width: 60%;
    height: 20px;
    border-radius: 4px;
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
</style>
