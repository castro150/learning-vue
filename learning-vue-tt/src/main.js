import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import TimeEntries from './components/TimeEntries.vue'
import LogTime from './components/LogTime.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// We want to apply VueResource and VueRouter
// to our Vue instance
Vue.use(VueResource)
Vue.use(VueRouter)

// Pointing routes to the components they should use
const routes = [{
		path: '/home',
		component: Home
	}, {
		path: '/time-entries',
		component: TimeEntries,
		children: [{
			path: 'log-time',
			component: LogTime
		}]
	}
	/*, {
			path: '/time-entries/log-time',
			component: LogTime
		}*/
	/*, {
		// Any invalid route will redirect to home
		path: '*',
		redirect: '/home'
	}*/
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

window.Event = new Vue()

new Vue({
	el: '#app',
	template: '<App/>',
	components: {
		App
	},
	router
}).$mount('#app')
