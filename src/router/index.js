import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/home/Home'
import Welcome from '@/components/home/Welcome'
import UserList from '@/components/users/UserList'
import Rights from '@/components/power/Rights'

Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/login', component: Login},
    {path: '/home', component: Home, redirect: '/welcome', children: [{path: '/Welcome', component: Welcome}, {path: '/users', component: UserList}, {path: '/rights', component: Rights}]
    }]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
