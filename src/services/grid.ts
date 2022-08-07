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

/**
 * find all the positions that can be reached from the provided position
 * @param grid the grid
 * @param position the position to calculate
 */
export function calculateLinks(
  grid: string[][],
  position: Position
): Position[] {
  return [];
}

/**
 * find all instances of a word inside a grid
 * @param grid the grid
 * @param word the word to find
 * @returns list of positions
 */
export function findWord(grid: string[][], word: string): Position[] {
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
