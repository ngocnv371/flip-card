<template>
  <v-app dark>
    <v-main>
      <Play
        v-if="mode === 'play'"
        :data="level"
        @end="mode = 'home'"
        @back="mode = 'topics'"
      />
      <Topics
        v-else-if="mode === 'topics'"
        @back="mode = 'home'"
        @play="startPlay"
      />
      <Home v-else @play="mode = 'topics'" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Topic } from './models';
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
    level: null,
  }),

  methods: {
    ...mapActions(['start']),
    async startPlay(topic: Topic) {
      this.level = await this.start(topic);
      this.mode = 'play';
    },
  },
});
</script>
