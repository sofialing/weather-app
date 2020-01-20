<template>
  <section>
    <div class="measurements">
      <div>
        <p>{{ forecast.wind.speed }}m/s</p>
        <p>Wind</p>
      </div>
      <div>
        <p>{{ forecast.main.humidity }}%</p>
        <p>Humidity</p>
      </div>
      <div>
        <p>{{ Math.round(forecast.main.feels_like) }}&deg;</p>
        <p>Feels like</p>
      </div>
    </div>
    <div class="sun-hours">
      <div>
        <img :src="sunriseIcon" class="icon" />
        <p>{{ sunriseTime }}</p>
      </div>
      <div>
        <img :src="sunsetIcon" class="icon" />
        <p>{{ sunsetTime }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";

export default {
  name: "Details",
  props: {
    forecast: {
      type: Object,
      required: true
    }
  },
  computed: {
    sunriseTime() {
      return moment.unix(this.forecast.sys.sunrise).format("kk:mm");
    },
    sunsetTime() {
      return moment.unix(this.forecast.sys.sunset).format("kk:mm");
    },
    sunriseIcon() {
      return require(`@/assets/icons/sunrise-day.svg`);
    },
    sunsetIcon() {
      return require(`@/assets/icons/sunset-day.svg`);
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
