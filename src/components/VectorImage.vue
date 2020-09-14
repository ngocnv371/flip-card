<template>
  <v-img :src="url" :width="size" v-on="$listeners" v-bind="$attrs">
    <slot></slot>
  </v-img>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'VectorImage',
})
export default class VectorImage extends Vue {
  @Prop({ required: true })
  public image!: string;

  @Prop({ default: false, type: Boolean })
  public word!: boolean;

  @Prop()
  public size!: number | null;

  public get url() {
    const images = require.context(`../assets/images/`, false, /\.svg$/);
    const words = require.context(`../assets/words/`, false, /\.svg$/);
    return this.word
      ? words(`./${this.image}.svg`)
      : images(`./${this.image}.svg`);
  }
}
</script>
