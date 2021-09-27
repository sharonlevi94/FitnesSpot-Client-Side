import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component:  () => import(/* webpackChunkName: "about" */ '../views/About')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component:  () => import(/* webpackChunkName: "signin" */ '../views/SignIn')
  },
  {
    path: '/editedObj/:id',
    name: 'Edit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Edit.vue')
  },
  {
    path: '/activities',
    name: 'Activities',
    component:  () => import(/* webpackChunkName: "activities" */ '../views/Activities')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component:  () => import(/* webpackChunkName: "login" */ '../views/LoginPage')
  },
  {
    path: '/feed',
    name: 'Feed',
    component:  () => import(/* webpackChunkName: "feed" */ '../views/Feed')
  },
  {
    path: '/users',
    name: 'Users',
    component:  () => import(/* webpackChunkName: "users" */ '../views/Users')
  },
]

const router = new VueRouter({
  routes
})

export default router
