import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Hello from '@/components/home/Hello'
import Leader from '@/components/home/Leader'
import User from '@/components/home/User'
import Manager from '@/components/home/Manager'
import U from '@/components/mark/U'
import L from '@/components/mark/L'
import UserMark from '@/components/mark/UserMark'
import vueRsource from 'vue-resource'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
 
Vue.use(ElementUI);
 
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
      path:'/',
      redirect:'/Hello'
    },
    {
      path: '/Manager',
      name: 'Manager',
      component:Manager
    },
    {
      path: '/Hello',
      name: 'Hello',
      component:Hello 
    },
    {
      path: '/Leader',
      name: 'Leader',
      component:Leader 
    },
    {
      path: '/User',
      name: 'User',
      component:User
    },
    {
      path:'/U',
      name:'U',
      component:U,
    },
    {
      path:'/L',
      name:'L',
      component:L,
    },
    {
      path:'/UserMark',
      name:'UserMark',
      component:UserMark,
    }
  ]
})
