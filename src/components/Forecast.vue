<template>
  <section>
    <div v-for="item in forecast" :key="item.day">
      <p class="day">{{ item.day }}</p>
      <img :src="getWeatherIcon(item.icon)" class="weather-icon" />
      <p class="temp">{{ item.temp }}&deg;</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Forecast",
  props: {
    forecast: {
      type: Array,
      required: true
    }
  },
  methods: {
    getWeatherIcon(id) {
      const time = "day";

      // check if thunderstorm
      if (id >= 200 && id <= 232) {
        return require(`../assets/icons/thunderstorm-${time}.svg`);
      }

      // check if rain
      if (id >= 300 && id <= 531) {
        return require(`../assets/icons/rain-${time}.svg`);
      }

      // check if snow
      if (id >= 600 && id <= 622) {
        return require(`../assets/icons/snow-${time}.svg`);
      }

      // check if atmosphere
      if (id >= 701 && id <= 781) {
        return require(`../assets/icons/fog-${time}.svg`);
      }

      // check if clouds
      if (id >= 801 && id <= 804) {
        return require(`../assets/icons/clouds-${time}.svg`);
      }

      return require(`../assets/icons/clear-${time}.svg`);
    }
  }
};
</script>

<style scoped>
section {
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
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
