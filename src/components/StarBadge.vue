<template>
  <div class="d-flex">
    <v-spacer></v-spacer>
    <div class="d-flex">
      <VectorIcon icon="achievement" :size="size" />
    </div>
    <v-spacer></v-spacer>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import VectorIcon from './VectorIcon.vue';

@Component({
  name: 'StarBadge',
  components: {
    VectorIcon,
  },
})
export default class StarBadge extends Vue {
  @Prop({ default: 400 })
  public size!: number;
}
</script>
