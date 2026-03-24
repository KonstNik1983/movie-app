import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/types/user';
import { STORAGE_KEYS } from '@/constants/storage-keys';

import { useToast } from 'vue-toastification';
import { nanoid } from 'nanoid';

const toast = useToast();

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false);
  const userData = ref<User | null>(null);
  const isAuthInitialized = ref(false);

  const getUsers = (): User[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.USERS);
    return stored ? JSON.parse(stored) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  };

  const registerUser = (username: string, password: string) => {
    const users = getUsers();

    if (users.some((user) => user.username === username)) {
      toast.error('Пользователь с таким логином уже существует');
      return false;
    }

    const newUser: User = {
      id: nanoid(10),
      username,
      password,
      favorites: [],
      watchList: [],
    };

    users.push(newUser);
    saveUsers(users);

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    isAuth.value = true;
    userData.value = newUser;

    toast.success(`Добро пожаловать, ${newUser.username}!`);

    return true;
  };

  const loginUser = (username: string, password: string) => {
    const users = getUsers();
    const user = users.find((user) => user.username === username);

    if (!user) {
      toast.error('Пользователь не найден, зарегистрируйтесь');
      return false;
    }
    if (user.password !== password) {
      toast.error('Неверный логин или пароль');
      return false;
    }

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    isAuth.value = true;
    userData.value = user;

    toast.success(`Добро пожаловать, ${user.username}!`);

    return true;
  };

  const logoutUser = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);

    isAuth.value = false;
    userData.value = null;
  };

  const initAuth = () => {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

    if (!stored) return;

    const user = JSON.parse(stored);

    user.watchList = user.watchList || [];
    user.favorites = user.favorites || [];

    isAuth.value = true;
    userData.value = user;

    isAuthInitialized.value = true;
  };

  const addToWatchList = (id: number, type: 'movie' | 'tv') => {
    if (!userData.value) return;

    const isExistItem = userData.value.watchList.some(
      (item) => item.id === id && item.type === type
    );

    if (!isExistItem) {
      userData.value.watchList.push({ id, type });

      localStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(userData.value)
      );

      const users = getUsers();

      const updatedUsers = users.map((user) =>
        user.id === userData.value!.id ? userData.value! : user
      );
      saveUsers(updatedUsers);

      toast.success('Добавлено в "Хочу посмотреть"');
    } else {
      toast.warning('Этот фильм уже в списке');
    }
  };

  const addToFavoritesList = (id: number, type: 'movie' | 'tv') => {
    if (!userData.value) return;

    const isExistItem = userData.value.favorites.some(
      (item) => item.id === id && item.type === type
    );

    if (!isExistItem) {
      userData.value.favorites.push({ id, type });

      localStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(userData.value)
      );

      const users = getUsers();
      const updatedUsers = users.map((user) =>
        user.id === userData.value!.id ? userData.value! : user
      );
      saveUsers(updatedUsers);

      toast.success('Добавлено в "Избранное"');
    } else {
      toast.warning('Этот фильм уже в списке');
    }
  };

  const updateProfile = (updates: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    if (!userData.value) return;

    userData.value = {
      ...userData.value,
      ...updates,
    };

    localStorage.setItem(
      STORAGE_KEYS.CURRENT_USER,
      JSON.stringify(userData.value)
    );

    const users = getUsers();

    const updatedUsers = users.map((user) =>
      user.id === userData.value!.id ? userData.value! : user
    );

    saveUsers(updatedUsers);

    toast.success('Данные профиля обновлены');
  };

  const changePassword = (currentPassword: string, newPassword: string) => {
    if (!userData.value) return false;

    if (userData.value.password !== currentPassword) {
      toast.error('Текущий пароль неверный');
      return false;
    }

    userData.value.password = newPassword;

    const users = getUsers();
    const updatedUsers = users.map((user) =>
      user.id === userData.value!.id ? userData.value! : user
    );
    saveUsers(updatedUsers);

    localStorage.setItem(
      STORAGE_KEYS.CURRENT_USER,
      JSON.stringify(userData.value)
    );

    toast.success('Пароль успешно изменён');
    return true;
  };

  return {
    isAuth,
    userData,
    isAuthInitialized,
    initAuth,
    registerUser,
    loginUser,
    logoutUser,
    addToWatchList,
    addToFavoritesList,
    updateProfile,
    changePassword,
  };
});
