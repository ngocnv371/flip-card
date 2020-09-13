<template>
  <div
    class="view-topics d-flex align-center overflow-y-hidden"
    style="height: 100%"
  >
    <div class="d-flex flex text-center">
      <div class="flex d-flex ma-3" v-for="topic of topics" :key="topic.name">
        <v-card
          :width="config.topic.size"
          class="flex d-flex flex-column"
          @click="$emit('play', topic)"
        >
          <VectorImage :icon="topic.icon" class="ma-3 flex" />
          <v-card-title class="d-flex">
            <h1 class="flex">{{ topic.name }}</h1>
          </v-card-title>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VectorImage from '../components/VectorImage.vue';

@Component({
  components: {
    VectorImage,
  },
})
export default class Topics extends Vue {
  public configMd = {
    topic: {
      size: 300,
    },
  };
  public configSm = {
    topic: {
      size: 200,
    },
  };
  public configXs = {
    topic: {
      size: 100,
    },
  };
  public config = this.configMd;

  public topics = [
    {
      icon: 'dolphin',
      name: 'Animals',
    },
    {
      icon: 'cake',
      name: 'Food',
    },
    {
      icon: 'orange',
      name: 'Fruits',
    },
    {
      icon: 'orange',
      name: 'Fruits 2',
    },
    {
      icon: 'orange',
      name: 'Fruits 3',
    },
    {
      icon: 'orange',
      name: 'Fruits 4',
    },
    {
      icon: 'orange',
      name: 'Fruits 5',
    },
    {
      icon: 'orange',
      name: 'Fruits 6',
    },
  ];

  public mounted() {
    this.resolveConfig();
  }

  private resolveConfig() {
    if (this.$vuetify.breakpoint.xsOnly) {
      this.config = this.configXs;
    } else if (this.$vuetify.breakpoint.smOnly) {
      this.config = this.configSm;
    } else if (this.$vuetify.breakpoint.mdAndUp) {
      this.config = this.configMd;
    }
  }
}
</script>
