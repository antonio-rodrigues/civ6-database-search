<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Search />
  </div>
</template>

<script>
import Search from './components/Search'

export default {
  name: 'App',
  components: {
    Search
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
  margin: 0;
  padding: 20px;
}
</style>
