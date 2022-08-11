/**
 * Generate a grid from the provided words. There's always an even number of words.
 * @param width number of columns
 * @param height number of rows
 * @param words the list of all usable words
 * @returns a grid of words
 */
export function generateGrid(
  width: number,
  height: number,
  words: string[]
): string[][] {
  function createPool(length: number, words: string[]) {
    const bag = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      bag.push(words[randomIndex]);
    }
    return bag;
  }

  const numCells = (width - 2) * (height - 2);
  const numWords = Math.floor(numCells / 2);
  const pool = createPool(numWords, words).sort(() => Math.random() - 0.5);
  const grid: string[][] = [];

  // first empty row
  grid.push(Array<string>(width).fill(''));
  for (let row = 0; row < height - 2; row++) {
    const r: string[] = [];
    // empty first column
    r.push('');
    for (let col = 1; col < width - 2; col++) {
      const w = pool.pop();
      if (w) {
        r.push(w);
      } else {
        r.push('');
      }
    }
    // empty last column
    r.push('');
    grid.push(r);
  }
  // last empty row
  grid.push(Array<string>(width).fill(''));

  return grid;
}

interface Position {
  col: number;
  row: number;
}

export type Grid = string[][];

export function getWordAt(grid: Grid, position: Position): string {
  const row = grid[position.row];
  const col = row[position.col];
  return col;
}

export function isTransparent(grid: Grid, position: Position): boolean {
  const word = getWordAt(grid, position);

  return ['', '', null].includes(word);
}

export function canConnect(grid: Grid, from: Position, to: Position): boolean {
  console.log('grid');
  console.table(grid);
  if (getWordAt(grid, from) != getWordAt(grid, to)) {
    console.log('different word');
    return false;
  }

  const LEFT: Position = { col: -1, row: 0 };
  const RIGHT: Position = { col: 1, row: 0 };
  const UP: Position = { col: 0, row: -1 };
  const DOWN: Position = { col: 0, row: 1 };

  function inbound(position: Position): boolean {
    return !(
      position.col < 0 ||
      position.row < 0 ||
      position.row > grid.length - 1 ||
      position.col > grid[0].length - 1
    );
  }

  function march(from: Position, direction: Position): Position[] {
    const hits: Position[] = [];
    let next = from;
    do {
      next = { col: next.col + direction.col, row: next.row + direction.row };
      if (inbound(next)) {
        hits.push(next);
      }
    } while (inbound(next) && isTransparent(grid, next));
    return hits;
  }

  function getAreaOfEffect(position: Position): Position[] {
    return [
      ...march(position, LEFT),
      ...march(position, RIGHT),
      ...march(position, UP),
      ...march(position, DOWN),
    ];
  }

  const area1 = getAreaOfEffect(from);
  console.log('area1');
  console.table(area1);
  const area2 = getAreaOfEffect(to);
  console.log('area2');
  console.table(area2);

  // check intersection
  const intersected = area2.find(p =>
    area1.some(px => px.col === p.col && px.row === p.row)
  );
  if (intersected) {
    return true;
  }

  // check if anything from area1 have a straight shot at anything in area2
  const exploded1 = area1.flatMap(p => getAreaOfEffect(p));
  console.log('exploded1');
  console.table(exploded1);
  const hit = area2.find(p =>
    area1.some(px => px.col === p.col && px.row === p.row)
  );
  console.log('hit', hit);

  return !!hit;
}

/**
 * find all instances of a word inside a grid
 * @param grid the grid
 * @param word the word to find
 * @returns list of positions
 */
export function findWord(grid: Grid, word: string): Position[] {
  const bag: Position[] = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === word) {
        bag.push({
          row,
          col,
        });
      }
    }
  }
  return bag;
}
