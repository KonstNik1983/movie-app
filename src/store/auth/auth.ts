import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false);
  const userData = ref<User | null>(null);

  return {
    isAuth,
    userData,
  };
});
