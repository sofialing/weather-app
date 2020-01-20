<template>
  <section>
    <div>
      <img :src="getWeatherIcon" class="weather-icon" />
      <p class="description">{{ getDescription }}</p>
      <p class="time">Today {{ time }}</p>
    </div>
    <div>
      <span class="temperature">{{ getTemperature }}&deg;</span>
    </div>
  </section>
</template>

<script>
import moment from "moment";

export default {
  name: "Weather",
  props: {
    forecast: {
      type: Object,
      required: true
    },
    timeOfDay: {
      type: String,
      required: true
    }
  },
  computed: {
    getDescription() {
      return this.forecast.weather[0].description;
    },
    getTemperature() {
      return Math.round(this.forecast.main.temp);
    },
    getWeatherIcon() {
      const id = this.forecast.weather[0].id;

      // check if thunderstorm
      if (id >= 200 && id <= 232) {
        return require(`../assets/icons/thunderstorm-${this.timeOfDay}.svg`);
      }

      // check if rain
      if (id >= 300 && id <= 531) {
        return require(`../assets/icons/rain-${this.timeOfDay}.svg`);
      }

      // check if snow
      if (id >= 600 && id <= 622) {
        return require(`../assets/icons/snow-${this.timeOfDay}.svg`);
      }

      // check if atmosphere
      if (id >= 701 && id <= 781) {
        return require(`../assets/icons/fog-${this.timeOfDay}.svg`);
      }

      // check if clouds
      if (id >= 801 && id <= 804) {
        return require(`../assets/icons/clouds-${this.timeOfDay}.svg`);
      }

      return require(`../assets/icons/clear-${this.timeOfDay}.svg`);
    }
  },
  data() {
    return {
      time: moment().format("HH:mm")
    };
  },
  created() {
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      this.time = moment().format("HH:mm");
    }
  }
};
</script>

<style scoped>
section {
  text-align: center;
}

.weather-icon {
  height: auto;
  width: 130px;
  margin-bottom: 1rem;
}

.description {
  text-transform: capitalize;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.time {
  font-size: 1rem;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
}

.temperature {
  font-size: 9.313rem;
  font-weight: 700;
  line-height: 0.75;
}
</style>
