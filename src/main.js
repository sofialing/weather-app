import Vue from 'vue';
import App from './App.vue';
import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);

Vue.config.productionTip = false;

new Vue({
	render: h => h(App)
}).$mount('#app');
