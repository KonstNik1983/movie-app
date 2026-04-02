<template>
  <div class="sidebar-skeleton">
    <div v-for="n in 7" :key="n" class="sidebar-skeleton__row skeleton-item"></div>
  </div>
</template>

<style scoped>
.sidebar-skeleton {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 40px;
}

.sidebar-skeleton__row:nth-child(1) {
  width: 70%;
}
.sidebar-skeleton__row:nth-child(2) {
  width: 90%;
}
.sidebar-skeleton__row:nth-child(3) {
  width: 60%;
}
.sidebar-skeleton__row:nth-child(4) {
  width: 80%;
}
.sidebar-skeleton__row:nth-child(5) {
  width: 50%;
}
.sidebar-skeleton__row:nth-child(6) {
  width: 75%;
}
.sidebar-skeleton__row:nth-child(7) {
  width: 65%;
}

.sidebar-skeleton__row {
  height: 20px;
  border-radius: 4px;
}
</style>
