<template>
  <div id="app">
    {{getCount}}
    <router-view/>

  </div>
</template>

<script>
import {mapGetters} from 'Vuex'
export default {
  name: 'App',

  computed: {
    ...mapGetters({
      getCount: 'getCount'
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
