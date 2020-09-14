<template>
  <v-dialog
    v-model="localShow"
    :width="config.width"
    persistent
    content-class="elevation-0 overflow-hidden"
    overlay-opacity="0.8"
  >
    <v-card
      class="text-center"
      flat
      style="background: transparent !important;"
    >
      <StarBadge class="pt-5" :size="config.badge.size" />
      <v-card-actions>
        <v-btn
          color="success"
          fab
          :width="config.home.size"
          :height="config.home.size"
          @click="$emit('end')"
        >
          <v-icon :size="config.home.icon.size">mdi-home</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          fab
          class="animate__animated animate__tada animate__infinite"
          :width="config.play.size"
          :height="config.play.size"
          @click="$emit('play')"
        >
          <v-icon :size="config.play.icon.size">mdi-play</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Model, Prop, Watch } from 'vue-property-decorator';
import StarBadge from './StarBadge.vue';

@Component({
  name: 'VictoryModal',
  components: {
    StarBadge,
  },
})
export default class VictoryModal extends Vue {
  @Model('input')
  public show!: boolean;

  public localShow = false;
  public configXs = {
    width: 300,
    badge: {
      size: 100,
    },
    home: {
      size: 50,
      icon: {
        size: 40,
      },
    },
    play: {
      size: 50,
      icon: {
        size: 40,
      },
    },
  };
  public configSm = {
    width: 400,
    badge: {
      size: 180,
    },
    home: {
      size: 80,
      icon: {
        size: 60,
      },
    },
    play: {
      size: 80,
      icon: {
        size: 60,
      },
    },
  };
  public configMd = {
    width: 800,
    badge: {
      size: 350,
    },
    home: {
      size: 150,
      icon: {
        size: 110,
      },
    },
    play: {
      size: 150,
      icon: {
        size: 110,
      },
    },
  };
  public config = this.configMd;

  @Watch('show', { immediate: true })
  public onShowChanged() {
    if (this.show != this.localShow) {
      this.localShow = this.show;
    }
  }

  @Watch('localShow', { immediate: true })
  public onLocalShowChanged() {
    if (this.show != this.localShow) {
      this.$emit('input', this.localShow);
    }
  }

  public mounted() {
    this.resolveConfig();
  }

  private resolveConfig() {
    if (this.$vuetify.breakpoint.smOnly) {
      this.config = this.configSm;
    } else if (this.$vuetify.breakpoint.mdAndUp) {
      this.config = this.configMd;
    } else if (this.$vuetify.breakpoint.xsOnly) {
      this.config = this.configXs;
    }
  }
}
</script>
