<template>
  <section>
    <div class="measurements">
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
    </div>
    <div class="sun-hours">
      <div>
        <img :src="sunriseIcon" class="icon" />
        <p>{{ sun.sunrise }}</p>
      </div>
      <div>
        <img :src="sunsetIcon" class="icon" />
        <p>{{ sun.sunset }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Details",
  props: {
    data: {
      type: Object
    },
    sun: {
      type: Object
    }
  },
  computed: {
    sunriseIcon() {
      return require(`@/assets/icons/sunrise-${this.sun.time}.svg`);
    },
    sunsetIcon() {
      return require(`@/assets/icons/sunset-${this.sun.time}.svg`);
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
