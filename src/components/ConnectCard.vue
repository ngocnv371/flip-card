<template>
  <v-card
    flat
    :color="(selected && 'success') || (reachable && 'blue') || ''"
    :outlined="outlined"
    @mouseover="$emit('hover')"
  >
    <VectorImage
      size="100"
      :word="!!value"
      :image="value || 'blank'"
      @click="$emit('click', index)"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import VectorImage from './VectorImage.vue';

@Component({
  name: 'ConnectCard',
  components: {
    VectorImage,
  },
})
export default class ConnectCard extends Vue {
  @Prop({ required: true })
  public value!: string;

  @Prop({ required: true })
  public index!: number;

  @Prop({ default: false })
  public selected!: boolean;

  @Prop({ default: false })
  public reachable!: boolean;

  @Prop({ default: false })
  public outlined!: boolean;
}
</script>
