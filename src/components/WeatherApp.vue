<template>
	<main :class="weatherType">
		<Location :location="weather.location" />
		<Weather :weather="weather" />
		<Details :weather="weather" />
		<Forecast :forecast="forecast" />
	</main>
</template>

<script>
import Location from '@/components/Location';
import Weather from '@/components/Weather';
import Details from '@/components/Details';
import Forecast from '@/components/Forecast';

export default {
	name: 'WeatherApp',
	props: {
		weather: {
			type: Object,
			required: true
		},
		forecast: {
			type: Array,
			required: true
		}
	},
	components: {
		Location,
		Weather,
		Details,
		Forecast
	},
	methods: {},
	computed: {
		weatherType() {
			// Check if night
			if (!this.isDayTime) {
				return 'night';
			}

			return this.weather.type;
		},
		isDayTime() {
			const now = Math.round(new Date() / 1000);
			return now >= this.weather.sunrise[1] && now <= this.weather.sunset[1];
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
	box-shadow: 0 19px 38px rgba(0, 0, 0, 0.35), 0 15px 12px rgba(0, 0, 0, 0.25);

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: relative;
}

.mist {
	background-image: linear-gradient(rgba(23, 37, 38, 0.25), rgba(23, 37, 38, 0.5)),
		url('../assets/bg-mist.png');
}

.rain {
	background-image: linear-gradient(rgba(23, 37, 38, 0.25), rgba(23, 37, 38, 0.5)),
		url('../assets/bg-rain.png');
}

.snow {
	background-image: linear-gradient(rgba(23, 37, 38, 0.25), rgba(23, 37, 38, 0.5)),
		url('../assets/bg-snow.png');
}

.thunder {
	background-image: linear-gradient(rgba(23, 37, 38, 0.25), rgba(23, 37, 38, 0.5)),
		url('../assets/bg-thunder.png');
}

.clouds {
	background-image: linear-gradient(rgba(23, 37, 38, 0.25), rgba(23, 37, 38, 0.5)),
		url('../assets/bg-clouds.png');
}

.night {
	background-image: linear-gradient(rgba(23, 37, 38, 0.25), rgba(23, 37, 38, 0.5)),
		url('../assets/bg-night.png');
}

.clear {
	background-image: linear-gradient(
			rgba(191, 191, 191, 0.1),
			rgba(23, 37, 38, 0.3)
		),
		url('../assets/bg-clear.png');
}

@media screen and (min-width: 450px) {
	main {
		width: 414px;
		height: 736px;
		border-radius: 1rem;
	}
}
</style>
