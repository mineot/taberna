import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '../pages/home.page.vue';
// import LanguagesView from '../views/LanguagesView.vue';
// import PageView from '../views/PageView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    // {
    //   path: '/languages',
    //   name: 'languages',
    //   component: LanguagesView,
    // },
    // {
    //   path: '/:slug(.*)',
    //   name: 'page',
    //   component: PageView,
    // },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (_to.hash) return { el: _to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});

export default router;
