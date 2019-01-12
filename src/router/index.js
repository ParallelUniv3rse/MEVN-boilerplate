/**
 * Import Dependency
 */
import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import store from '../store';

/**
 * Import Component (.vue)
 * For Async Component Syntax
 * const X = () => import('@/pages/xxx/xxx.vue')
 */
const Signin = () => import('../pages/signin/Index.vue');
const Dashboard = () => import('../pages/dashboard/Index.vue');
const UserInfo = () => import('../pages/dashboard/child/user/Info.vue');
const PageNotFound = () => import('../pages/errors/404.vue');

/**
 * Config
 */
Vue.use(Router);
Vue.use(Meta);

/**
 * Declare Variable
 */
const pageWhiteList = ['/', '/signin'];

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Signin,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'user/info',
          name: 'user.info',
          component: UserInfo,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '/error/404',
      name: 'pageNotFound',
      component: PageNotFound,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '*',
      redirect: { name: 'pageNotFound' },
    },
  ],
});

/**
 * Router Guards
 */
router.beforeEach((to, from, next) => {
  const _accessToken = store.state.auth.accessToken || '';
  const _isAuthorize = store.state.auth.isAuthorize || false;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (_accessToken && _isAuthorize) {
      next();
    } else {
      next({
        path: '/signin',
        query: { redirect: to.fullPath },
      });
    }
  } else if (pageWhiteList.indexOf(to.path) !== -1) {
    next();
  } else if (to.path !== '/signin') {
    next();
  }
});

router.afterEach((to, from) => {

});

export default router;
