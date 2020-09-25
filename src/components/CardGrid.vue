<template>
  <div class="card-grid">
    <div class="d-flex" v-for="row of rows" :key="`row-${row}`">
      <div class="d-flex pa-1" v-for="col of cols" :key="`col-${col}`">
        <VectorImage
          :word="true"
          :image="cards[(row - 1) * cols + col - 1]"
          :key="`card-${cards[(row - 1) * cols + col - 1]}`"
          :size="100"
          @flip="flip((row - 1) * cols + col - 1)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import VectorImage from './VectorImage.vue';
import { Getter } from 'vuex-class';
import { Topic } from '@/models';

@Component({
  name: 'CardGrid',
  components: {
    VectorImage,
  },
})
export default class CardGrid extends Vue {
  @Getter('topics')
  public topics!: Topic[];

  public rows = 0;
  public cols = 0;
  public cards: string[] = [];

  public created() {
    const topicIndex = 0;
    const words = this.topics[topicIndex].words;
    this.rows = 5;
    this.cols = 8;
    this.cards = [];
    for (let i = 0; i < Math.floor((this.rows * this.cols) / 2); i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      this.cards.push(words[randomIndex]);
      this.cards.push(words[randomIndex]);
    }
    this.cards.sort(() => Math.random() - Math.random());
  }
}
</script>
