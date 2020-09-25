<template>
  <v-app dark>
    <v-main>
      <Play
        v-if="mode === 'play'"
        @end="mode = 'home'"
        @back="mode = 'topics'"
      />
      <Link v-else-if="mode === 'link'" />
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
import Link from './views/Link.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Link,
    Topics,
    Home,
    Play,
  },

  data: () => ({
    mode: 'link',
  }),

  methods: {
    ...mapActions(['start']),
    async startPlay(topic: Topic) {
      await this.start(topic);
      this.mode = 'play';
    },
  },

  created: () => {
    screen.orientation.lock('landscape');
  },
});
</script>
