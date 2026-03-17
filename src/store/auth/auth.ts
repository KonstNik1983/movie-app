import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/types/user';

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false);
  const userData = ref<User | null>(null);
  const isAuthInitialized = ref(false);

  const getUsers = (): User[] => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const registerUser = (username: string, password: string) => {
    const users = getUsers();

    if (users.some((user) => user.username === username)) {
      alert('Пользователь с таким логином уже существует');
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      password,
    };

    users.push(newUser);
    saveUsers(users);

    localStorage.setItem('currentUser', JSON.stringify(newUser));
    isAuth.value = true;
    userData.value = newUser;
  };

  const loginUser = (username: string, password: string) => {
    const users = getUsers();
    const user = users.find((user) => user.username === username);

    if (!user) {
      alert('Пользователь не найден, зарегистрируйтесь');
      return;
    }
    if (user.password !== password) {
      alert('Неверный логин или пароль');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    isAuth.value = true;
    userData.value = user;
  };

  const logoutUser = () => {
    localStorage.removeItem('currentUser');

    isAuth.value = false;
    userData.value = null;
  };

  const initAuth = () => {
    const stored = localStorage.getItem('currentUser');

    if (!stored) return;

    const user = JSON.parse(stored);

    isAuth.value = true;
    userData.value = user;

    isAuthInitialized.value = true;
  };

  return {
    isAuth,
    userData,
    initAuth,
    registerUser,
    loginUser,
    logoutUser,
    isAuthInitialized,
  };
});
