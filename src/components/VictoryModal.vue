<template>
  <v-dialog v-model="localShow" width="500" persistent>
    <v-card class="text-center">
      <v-card-title>
        <h3 class="flex title text-center">Victory!</h3>
      </v-card-title>
      <v-card-text>You fucking win!</v-card-text>
      <v-card-text>
        <h1 class="headline">{{ score }}</h1>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="resetGame">Again</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { GameState } from '@/models';
import Vue from 'vue';
import { Component, Model, Watch } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

@Component({
  name: 'FlipCard',
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
