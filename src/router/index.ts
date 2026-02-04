import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomeView from '@/pages/HomeView.vue';
import MoviesView from '@/pages/MoviesView.vue';
import SeriesView from '@/pages/SeriesView.vue';
import CollectionsView from '@/pages/CollectionsView.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'HomeView',
        component: HomeView,
      },
      {
        path: 'movies',
        name: 'MoviesView',
        component: MoviesView,
      },
      {
        path: 'series',
        name: 'SeriesView',
        component: SeriesView,
      },
      {
        path: 'collections',
        name: 'CollectionsView',
        component: CollectionsView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
