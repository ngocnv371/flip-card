<template>
  <v-app dark>
    <v-main>
      <Play />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Play from './views/Play.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Play,
  },

  data: () => ({
    //
  }),
});
</script>
