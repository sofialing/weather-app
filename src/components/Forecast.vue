<template>
	<section>
		<div v-for="item in forecast" :key="item.day">
			<p class="day">{{ item.day }}</p>
			<img :src="item.icon" class="weather-icon" />
			<p class="temp">{{ item.temp }}&deg;</p>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Forecast',
	props: {
		forecast: {
			type: Array
		}
	}
};
</script>

<style scoped>
section {
	display: grid;
	grid-template-columns: repeat(5, auto);
	gap: 2rem;
}

div {
	min-width: 40px;
	text-align: center;
}

.day {
	text-transform: uppercase;
	margin-bottom: 0.5rem;
}

.temp {
	font-size: 1.25rem;
	font-weight: 700;
}

.weather-icon {
	height: 24px;
	margin-bottom: 0.5rem;
}
</style>
