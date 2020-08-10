import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import PDFDocumento from '../components/PDFDocumento'

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
    {
      path: "/documento",
      name: "PDFDocumento",
      component: PDFDocumento
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
    },
    
]

const router = new VueRouter({
  routes
})

export default router
