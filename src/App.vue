<template>
  <div id="app">
    <WeatherApp
      v-if="dataRecived"
      :currentWeather="currentWeather"
      :weatherForecast="weatherForecast"
    />
  </div>
</template>

<script>
import WeatherApp from "./components/WeatherApp.vue";
import axios from "axios";
import moment from "moment";

const API_CURRENT =
  "http://api.openweathermap.org/data/2.5/weather?units=metric";
const API_FORECAST =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric";
const API_KEY = "&APPID=5c6c3b43fd40fea14df38a848bebf667";

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
        this.positionError
      );
    },
    setCurrentPosition(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.getWeatherData(`&lat=${lat}&lon=${lon}`);
    },
    positionError() {
      this.getWeatherData(`&lat=0&lon=0`);
    },
    getWeatherData(query) {
      axios.get(API_CURRENT + query + API_KEY).then(res => {
        this.currentWeather = res.data;
        this.dataRecived = true;
      });
      axios.get(API_FORECAST + query + API_KEY).then(res => {
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
