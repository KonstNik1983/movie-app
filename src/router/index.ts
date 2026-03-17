import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth/auth';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomeView from '@/pages/HomeView.vue';
import MoviesView from '@/pages/MoviesView.vue';
import MoviePage from '@/pages/MoviePage.vue';
import SeriesView from '@/pages/SeriesView.vue';
import TvPage from '@/pages/TvPage.vue';
import CollectionsView from '@/pages/CollectionsView.vue';
import CollectionPage from '@/pages/CollectionPage.vue';
import UserPage from '@/pages/UserPage.vue';

import { ROUTES } from '@/router/paths';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: ROUTES.home.path,
        name: ROUTES.home.name,
        component: HomeView,
      },
      {
        path: ROUTES.movies.path,
        name: ROUTES.movies.name,
        component: MoviesView,
      },
      {
        path: ROUTES.series.path,
        name: ROUTES.series.name,
        component: SeriesView,
      },
      {
        path: ROUTES.collections.path,
        name: ROUTES.collections.name,
        component: CollectionsView,
      },
      {
        path: ROUTES.collection.path,
        name: ROUTES.collection.name,
        component: CollectionPage,
        props: true,
      },
      {
        path: ROUTES.movie.path,
        name: ROUTES.movie.name,
        component: MoviePage,
        props: true,
      },
      {
        path: ROUTES.tv.path,
        name: ROUTES.tv.name,
        component: TvPage,
        props: true,
      },
      {
        path: ROUTES.user.path,
        name: ROUTES.user.name,
        component: UserPage,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthInitialized) {
    await authStore.initAuth();
  }

  if (to.meta.requiresAuth && !authStore.isAuth) {
    alert('Сначала нужно войти в систему');
    return next({ name: ROUTES.home.name });
  }

  next();
});

export default router;
