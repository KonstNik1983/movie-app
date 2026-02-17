import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomeView from '@/pages/HomeView.vue';
import MoviesView from '@/pages/MoviesView.vue';
import MoviePage from '@/pages/MoviePage.vue';
import SeriesView from '@/pages/SeriesView.vue';
import CollectionsView from '@/pages/CollectionsView.vue';
import CollectionPage from '@/pages/CollectionPage.vue';

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
      {
        path: 'collections/:slug',
        name: 'CollectionPage',
        component: CollectionPage,
      },
      {
        path: 'movies/:id',
        name: 'MoviePage',
        component: MoviePage,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
