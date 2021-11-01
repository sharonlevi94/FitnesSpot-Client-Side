import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import firebaseInstance from '../middleware/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { authNotRequired: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { authNotRequired: false }
  },
  {
    path: '/about',
    name: 'About',
    component:  () => import(/* webpackChunkName: "about" */ '../views/About'),
    meta: { authNotRequired: false }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component:  () => import(/* webpackChunkName: "signin" */ '../views/SignIn'),
    meta: { authNotRequired: false }
  },
  {
    path: '/editedObj/:id',
    name: 'AddActivity',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/AddActivity.vue'),
    meta: { authNotRequired: false }
  },
  {
    path: '/activities',
    name: 'Activities',
    component:  () => import(/* webpackChunkName: "activities" */ '../views/Activities'),
    meta: { authNotRequired: false }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component:  () => import(/* webpackChunkName: "login" */ '../views/LoginPage'),
    meta: { authNotRequired: false }
  },
  {
    path: '/feed',
    name: 'Feed',
    component:  () => import(/* webpackChunkName: "feed" */ '../views/Feed'),
    meta: { authNotRequired: false }
  },
  {
    path: '/profile',
    name: 'Profile',
    component:  () => import(/* webpackChunkName: "profile" */ '../views/Profile'),
    meta: { authNotRequired: false }
  },
  {
    path: '/users',
    name: 'Users',
    component: ()=> import(/* webpackChunkName: "users" */'../views/Users'),
    meta: { authNotRequired: false }
  }
]

const router = new VueRouter({
  routes
})

/*router.beforeEach((to, from, next)=>{
  const user = firebaseInstance.firebase.auth().currentUser;
  if(user && to.meta.authNotRequired || !user && !to.meta.authNotRequired){
    const path = !user ? '/' : '/';
    return next(path)
  }
   next()
})*/

export default router
