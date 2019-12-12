import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import rule from '@/components/rule'
import MoneyGod from '@/components/MoneyGod'
import Fortunes from '@/components/Fortunes'
import SearchAward from '@/components/SearchAward'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'home',
			component: home
		},
		{
			path: '/rule',
			name: 'rule',
			component: rule
		},
		{
			path: '/MoneyGod',
			name: 'MoneyGod',
			component: MoneyGod
		},
		{
			path:'/Fortunes',
			name:'Fortunes',
			component:Fortunes
		},
		{
			path:'/SearchAward',
			name:'SearchAward',
			component:SearchAward
		}
	]
})
