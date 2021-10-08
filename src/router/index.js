import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
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
    name: 'AddActivity',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/AddActivity.vue')
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
  {
    path: '/profile',
    name: 'Profile',
    component:  () => import(/* webpackChunkName: "profile" */ '../views/Profile')
  },
]

const router = new VueRouter({
  routes
})

export default router
