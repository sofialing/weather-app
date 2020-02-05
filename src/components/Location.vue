<template>
	<section>
		<!-- <img :src="require('@/assets/icons/search.svg')" class="search-icon" /> -->
		<p>{{ location }}</p>
		<small v-if="this.location === 'Globe'"
			>Allow geolocation to show your current weather.</small
		>
	</section>
</template>

<script>
export default {
	name: 'Location',
	props: {
		location: {
			type: String,
			required: true
		}
	}
};
</script>

<style scoped>
.search-icon {
	width: 1.5rem;
	position: absolute;
	top: 1rem;
	right: 1rem;
}
p {
	font-size: 1.25rem;
	font-weight: 700;
	letter-spacing: 0.05em;
	text-align: center;
}
</style>
