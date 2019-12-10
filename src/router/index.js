import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import rule from '@/components/rule'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
		{
			path:'/rule',
			name:'rule',
			component:rule
		}
  ]
})
