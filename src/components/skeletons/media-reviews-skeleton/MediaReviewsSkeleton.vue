<template>
  <div class="media-reviews-skeleton">
    <div class="review-skeleton">
      <div class="review-header">
        <div class="avatar skeleton-item"></div>
        <div class="meta">
          <div class="author skeleton-item"></div>
          <div class="date skeleton-item"></div>
        </div>
      </div>
      <div class="review-content">
        <div v-for="n in 4" :key="n" class="line skeleton-item"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .media-reviews-skeleton {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .review-skeleton {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 20px;
    padding-bottom: 40px;
    margin-bottom: 40px;
  }

  .review-header {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .author {
    width: 80px;
    height: 16px;
    border-radius: 4px;
  }

  .date {
    width: 120px;
    height: 14px;
    border-radius: 4px;
  }

  .review-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .line {
    height: 14px;
    width: 100%;
    border-radius: 4px;
  }

  .line:nth-child(4) {
    width: 60%;
  }
</style>
