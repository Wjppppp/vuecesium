<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import MyEarth from "./components/MyEarth.vue"
import AirCityEarth from "./components/AirCityEarth.vue"
export default {
  name: 'App',
  components:{
    'MyEarth': MyEarth,
    'AirCityEarth': AirCityEarth,
    //'MyButton': MyButton,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  width: 100%;
  height: 100%;
}
</style>
