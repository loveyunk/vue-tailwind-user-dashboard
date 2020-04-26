import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'user' }
  },
  {
    path: '/user',
    name: 'user',
    component: () =>
      import(/* webpackChunkName: "PageUser" */ '../views/PageUser.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
