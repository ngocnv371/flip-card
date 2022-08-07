<template>
  <v-card
    class="d-flex pa-1 pa-md-3"
    :width="size"
    :height="size"
    @click="handleFlip"
    :elevation="10"
  >
    <VectorImage v-show="!up" contain image="question-mark" />
    <VectorImage v-show="up" contain word :image="card" />
  </v-card>
</template>

<script lang="ts">
import { animateCSS } from '@/util';
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import VectorImage from './VectorImage.vue';

@Component({
  name: 'FlipCard',
  components: {
    VectorImage,
  },
})
export default class FlipCard extends Vue {
  @Prop({ required: true })
  public card!: string;

  @Prop({ default: false })
  public up!: boolean;

  @Prop({ default: 100 })
  public size!: number;

  private audio: HTMLAudioElement | null = null;

  public handleFlip() {
    this.$emit('flip', this.card);
  }

  public mounted() {
    this.$el.id = `card-${this.card}-${Math.round(Math.random() * 1000)}`;
    this.audio = new Audio(require(`../assets/pron/${this.card}.mp3`));
  }

  @Watch('up', { immediate: true })
  public onUpChanged() {
    if (!this.$el) {
      return;
    }
    animateCSS('#' + this.$el.id, 'flipInY');
    if (this.audio && this.up) {
      this.audio.play();
    }
  }
}
</script>
