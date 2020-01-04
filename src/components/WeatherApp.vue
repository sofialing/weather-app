<template>
  <main></main>
</template>

<script>
import { WeatherForecast } from "../services/WeatherForecast";

export default {
  name: "WeatherApp",
  data() {
    return {
      forecast: new WeatherForecast()
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
