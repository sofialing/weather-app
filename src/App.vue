<template>
  <div id="app">
    <i v-if="!dataRecived" class="fas fa-spinner fa-spin fa-2x"></i>
    <WeatherApp
      v-if="dataRecived"
      :currentWeather="currentWeather"
      :weatherForecast="weatherForecast"
    />
  </div>
</template>

<script>
import WeatherApp from "./components/WeatherApp.vue";
import API from "@/services/appServices.js";
import axios from "axios";
import moment from "moment";

export default {
  name: "app",
  components: {
    WeatherApp
  },
  data() {
    return {
      currentWeather: {},
      weatherForecast: [],
      dataRecived: false
    };
  },
  methods: {
    getCurrentPosition() {
      navigator.geolocation.getCurrentPosition(
        this.setCurrentPosition,
        this.positionNotAvailable
      );
    },
    setCurrentPosition(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.getWeatherData(`&lat=${lat}&lon=${lon}`);
    },
    positionNotAvailable() {
      this.getWeatherData(`&lat=0&lon=0`);
    },
    getWeatherData(query) {
      axios.get(API.current + query + API.key).then(res => {
        this.currentWeather = res.data;
        this.dataRecived = true;
      });
      axios.get(API.forecast + query + API.key).then(res => {
        this.weatherForecast = this.filterData(res.data.list);
        this.dataRecived = true;
      });
    },
    filterData(data) {
      const today = moment().format("YYYY-MM-DD");
      const time = "12:00:00";

      return data
        .filter(
          item => !item.dt_txt.includes(today) && item.dt_txt.includes(time)
        )
        .map(item => ({
          temp: Math.round(item.main.temp),
          icon: item.weather[0].id,
          day: moment(item.dt_txt).format("ddd")
        }));
    }
  },
  beforeMount() {
    this.getCurrentPosition();
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Noto Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(255, 255, 255, 0.9);
}

#app {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #425059;
}
</style>
