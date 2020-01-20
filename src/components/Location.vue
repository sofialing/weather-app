<template>
  <section>
    <!-- <img :src="searchIcon" class="search-icon" /> -->
    <p>{{ getLocation }}</p>
    <small v-if="this.forecast.name === 'Globe'">Allow geolocation to show your current weather.</small>
  </section>
</template>

<script>
export default {
  name: "Location",
  props: {
    forecast: {
      type: Object,
      required: true
    },
    time: {
      type: String
    }
  },
  computed: {
    getLocation() {
      if (this.forecast.sys.country) {
        return `${this.forecast.name}, ${this.forecast.sys.country}`;
      }
      return this.forecast.name;
    },
    searchIcon() {
      return require(`../assets/icons/search-${this.time}.svg`);
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
