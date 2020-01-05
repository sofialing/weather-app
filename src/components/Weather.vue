<template>
	<section>
		<div>
			<img :src="forecast.weatherIcon" class="weather-icon" />
			<p class="description">{{ forecast.description }}</p>
			<p class="time">Today {{ time }}</p>
		</div>
		<div>
			<p class="temperature">{{ forecast.temperature }}&deg;</p>
		</div>
	</section>
</template>

<script>
import moment from 'moment';

export default {
	name: 'Weather',
	props: {
		forecast: {
			type: Object
		}
	},
	data() {
		return {
			time: moment().format('HH:mm')
		};
	},
	created() {
		setInterval(this.updateTime, 1000);
	},
	methods: {
		updateTime() {
			this.time = moment().format('HH:mm');
		}
	}
};
</script>

<style scoped>
section {
	text-align: center;
}

.weather-icon {
	height: auto;
	width: 130px;
	margin-bottom: 1rem;
}

.description {
	text-transform: capitalize;
	font-size: 1.25rem;
	font-weight: 700;
	letter-spacing: 0.05em;
}

.time {
	font-size: 1rem;
	letter-spacing: 0.05em;
}

.temperature {
	font-size: 9.313rem;
	font-weight: 700;
	line-height: 1;
}
</style>
