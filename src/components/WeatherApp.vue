<template>
	<main :class="{ day: forecast.isDayLight, night: !forecast.isDayLight }">
		<Location :location="forecast.location" :time="dayOrNight" />
		<Weather :forecast="forecast"></Weather>
		<Measurements :data="measurements" />
		<SunHours
			:sunrise="forecast.sunrise"
			:sunset="forecast.sunset"
			:time="dayOrNight"
		/>
		<Forecast />
	</main>
</template>

<script>
import { WeatherForecast } from '../services/WeatherForecast';
import Location from '../components/Location';
import Weather from '../components/Weather';
import Measurements from '../components/Measurements';
import SunHours from '../components/SunHours';
import Forecast from '../components/Forecast';

export default {
	name: 'WeatherApp',
	components: {
		Location,
		Weather,
		Measurements,
		SunHours,
		Forecast
	},
	data() {
		return {
			forecast: new WeatherForecast()
		};
	},
	computed: {
		dayOrNight() {
			return this.forecast.isDayLight ? 'day' : 'night';
		},
		measurements() {
			return {
				windSpeed: this.forecast.windSpeed,
				humidity: this.forecast.humidity,
				temperatureFeelsLike: this.forecast.temperatureFeelsLike
			};
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
	width: 100%;
	height: 100%;
	padding: 2rem;

	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
	position: relative;
}

.night {
	background-image: linear-gradient(rgba(23, 37, 38, 0.25), rgba(23, 37, 38, 0.5)),
		url('../assets/bg-night.jpg');
}

.day {
	background-image: linear-gradient(
			rgba(191, 191, 191, 0.1),
			rgba(191, 191, 191, 0.2)
		),
		url('../assets/bg-day-3.jpg');
	color: black;
}

@media screen and (min-width: 450px) {
	main {
		width: 414px;
		height: 736px;
		border-radius: 5px;
	}
}
</style>
