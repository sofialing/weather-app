<template>
	<section>
		<div>
			<img :src="weatherIcon" class="weather-icon" />
			<p class="description">{{ weather.description }}</p>
			<p class="time">Today {{ time }}</p>
		</div>
		<div>
			<span class="temperature">{{ weather.temperature }}&deg;</span>
		</div>
	</section>
</template>

<script>
import moment from 'moment';

export default {
	name: 'Weather',
	props: {
		weather: {
			type: Object,
			required: true
		},
		timeOfDay: {
			type: Boolean,
			required: true
		}
	},
	created() {
		setInterval(this.updateTime, 1000);
	},
	data() {
		return {
			time: moment().format('HH:mm')
		};
	},
	methods: {
		updateTime() {
			this.time = moment().format('HH:mm');
		}
	},
	computed: {
		weatherIcon() {
			if (this.weather.type === 'clear' && this.timeOfDay === 'night') {
				return require(`@/assets/icons/${this.weather.type}-night.svg`);
			}
			return require(`@/assets/icons/${this.weather.type}.svg`);
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
	margin-bottom: 1.5rem;
}

.temperature {
	font-size: 9.313rem;
	font-weight: 700;
	line-height: 0.75;
	text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
}
</style>
