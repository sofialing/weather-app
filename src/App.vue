<template>
  <div id="app">
    <WeatherApp />
  </div>
</template>

<script>
import WeatherApp from "./components/WeatherApp.vue";

export default {
  name: "app",
  components: {
    WeatherApp
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
