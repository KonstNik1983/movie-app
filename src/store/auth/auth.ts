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
      favorites: [],
      watchList: [],
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

      localStorage.setItem('currentUser', JSON.stringify(userData.value));

      const users = getUsers();

      const updatedUsers = users.map((user) =>
        user.id === userData.value!.id ? userData.value! : user
      );
      saveUsers(updatedUsers);

      alert('Добавлено в "Хочу посмотреть"');
    } else {
      alert('Этот фильм уже в списке');
    }
  };

  const addToFavoritesList = (id: number, type: 'movie' | 'tv') => {
    if (!userData.value) return;

    const isExistItem = userData.value.favorites.some(
      (item) => item.id === id && item.type === type
    );

    if (!isExistItem) {
      userData.value.favorites.push({ id, type });

      localStorage.setItem('currentUser', JSON.stringify(userData.value));

      const users = getUsers();
      const updatedUsers = users.map((user) =>
        user.id === userData.value!.id ? userData.value! : user
      );
      saveUsers(updatedUsers);

      alert('Добалено в "избранное"');
    } else {
      alert('Этот фильм уже в списке');
    }
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
  };
});
