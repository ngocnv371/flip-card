<template>
  <v-app dark>
    <v-main>
      <Play v-if="mode === 'play'" @end="mode = 'home'" />
      <Home v-else @play="mode = 'play'" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from './views/Home.vue';
import Play from './views/Play.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Home,
    Play,
  },

  data: () => ({
    mode: 'home',
  }),
});
</script>
