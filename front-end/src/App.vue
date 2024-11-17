<template>
  <Navbar />
  <router-view />
  <h5 class="version-text">Version: {{ version }}</h5>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: { Navbar },
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
    };
  },
};
</script>

<style>
body {
  background: #f2f2f2;
}
#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  max-width: 600px;
  margin: 0 auto;
  color: #555;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>

<style>
.version-text {
  position: fixed;
  bottom: 2px;
  left: 10px;
  color: #555;
  font-size: 15px;
  font-weight: bold;
}
</style>
