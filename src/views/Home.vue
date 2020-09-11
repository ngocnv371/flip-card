<template>
  <div class="home d-flex" style="height: 100%">
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
              :width="config.play.size"
              :height="config.play.size"
              color="primary"
              class="animate__animated animate__tada animate__infinite"
              @click="$emit('play')"
            >
              <v-icon :size="config.play.size">mdi-play</v-icon>
            </v-btn>
          </div>
          <div class="d-flex flex secondary-controls">
            <v-btn
              icon
              color="primary"
              x-large
              class="ma-3 animate__animated animate__fadeIn animate__slower"
              :width="config.button.size"
              :height="config.button.size"
            >
              <v-icon>mdi-music</v-icon>
            </v-btn>

            <v-btn
              icon
              color="primary"
              x-large
              class="ma-3 animate__animated animate__fadeIn animate__slower"
              :width="config.button.size"
              :height="config.button.size"
            >
              <v-icon>mdi-information-outline</v-icon>
            </v-btn>

            <v-btn
              icon
              color="primary"
              x-large
              class="ma-3 animate__animated animate__fadeIn animate__slower"
              :width="config.button.size"
              :height="config.button.size"
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
  public configMd = {
    title: {
      icon: {
        size: 100,
      },
      fontSize: '7em',
    },
    play: {
      size: 200,
    },
    button: {
      size: 32,
    },
  };
  public configSm = {
    title: {
      icon: {
        size: 70,
      },
      fontSize: '4em',
    },
    play: {
      size: 120,
    },
    button: {
      size: 32,
    },
  };
  public configXs = {
    title: {
      icon: {
        size: 50,
      },
      fontSize: '3em',
    },
    play: {
      size: 100,
    },
    button: {
      size: 32,
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
