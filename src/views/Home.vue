<template>
  <div class="home d-flex" style="height: 100%" v-resize="onResize">
    <div class="d-flex flex text-center">
      <v-spacer></v-spacer>
      <div class="d-flex flex-column">
        <v-spacer></v-spacer>
        <div class="d-flex align-center flex-column">
          <div class="d-flex flex scene-title">
            <h1
              class="animate__animated animate__flipInY"
              style="font-size: 7em"
              :style="{ fontSize: config.title.fontSize }"
            >
              <VectorIcon
                class="d-inline-block"
                icon="baby"
                :size="config.title.icon.size"
              />
              Baby Flip
            </h1>
          </div>
          <div class="flex primary-controls">
            <v-btn
              icon
              :width="config.primaryControls.play.size"
              :height="config.primaryControls.play.size"
              color="primary"
              class="animate__animated animate__tada animate__infinite"
              @click="$emit('play')"
            >
              <v-icon :size="config.primaryControls.play.size">mdi-play</v-icon>
            </v-btn>
          </div>
          <div class="d-flex flex secondary-controls">
            <v-btn
              icon
              color="primary"
              x-large
              class="animate__animated animate__fadeIn animate__slower"
            >
              <v-icon>mdi-music</v-icon>
            </v-btn>

            <v-btn
              icon
              color="primary"
              x-large
              class="animate__animated animate__fadeIn animate__slower"
            >
              <v-icon>mdi-information-outline</v-icon>
            </v-btn>

            <v-btn
              icon
              color="primary"
              x-large
              class="animate__animated animate__fadeIn animate__slower"
            >
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
          </div>
        </div>
        <v-spacer></v-spacer>
      </div>
      <v-spacer></v-spacer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VectorIcon from '../components/VectorIcon.vue';

@Component({
  components: {
    VectorIcon,
  },
})
export default class Home extends Vue {
  public config = {
    title: {
      icon: {
        size: 100,
      },
      fontSize: '7em',
    },
    primaryControls: {
      play: {
        size: 200,
      },
    },
    secondaryControls: {
      music: {
        size: 32,
      },
      info: {
        size: 32,
      },
      facebook: {
        size: 32,
      },
    },
  };

  public mounted() {
    this.resolveConfig();
  }

  private resolveConfig() {
    console.log('new breakpoint detected ' + this.$vuetify.breakpoint.name);
    if (this.$vuetify.breakpoint.xsOnly) {
      this.config.title.icon.size = 50;
      this.config.title.fontSize = '3em';
      this.config.primaryControls.play.size = 100;
    } else if (this.$vuetify.breakpoint.smOnly) {
      this.config.title.icon.size = 70;
      this.config.title.fontSize = '4em';
      this.config.primaryControls.play.size = 120;
    } else if (this.$vuetify.breakpoint.mdAndUp) {
      this.config.title.icon.size = 100;
      this.config.title.fontSize = '7em';
      this.config.primaryControls.play.size = 200;
    }
  }

  public onResize() {
    this.resolveConfig();
  }
}
</script>
