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
  public icon!: string;

  @Prop()
  public size!: number | null;

  public get url() {
    const context = require.context('../assets/icons/', false, /\.svg$/);
    return context(`./${this.icon}.svg`);
  }
}
</script>
