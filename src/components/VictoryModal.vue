<template>
  <v-dialog
    v-model="localShow"
    width="800"
    persistent
    content-class="elevation-0"
    overlay-opacity="0.8"
  >
    <v-card
      class="text-center"
      flat
      style="background: transparent !important;"
    >
      <StarBadge :score="score" class="pt-5" />
      <v-card-actions>
        <v-btn
          color="success"
          x-large
          width="150"
          height="150"
          @click="resetGame"
        >
          <v-icon size="100">mdi-home</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          x-large
          width="150"
          height="150"
          @click="resetGame"
        >
          <v-icon size="120">mdi-play</v-icon>
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
  name: 'FlipCard',
  components: {
    StarBadge,
  },
})
export default class FlipCard extends Vue {
  @Model('input')
  public show!: boolean;

  @State((state: GameState) => state.score)
  public score!: number;

  @Mutation('reset')
  public resetGame!: () => void;

  public localShow = false;

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
}
</script>
