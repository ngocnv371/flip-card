<template>
  <div class="card-grid" v-if="grid">
    <div class="d-flex" v-for="row of grid.rows" :key="`row-${row}`">
      <div class="d-flex pa-1" v-for="col of grid.cols" :key="`col-${col}`">
        <ConnectCard
          :value="grid.cells[(row - 1) * grid.cols + col - 1]"
          :index="(row - 1) * grid.cols + col - 1"
          :key="(row - 1) * grid.cols + col - 1"
          :selected="isSelected((row - 1) * grid.cols + col - 1)"
          :reachable="isReachable((row - 1) * grid.cols + col - 1)"
          :outlined="isHistory((row - 1) * grid.cols + col - 1)"
          @click="onSelectCard"
          @hover="onCardHover((row - 1) * grid.cols + col - 1)"
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
import ConnectCard from './ConnectCard.vue';
import { Getter } from 'vuex-class';
import { Topic } from '@/models';

interface Position {
  col: number;
  row: number;
}

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function getPropagationDirections(direction: Direction): Direction[] {
  switch (direction) {
    case Direction.Up:
    case Direction.Down:
      return [Direction.Left, Direction.Right];
    case Direction.Left:
    case Direction.Right:
      return [Direction.Up, Direction.Down];
  }
  throw new Error('Invalid direction');
}

interface Path {
  from: Position;
  to: Position;
  trails: Position[];
}

class Grid {
  private _rows = 0;
  private _cols = 0;
  private _cells: string[] = [];
  private _selectedIndex = -1;
  private _paths: Path[] = [];
  private _history: { [key: number]: number } = {};
  private _historyDepth: { [key: number]: number } = {};

  public get rows() {
    return this._rows;
  }

  public get cols() {
    return this._cols;
  }

  public get cells() {
    return this._cells;
  }

  public get selectedIndex() {
    return this._selectedIndex;
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
    this._paths = [];
    this._history = {};
    this._historyDepth = {};
    const position = this.getPosition(this._selectedIndex);
    // from selected position
    // march up
    const targets = [];
    targets.push(...this.march(position, Direction.Up, [position]));
    // march down
    targets.push(...this.march(position, Direction.Down, [position]));
    // march left
    targets.push(...this.march(position, Direction.Left, [position]));
    // march right
    targets.push(...this.march(position, Direction.Right, [position]));
    this._paths = targets.filter(t => !this.isOutOfBound(t.to)).sort();
  }

  private getAdjacent(from: Position, direction: Direction): Position {
    switch (direction) {
      case Direction.Up:
        return {
          ...from,
          row: from.row - 1,
        };
      case Direction.Down:
        return {
          ...from,
          row: from.row + 1,
        };
      case Direction.Left:
        return {
          ...from,
          col: from.col - 1,
        };
      case Direction.Right:
        return {
          ...from,
          col: from.col + 1,
        };
    }
    throw new Error('Invalid direction');
  }

  private march(
    from: Position,
    direction: Direction,
    trails: Position[],
    depth = 3
  ): Path[] {
    if (!depth) {
      return [];
    }
    const paths: Path[] = [];
    let current = this.getAdjacent(from, direction);
    // skip all blank cells
    while (!this.getValue(current) && !this.isOutOfBound(current)) {
      // propagate
      const dirs = getPropagationDirections(direction);
      dirs.forEach(d => {
        const results = this.march(current, d, [...trails, current], depth - 1);
        paths.push(...results);
      });
      current = this.getAdjacent(current, direction);
    }
    // touched a valid cell?
    if (this.getValue(current)) {
      paths.push({
        from,
        to: current,
        trails: [...trails, current],
      });
    }
    return paths;
  }

  private setHistory(d: Position, s: Position, depth: number) {
    const dest = this.getIndex(d);
    const src = this.getIndex(s);
    if (!this._historyDepth[dest]) {
      this._historyDepth[dest] = depth;
      this._history[dest] = src;
    }
  }

  public getReachableCells(): number[] {
    if (this._selectedIndex < 0) {
      return [];
    }

    return this._paths
      .filter(t => !this.isOutOfBound(t.to))
      .map(t => this.getIndex(t.to))
      .sort();
  }

  public getHistory(index: number) {
    const relevantPaths = this._paths
      .filter(p => this.getIndex(p.to) === index)
      .sort((a, b) => a.trails.length - b.trails.length);
    if (!relevantPaths.length) {
      return [];
    }
    return relevantPaths[0].trails.map(t => this.getIndex(t));
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
    ConnectCard,
  },
})
export default class CardGrid extends Vue {
  @Getter('topics')
  public topics!: Topic[];

  public grid: Grid | null = null;

  public reachableCells: number[] = [];
  public history: number[] = [];

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

  isReachable(index: number) {
    return this.reachableCells.includes(index);
  }

  isHistory(index: number) {
    return this.history.includes(index);
  }

  onCardHover(index: number) {
    if (!this.grid) {
      return;
    }
    this.history.length = 0;
    this.history.push(...this.grid.getHistory(index));
  }

  isSelected(index: number) {
    return index === this.grid?.selectedIndex;
  }
}
</script>
