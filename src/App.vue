<template>
  <ListLayout />
</template>

<script>
import ListLayout from './components/ListLayout'

export default {
  name: 'App',
  components: {
    ListLayout
  },
  provide() {
    return {
      baseUrl: 'http://www.omdbapi.com/?i='
    }
  },
}
</script>

<style>
/* #movie-app {
} */
</style>
