import { canConnect, findWord, generateGrid } from './grid';

describe('generateGrid', () => {
  test('4x4', () => {
    const grid = generateGrid(4, 4, ['a', 'b', 'c', 'd']);
    expect(grid.length).toBe(4);
    expect(grid[0].length).toBe(4);
  });
  test('6x6', () => {
    const grid = generateGrid(6, 6, ['a', 'b', 'c', 'd']);
    expect(grid.length).toBe(6);
    expect(grid[0].length).toBe(6);
  });
});

describe('findWord', () => {
  test('4x4 can find 2 words', () => {
    const grid = [
      ['', '', '', ''],
      ['', 'a', 'b', ''],
      ['', 'a', 'b', ''],
      ['', '', '', ''],
    ];
    expect(findWord(grid, 'a')).toEqual([
      { col: 1, row: 1 },
      { col: 1, row: 2 },
    ]);
    expect(findWord(grid, 'b')).toEqual([
      { col: 2, row: 1 },
      { col: 2, row: 2 },
    ]);
    expect(findWord(grid, 'c')).toEqual([]);
  });

  test('4x4 can find 1 words', () => {
    const grid = [
      ['', '', '', ''],
      ['', 'a', 'a', ''],
      ['', 'a', 'a', ''],
      ['', '', '', ''],
    ];
    expect(findWord(grid, 'a')).toEqual([
      { col: 1, row: 1 },
      { col: 2, row: 1 },
      { col: 1, row: 2 },
      { col: 2, row: 2 },
    ]);
    expect(findWord(grid, 'c')).toEqual([]);
  });

  test('7x7 can find words', () => {
    const grid = [
      ['', '', '', '', '', '', ''],
      ['', 'a', '', 'b', '', '', ''],
      ['', '', '', 'a', 'b', '', ''],
      ['', '', '', '', 'd', '', ''],
      ['', '', 'e', 'd', '', 'c', ''],
      ['', '', '', 'e', 'c', '', ''],
      ['', '', '', '', '', '', ''],
    ];
    expect(findWord(grid, 'a')).toEqual([
      { col: 1, row: 1 },
      { col: 3, row: 2 },
    ]);
    expect(findWord(grid, 'b')).toEqual([
      { col: 3, row: 1 },
      { col: 4, row: 2 },
    ]);
    expect(findWord(grid, 'c')).toEqual([
      { col: 5, row: 4 },
      { col: 4, row: 5 },
    ]);
    expect(findWord(grid, 'd')).toEqual([
      { col: 4, row: 3 },
      { col: 3, row: 4 },
    ]);
    expect(findWord(grid, 'e')).toEqual([
      { col: 2, row: 4 },
      { col: 3, row: 5 },
    ]);
    expect(findWord(grid, 'f')).toEqual([]);
  });
});

describe('canConnect', () => {
  test('7x7, one turn', () => {
    const grid = [
      ['', '', '', '', '', '', ''],
      ['', 'a', '', 'b', '', '', ''],
      ['', '', '', 'a', 'b', '', ''],
      ['', '', '', '', 'd', '', ''],
      ['', '', 'e', 'd', '', 'c', ''],
      ['', '', '', 'e', 'c', '', ''],
      ['', '', '', '', '', '', ''],
    ];
    // true
    const p1 = findWord(grid, 'a');
    expect(canConnect(grid, p1[0], p1[1])).toBe(true);
    expect(canConnect(grid, p1[1], p1[0])).toBe(true);
    const p2 = findWord(grid, 'b');
    expect(canConnect(grid, p2[0], p2[1])).toBe(true);
    expect(canConnect(grid, p2[1], p2[0])).toBe(true);
    const p3 = findWord(grid, 'c');
    expect(canConnect(grid, p3[0], p3[1])).toBe(true);
    expect(canConnect(grid, p3[1], p3[0])).toBe(true);
    const p4 = findWord(grid, 'd');
    expect(canConnect(grid, p4[0], p4[1])).toBe(true);
    expect(canConnect(grid, p4[1], p4[0])).toBe(true);
    const p5 = findWord(grid, 'e');
    expect(canConnect(grid, p5[0], p5[1])).toBe(true);
    expect(canConnect(grid, p5[1], p5[0])).toBe(true);
    // wrong words
    expect(canConnect(grid, p1[0], p2[1])).toBe(false);
    expect(canConnect(grid, p1[1], p2[0])).toBe(false);
  });
  test('easy, two turns', () => {
    const grid = [
      ['', '', '', '', '', '', ''],
      ['', 'a', '', 'b', 'a', '', ''],
      ['', '', '', 'x', 'x', '', ''],
      ['', '', 'c', '', 'x', '', ''],
      ['', '', 'x', 'x', 'b', 'x', ''],
      ['', '', 'c', 'x', 'x', '', ''],
      ['', '', '', '', '', '', ''],
    ];
    const p1 = findWord(grid, 'a');
    expect(canConnect(grid, p1[0], p1[1])).toBe(true);
    expect(canConnect(grid, p1[1], p1[0])).toBe(true);
    const p2 = findWord(grid, 'b');
    expect(canConnect(grid, p2[0], p2[1])).toBe(false);
    expect(canConnect(grid, p2[1], p2[0])).toBe(false);
    const p3 = findWord(grid, 'c');
    expect(canConnect(grid, p3[0], p3[1])).toBe(true);
    expect(canConnect(grid, p3[1], p3[0])).toBe(true);
  });
  test('can not, two turns', () => {
    const grid = [
      ['', '', '', '', '', '', ''],
      ['', 'x', 'x', 'b', 'a', '', ''],
      ['', 'c', 'a', 'x', 'x', '', ''],
      ['', '', '', '', 'x', '', ''],
      ['', '', 'x', 'x', 'b', 'x', ''],
      ['', 'c', '', 'x', 'x', '', ''],
      ['', '', '', '', '', '', ''],
    ];
    const p1 = findWord(grid, 'a');
    expect(canConnect(grid, p1[0], p1[1])).toBe(false);
    expect(canConnect(grid, p1[1], p1[0])).toBe(false);
    const p2 = findWord(grid, 'b');
    expect(canConnect(grid, p2[0], p2[1])).toBe(false);
    expect(canConnect(grid, p2[1], p2[0])).toBe(false);
    const p3 = findWord(grid, 'c');
    expect(canConnect(grid, p3[0], p3[1])).toBe(true);
    expect(canConnect(grid, p3[1], p3[0])).toBe(true);
  });
});
