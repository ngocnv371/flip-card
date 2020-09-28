<template>
  <div class="card-grid" v-if="grid">
    <div class="d-flex" v-for="row of grid.rows" :key="`row-${row}`">
      <div class="d-flex pa-1" v-for="col of grid.cols" :key="`col-${col}`">
        <VectorImage
          :word="true"
          :image="grid.cells[(row - 1) * grid.cols + col - 1]"
          :key="`card-${grid.cells[(row - 1) * grid.cols + col - 1]}`"
          :size="100"
          @click="onSelectCard((row - 1) * grid.cols + col - 1)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import VectorImage from './VectorImage.vue';
import { Getter } from 'vuex-class';
import { Topic } from '@/models';

interface Position {
  col: number;
  row: number;
}

class Grid {
  private _rows = 0;
  private _cols = 0;
  private _cells: string[] = [];
  private _selectedIndex = -1;

  public get rows() {
    return this._rows;
  }

  public get cols() {
    return this._cols;
  }

  public get cells() {
    return this._cells;
  }

  constructor(_rows: number, _cols: number, words: string[]) {
    this._rows = _rows;
    this._cols = _cols;
    this.generateCells(words);
  }

  private generateCells(words: string[]) {
    this._cells = [];
    for (let i = 0; i < Math.floor((this._rows * this._cols) / 2); i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      this._cells.push(words[randomIndex]);
      this._cells.push(words[randomIndex]);
    }
    this._cells.sort(() => Math.random() - Math.random());
  }

  private getPosition(index: number): Position {
    return {
      row: index % this._cols,
      col: Math.floor(index / this._cols),
    };
  }

  private getIndex(position: Position) {
    return position.row * this._cols + position.col;
  }

  public select(index: number) {
    this._selectedIndex = index;
  }

  public get reachableCells() {
    return 0;
  }
}

@Component({
  name: 'CardGrid',
  components: {
    VectorImage,
  },
})
export default class CardGrid extends Vue {
  @Getter('topics')
  public topics!: Topic[];

  public grid: Grid | null = null;

  public created() {
    const topicIndex = 0;
    const words = this.topics[topicIndex].words;
    this.grid = new Grid(5, 8, words);
  }

  @Watch('selectedCardIndex')
  public onSelectCard(index: number) {
    if (!this.grid) {
      return;
    }
    this.grid.select(index);
  }
}
</script>
