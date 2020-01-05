<template>
	<section>
		<div>
			<p>{{ data.windSpeed }}m/s</p>
			<p>Wind</p>
		</div>
		<div>
			<p>{{ data.humidity }}%</p>
			<p>Humidity</p>
		</div>
		<div>
			<p>{{ data.temperatureFeelsLike }}&deg;</p>
			<p>Feels like</p>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Measurements',
	props: {
		data: {
			type: Object
		}
	}
};
</script>

<style scoped>
section {
	display: grid;
	grid-template-columns: repeat(3, auto);
	gap: 2rem;
	text-align: center;
	letter-spacing: 0.05em;
}

div p:first-child {
	font-size: 1.25rem;
	font-weight: bold;
}
</style>
