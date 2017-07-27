import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import TimeEntries from '@/components/TimeEntries.vue'
import LogTime from '@/components/LogTime.vue'

Vue.use(Router)

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
}, {
	// Any invalid route will redirect to home
	path: '*',
	redirect: '/home'
}]

export default new Router({
	routes,
	mode: 'history'
})
