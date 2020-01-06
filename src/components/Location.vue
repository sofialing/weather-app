<template>
  <section>
    <!-- <img :src="searchIcon" class="search-icon" /> -->
    <p>{{ location }}</p>
  </section>
</template>

<script>
export default {
  name: "Location",
  props: {
    location: {
      type: String
    },
    time: {
      type: String
    }
  },
  computed: {
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
}
</style>
