<template>
  <div class="card-grid" v-if="grid">
    <div class="d-flex" v-for="row of grid.rows" :key="`row-${row}`">
      <div class="d-flex pa-1" v-for="col of grid.cols" :key="`col-${col}`">
        <VectorImage
          :word="!!grid.cells[(row - 1) * grid.cols + col - 1]"
          :image="grid.cells[(row - 1) * grid.cols + col - 1] || 'blank'"
          :key="`${(row - 1) * grid.cols + col - 1}`"
          :size="100"
          @click="onSelectCard((row - 1) * grid.cols + col - 1)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.reachable {
  border: 1px solid lightgreen;
}
</style>

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

  private generateWordPool(words: string[]) {
    const bucket: string[] = [];
    const num = (this._rows - 1) * (this.cols - 1);
    for (let i = 0; i < Math.floor(num / 2); i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      bucket.push(words[randomIndex]);
      // HACK: pretend that half of them is empty (already solved)
      bucket.push('');
    }
    bucket.sort(() => Math.random() - Math.random());
    return bucket;
  }

  private generateCells(words: string[]) {
    const pool = this.generateWordPool(words);
    this._cells = [];
    for (let i = 0; i < this.cols; i++) {
      this._cells.push('');
    }
    for (let row = 1; row < this.rows - 1; row++) {
      this._cells.push('');
      for (let col = 1; col < this.cols - 1; col++) {
        const word = pool.pop();
        if (word === undefined) {
          return;
        }
        this._cells.push(word);
      }
      this._cells.push('');
    }
    for (let i = 0; i < this.cols; i++) {
      this._cells.push('');
    }
  }

  private getPosition(index: number): Position {
    return {
      col: index % this._cols,
      row: Math.floor(index / this._cols),
    };
  }

  private getIndex(position: Position) {
    return position.row * this._cols + position.col;
  }

  private getValue(position: Position): string {
    if (this.isOutOfBound(position)) {
      return '';
    }
    return this.cells[this.getIndex(position)];
  }

  public select(index: number) {
    this._selectedIndex = index;
  }

  private marchUp(position: Position, depth = 3): Position[] {
    if (!depth) {
      return [];
    }
    const bucket = [];
    let up = this.up(position);
    while (!this.getValue(up) && !this.isOutOfBound(up)) {
      bucket.push(...this.marchLeft(up, depth - 1));
      bucket.push(...this.marchRight(up, depth - 1));
      up = this.up(up);
    }
    if (this.getValue(up)) {
      bucket.push(up);
    }
    return bucket;
  }

  private marchDown(position: Position, depth = 3): Position[] {
    if (!depth) {
      return [];
    }
    const bucket = [];
    let down = this.down(position);
    while (!this.getValue(down) && !this.isOutOfBound(down)) {
      bucket.push(...this.marchLeft(down, depth - 1));
      bucket.push(...this.marchRight(down, depth - 1));
      down = this.down(down);
    }
    if (this.getValue(down)) {
      bucket.push(down);
    }
    return bucket;
  }

  private marchLeft(position: Position, depth = 3): Position[] {
    if (!depth) {
      return [];
    }
    const bucket = [];
    let left = this.left(position);
    while (!this.getValue(left) && !this.isOutOfBound(left)) {
      bucket.push(...this.marchUp(left, depth - 1));
      bucket.push(...this.marchDown(left, depth - 1));
      left = this.right(left);
    }
    if (this.getValue(left)) {
      bucket.push(left);
    }
    return bucket;
  }

  private marchRight(position: Position, depth = 3): Position[] {
    if (!depth) {
      return [];
    }
    const bucket = [];
    let right = this.right(position);
    while (!this.getValue(right) && !this.isOutOfBound(right)) {
      bucket.push(...this.marchUp(right, depth - 1));
      bucket.push(...this.marchDown(right, depth - 1));
      right = this.right(right);
    }
    if (this.getValue(right)) {
      bucket.push(right);
    }
    return bucket;
  }

  public getReachableCells(): number[] {
    if (this._selectedIndex < 0) {
      return [];
    }

    const targets = [];
    const position = this.getPosition(this._selectedIndex);
    // from selected position
    // march up
    targets.push(...this.marchUp(position));
    // march down
    targets.push(...this.marchDown(position));
    // march left
    targets.push(...this.marchLeft(position));
    // march right
    targets.push(...this.marchRight(position));
    return targets
      .filter(t => !this.isOutOfBound(t))
      .map(t => this.getIndex(t))
      .sort();
  }

  private isOutOfBound(position: Position) {
    return (
      position.col < 0 ||
      position.col >= this.cols ||
      position.row < 0 ||
      position.row >= this.rows
    );
  }

  private up(position: Position): Position {
    return {
      ...position,
      row: position.row - 1,
    };
  }

  private down(position: Position): Position {
    return {
      ...position,
      row: position.row + 1,
    };
  }

  private left(position: Position): Position {
    return {
      ...position,
      col: position.col - 1,
    };
  }

  private right(position: Position): Position {
    return {
      ...position,
      col: position.col + 1,
    };
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

  public reachableCells: number[] = [];

  public created() {
    const topicIndex = 0;
    const words = this.topics[topicIndex].words;
    this.grid = new Grid(7, 10, words);
  }

  @Watch('selectedCardIndex')
  public onSelectCard(index: number) {
    if (!this.grid) {
      return;
    }
    this.grid.select(index);
    console.log('click: ' + index);
    this.reachableCells.length = 0;
    this.reachableCells.push(...this.grid.getReachableCells());
  }

  reachable(index: number) {
    if (!this.grid) {
      return false;
    }
    return this.reachableCells.includes(index);
  }
}
</script>
