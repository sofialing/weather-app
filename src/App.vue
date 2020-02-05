<template>
	<div id="app">
		<i v-if="!dataRecived" class="fas fa-spinner fa-spin fa-2x"></i>
		<WeatherApp v-if="dataRecived" :weather="weather" :forecast="forecast" />
	</div>
</template>

<script>
import WeatherApp from './components/WeatherApp.vue';
import { weatherMixin } from '@/mixins/weatherMixin';

export default {
	name: 'app',
	components: {
		WeatherApp
	},
	mixins: [weatherMixin],
	data() {
		return {
			weather: {},
			forecast: [],
			dataRecived: false
		};
	},
	methods: {
		async getWeatherData() {
			try {
				const coordinates = await this.$getLocation({
					enableHighAccuracy: true
				});
				const { lat, lng } = coordinates;
				this.weather = await this.getWeather(`&lat=${lat}&lon=${lng}`);
				this.forecast = await this.getForecast(`&lat=${lat}&lon=${lng}`);
				this.dataRecived = true;
			} catch (error) {
				this.weather = await this.getWeather(`&lat=0&lon=0`);
				this.forecast = await this.getForecast(`&lat=0&lon=0`);
				this.dataRecived = true;
				console.error(error);
			}
		}
	},
	beforeMount() {
		this.getWeatherData();
	}
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap');

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body {
	font-family: 'Noto Sans', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #ffffff;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

#app {
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #425059;
}
</style>
