import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

// Views
import Home from '../views/Home';
import Online from '../views/Online';
import Private from '../views/Private';
import History from '../views/History';
import Test from '../views/Test';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children:[
      {
        path: '',
        name: 'Home',
        component: Home,
      }, 
      {
        path: 'online',
        name: 'Online',
        component: Online,
      }, 
      {
        path: 'private',
        name: 'Private',
        component: Private,
      }, 
      {
        path: 'history',
        name: 'History',
        component: History,
      }, 
      {
        path: 'test',
        name: 'Test',
        component: Test,
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
