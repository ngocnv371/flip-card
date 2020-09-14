<template>
  <div
    class="view-topics d-flex align-center overflow-y-hidden"
    style="height: 100%"
  >
    <v-btn
      fab
      color="primary"
      fixed
      top
      left
      :width="config.back.size"
      :height="config.back.size"
      @click="$emit('back')"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <div class="d-flex flex text-center">
      <div class="flex d-flex ma-3" v-for="topic of topics" :key="topic.id">
        <v-card
          :width="config.topic.size"
          class="flex d-flex flex-column"
          @click="$emit('play', topic)"
        >
          <VectorImage word :image="topic.icon" class="ma-3 flex" />
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
import { Getter } from 'vuex-class';
import { Topic } from '@/models';
@Component({
  components: {
    VectorImage,
  },
})
export default class Topics extends Vue {
  @Getter('topics')
  public topics!: Topic[];

  public configMd = {
    back: { size: 80 },
    topic: {
      size: 400,
    },
  };
  public configSm = {
    back: { size: 50 },
    topic: {
      size: 250,
    },
  };
  public configXs = {
    back: { size: 40 },
    topic: {
      size: 200,
    },
  };
  public config = this.configMd;

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
