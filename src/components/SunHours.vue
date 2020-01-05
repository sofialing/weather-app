<template>
	<section>
		<div>
			<img :src="sunriseIcon" />
			<p>{{ sunrise }}</p>
		</div>
		<div>
			<img :src="sunsetIcon" />
			<p>{{ sunset }}</p>
		</div>
	</section>
</template>

<script>
export default {
	name: 'SunHours',
	props: {
		sunrise: {
			type: String
		},
		sunset: {
			type: String
		},
		time: {
			type: String
		}
	},
	computed: {
		sunriseIcon() {
			return require(`@/assets/icons/sunrise-${this.time}.svg`);
		},
		sunsetIcon() {
			return require(`@/assets/icons/sunset-${this.time}.svg`);
		}
	}
};
</script>

<style scoped>
section {
	display: grid;
	grid-template-columns: repeat(2, auto);
	gap: 1.5rem;
}

div {
	display: flex;
	align-items: center;
}

img {
	height: 30px;
	margin-right: 0.75rem;
}
</style>
