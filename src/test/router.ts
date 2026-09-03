import {
  createMemoryHistory,
  createRouter,
  type RouteRecordRaw,
} from 'vue-router';

const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: { template: '<div />' },
  },
  {
    path: '/:slug(.*)',
    component: { template: '<div />' },
  },
];

export function createTestRouter(routes: RouteRecordRaw[] = defaultRoutes) {
  return createRouter({
    history: createMemoryHistory(),
    routes,
  });
}
