<template>
  <main :class="timeOfDay">
    <Location :forecast="currentWeather" />
    <Weather :forecast="currentWeather" :timeOfDay="timeOfDay" />
    <Details :forecast="currentWeather" :timeOfDay="timeOfDay" />
    <Forecast :forecast="weatherForecast" :timeOfDay="timeOfDay" />
  </main>
</template>

<script>
import Location from "@/components/Location";
import Weather from "@/components/Weather";
import Details from "@/components/Details";
import Forecast from "@/components/Forecast";

export default {
  name: "WeatherApp",
  props: {
    currentWeather: {
      type: Object,
      required: true
    },
    weatherForecast: {
      type: Array,
      required: true
    }
  },
  components: {
    Location,
    Weather,
    Details,
    Forecast
  },
  computed: {
    timeOfDay() {
      const now = Math.round(new Date() / 1000);

      return now >= this.currentWeather.sys.sunrise &&
        now <= this.currentWeather.sys.sunset
        ? "day"
        : "night";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  width: 100%;
  height: 100%;
  padding: 2rem;

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.35), 0 15px 12px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.night {
  background-image: linear-gradient(
      rgba(23, 37, 38, 0.25),
      rgba(23, 37, 38, 0.5)
    ),
    url("../assets/bg-night.jpg");
}

.day {
  background-image: linear-gradient(
      rgba(191, 191, 191, 0.1),
      rgba(191, 191, 191, 0.2)
    ),
    url("../assets/bg-day.jpg");
  color: black;
}

@media screen and (min-width: 450px) {
  main {
    width: 414px;
    height: 736px;
    border-radius: 1rem;
  }
}
</style>
