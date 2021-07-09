import Vue from 'vue'
import Router from 'vue-router'
import MyEarth from '@/components/MyEarth'
import AirCityEarth from '@/components/AirCityEarth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyEarth',
      component: MyEarth,
      children:[
        {path:'aircity', component: AirCityEarth},
      ]
    },
    // {
    //   path: '/aircity',
    //   name: 'AirCityEarth',
    //   component: AirCityEarth
    // }
  ]
})
