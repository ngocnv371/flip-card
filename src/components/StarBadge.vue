<template>
  <div class="d-flex">
    <v-spacer></v-spacer>
    <div class="d-flex">
      <v-img :src="achievementSvgUrl" width="400"></v-img>
    </div>
    <v-spacer></v-spacer>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'StarBadge',
})
export default class StarBadge extends Vue {
  @Prop({ required: true })
  public score!: number;

  public get achievementSvgUrl() {
    const images = require.context('../assets/', false, /\.svg$/);
    return images('./achievement.svg');
  }
}
</script>
