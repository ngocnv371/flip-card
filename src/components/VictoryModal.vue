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
      <StarBadge :score="score" class="pt-5" :size="config.badge.size" />
      <v-card-actions>
        <v-btn
          color="success"
          x-large
          :width="config.home.size"
          :height="config.home.size"
          @click="$emit('end')"
        >
          <v-icon :size="config.home.size">mdi-home</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          x-large
          :width="config.play.size"
          :height="config.play.size"
          @click="resetGame"
        >
          <v-icon :size="config.play.size">mdi-play</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { GameState } from '@/models';
import Vue from 'vue';
import { Component, Model, Watch } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
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

  @State((state: GameState) => state.score)
  public score!: number;

  @Mutation('reset')
  public resetGame!: () => void;

  public localShow = false;
  public configXs = {
    width: 300,
    badge: {
      size: 100,
    },
    home: {
      size: 50,
    },
    play: {
      size: 50,
    },
  };
  public configSm = {
    width: 400,
    badge: {
      size: 200,
    },
    home: {
      size: 100,
    },
    play: {
      size: 100,
    },
  };
  public configMd = {
    width: 800,
    badge: {
      size: 350,
    },
    home: {
      size: 150,
    },
    play: {
      size: 150,
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
