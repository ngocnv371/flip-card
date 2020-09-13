<template>
  <v-app dark>
    <v-main>
      <Play
        v-if="mode === 'play'"
        @end="mode = 'home'"
        @back="mode = 'topics'"
      />
      <Topics
        v-else-if="mode === 'topics'"
        @back="mode = 'home'"
        @play="mode = 'play'"
      />
      <Home v-else @play="mode = 'topics'" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from './views/Home.vue';
import Play from './views/Play.vue';
import Topics from './views/Topics.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Topics,
    Home,
    Play,
  },

  data: () => ({
    mode: 'home',
  }),
});
</script>
