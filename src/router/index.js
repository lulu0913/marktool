import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Student from '@/components/home/Student'
import Leader from '@/components/home/Leader'
import vueRsource from 'vue-resource'
import axios from 'axios'
 
Vue.use(vueRsource);

Vue.use(Router);

Vue.prototype.$ajax=axios

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component:Register 
    },
    {
      path: '/login',
      name: 'Login',
      component:Login 
    },
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/Leader',
      redirect:'/Leader'
    },
    {
      path: '/student',
      name: 'Student',
      component:Student 
    },
    {
      path: '/leader',
      name: 'Leader',
      component:Leader 
    },
  ]
})
