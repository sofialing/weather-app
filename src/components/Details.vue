<template>
	<section>
		<div class="measurements">
			<div>
				<p>{{ weather.wind }} m/s</p>
				<p>Wind</p>
			</div>
			<div>
				<p>{{ weather.humidity }}%</p>
				<p>Humidity</p>
			</div>
			<div>
				<p>{{ weather.feels_like }}&deg;</p>
				<p>Feels like</p>
			</div>
		</div>
		<div class="sun-hours">
			<div>
				<img :src="require(`@/assets/icons/sunrise.svg`)" class="icon" />
				<p>{{ weather.sunrise[0] }}</p>
			</div>
			<div>
				<img :src="require(`@/assets/icons/sunset.svg`)" class="icon" />
				<p>{{ weather.sunset[0] }}</p>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Details',
	props: {
		weather: {
			type: Object,
			required: true
		}
	}
};
</script>

<style scoped>
.measurements {
	display: grid;
	grid-template-columns: repeat(3, auto);
	gap: 2rem;
	text-align: center;
	letter-spacing: 0.05em;
	margin-bottom: 1.5rem;
}

.measurements p:first-child {
	font-size: 1.25rem;
	font-weight: bold;
}

.sun-hours {
	display: grid;
	grid-template-columns: repeat(2, auto);
	gap: 2rem;
	justify-content: center;
}

.sun-hours div {
	display: flex;
	align-items: center;
}

.icon {
	height: 30px;
	margin-right: 0.75rem;
}
</style>
