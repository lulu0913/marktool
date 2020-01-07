import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
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
    }
  ]
})
