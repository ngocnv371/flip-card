<template>
  <div class="d-flex">
    <v-spacer></v-spacer>
    <div class="d-flex">
      <VectorImage icon="achievement" :size="size" />
    </div>
    <v-spacer></v-spacer>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import VectorImage from './VectorImage.vue';

@Component({
  name: 'StarBadge',
  components: {
    VectorImage,
  },
})
export default class StarBadge extends Vue {
  @Prop({ default: 400 })
  public size!: number;
}
</script>
