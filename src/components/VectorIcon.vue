<template>
  <v-img :src="url" :width="size" v-on="$listeners" v-bind="$attrs"></v-img>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'VectorIcon',
})
export default class VectorIcon extends Vue {
  @Prop({ required: true })
  public icon!: string;

  @Prop({ default: 100 })
  public size!: number;

  public get url() {
    const context = require.context('../assets/icons/', false, /\.svg$/);
    return context(`./${this.icon}.svg`);
  }
}
</script>
