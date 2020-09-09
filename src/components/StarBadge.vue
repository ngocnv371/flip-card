<template>
  <div class="d-flex">
    <v-spacer></v-spacer>
    <div class="d-flex">
      <div class="flex">
        <v-icon color="amber" size="xxx-large">mdi-star</v-icon>
      </div>
      <div class="flex">
        <v-icon color="amber" size="xxx-large">mdi-star-half</v-icon>
      </div>
      <div class="flex">
        <v-icon color="amber" size="xxx-large">mdi-star-outline</v-icon>
      </div>
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
}
</script>
