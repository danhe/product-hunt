import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/product-hunt',
      name: 'product-hunt',
      component: () => import('./views/ProductHunt.vue'),
      props: (route) => ({ urlDaysAgo: Number(route.query.days_ago) })
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    }
  ]
})
