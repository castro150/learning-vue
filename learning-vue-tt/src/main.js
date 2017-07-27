import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'

// We want to apply VueResource to our Vue instance
Vue.use(VueResource)

Vue.config.productionTip = false

window.Event = new Vue()

new Vue({
	el: '#app',
	template: '<App/>',
	components: {
		App
	},
	router
}).$mount('#app')
