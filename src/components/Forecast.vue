<template>
	<section>
		<div>
			<p class="day">Mon</p>
			<img src="@/assets/icons/clear-day.svg" class="weather-icon" />
			<p class="temp">3&deg;</p>
		</div>
		<div>
			<p class="day">Tue</p>
			<img src="@/assets/icons/clear-day.svg" class="weather-icon" />
			<p class="temp">5&deg;</p>
		</div>
		<div>
			<p class="day">Wed</p>
			<img src="@/assets/icons/clear-day.svg" class="weather-icon" />
			<p class="temp">1&deg;</p>
		</div>
		<div>
			<p class="day">Thu</p>
			<img src="@/assets/icons/clear-day.svg" class="weather-icon" />
			<p class="temp">6&deg;</p>
		</div>
		<div>
			<p class="day">Fri</p>
			<img src="@/assets/icons/clear-day.svg" class="weather-icon" />
			<p class="temp">5&deg;</p>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Forecast'
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
