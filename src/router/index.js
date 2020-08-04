import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: {
        name: "login"
      }
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    // {
    //     path: "/secure",
    //     name: "secure",
    //     component: SecureComponent
    // },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
  routes
})

export default router
