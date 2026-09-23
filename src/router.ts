import { createRouter, createWebHashHistory } from 'vue-router';
// import HomePage from '@page/home.page.vue';
// import LanguageSwitcherPage from '@page/language-switcher.page.vue';
// import SlugPage from '@page/slug.page.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomePage,
    // },
    // {
    //   path: '/language-switcher',
    //   name: 'language-switcher',
    //   component: LanguageSwitcherPage,
    // },
    // {
    //   path: '/:slug(.*)',
    //   name: 'page',
    //   component: SlugPage,
    // },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (_to.hash) return { el: _to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});

export default router;
