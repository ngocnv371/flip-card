<template>
  <v-card width="200" @click="handleFlip">
    <v-img :src="up ? imageUrl : backImageUrl"></v-img>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'FlipCard',
})
export default class FlipCard extends Vue {
  @Prop({ required: true })
  public letter!: string;

  @Prop({ default: false })
  public up!: boolean;

  public get imageUrl() {
    const images = require.context('../assets/cards/', false, /\.png$/);
    return images('./' + this.letter + '.png');
  }

  public get backImageUrl() {
    const images = require.context('../assets/cards/', false, /\.png$/);
    return images('./back.png');
  }

  public handleFlip() {
    this.$emit('flip', this.letter);
  }
}
</script>
