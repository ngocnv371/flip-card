<template>
  <v-card
    class="d-flex"
    :width="size"
    :height="size"
    @click="handleFlip"
    :elevation="10"
  >
    <VectorIcon class="ma-3" :icon="up ? card : 'question-mark'"></VectorIcon>
  </v-card>
</template>

<script lang="ts">
import { animateCSS } from '@/util';
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import VectorIcon from './VectorIcon.vue';

@Component({
  name: 'FlipCard',
  components: {
    VectorIcon,
  },
})
export default class FlipCard extends Vue {
  @Prop({ required: true })
  public card!: string;

  @Prop({ default: false })
  public up!: boolean;

  @Prop({ default: 100 })
  public size!: number;

  public handleFlip() {
    this.$emit('flip', this.card);
  }

  public mounted() {
    this.$el.id = `card-${this.card}-${Math.round(Math.random() * 1000)}`;
  }

  @Watch('up', { immediate: true })
  public onUpChanged() {
    if (!this.$el) {
      return;
    }
    animateCSS('#' + this.$el.id, 'flipInY');
  }
}
</script>
