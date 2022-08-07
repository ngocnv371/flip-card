import { calculateLinks, findWord, generateGrid } from './grid';

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

describe('calculateLinks', () => {
  function testWords(grid: string[][], words: string[]) {
    words.forEach(v => {
      const pos = findWord(grid, v);
      expect(calculateLinks(grid, pos[0])).toEqual([pos[1]]);
      expect(calculateLinks(grid, pos[1])).toEqual([pos[0]]);
    });
  }

  test('4x4 grid: return nothing when checking empty cells', () => {
    // mock a 4x4 grid
    const grid = [
      ['', '', '', ''],
      ['', 'a', 'b', ''],
      ['', 'a', 'b', ''],
      ['', '', '', ''],
    ];
    // first column
    expect(calculateLinks(grid, { row: 0, col: 0 })).toEqual([]);
    expect(calculateLinks(grid, { row: 0, col: 1 })).toEqual([]);
    expect(calculateLinks(grid, { row: 0, col: 2 })).toEqual([]);
    expect(calculateLinks(grid, { row: 0, col: 3 })).toEqual([]);
    // last column
    expect(calculateLinks(grid, { row: 3, col: 0 })).toEqual([]);
    expect(calculateLinks(grid, { row: 3, col: 1 })).toEqual([]);
    expect(calculateLinks(grid, { row: 3, col: 2 })).toEqual([]);
    expect(calculateLinks(grid, { row: 3, col: 3 })).toEqual([]);
    // first col
    expect(calculateLinks(grid, { row: 1, col: 0 })).toEqual([]);
    expect(calculateLinks(grid, { row: 2, col: 0 })).toEqual([]);
    expect(calculateLinks(grid, { row: 3, col: 0 })).toEqual([]);
    // last col
    expect(calculateLinks(grid, { row: 1, col: 3 })).toEqual([]);
    expect(calculateLinks(grid, { row: 2, col: 3 })).toEqual([]);
    expect(calculateLinks(grid, { row: 3, col: 3 })).toEqual([]);
  });

  test('4x4 grid: horizontal adjacent cells', () => {
    // mock a 4x4 grid
    const grid = [
      ['', '', '', ''],
      ['', 'a', 'a', ''],
      ['', 'b', 'b', ''],
      ['', '', '', ''],
    ];
    testWords(grid, ['a', 'b']);
  });

  test('4x4 grid: vertical adjacent cells', () => {
    // mock a 4x4 grid
    const grid = [
      ['', '', '', ''],
      ['', 'a', 'b', ''],
      ['', 'a', 'b', ''],
      ['', '', '', ''],
    ];

    testWords(grid, ['a', 'b']);
  });

  test('4x5 grid: vertical adjacent cells', () => {
    // mock a 4x4 grid
    const grid = [
      ['', '', '', '', ''],
      ['', 'a', 'b', 'c', ''],
      ['', 'a', 'b', 'c', ''],
      ['', '', '', '', ''],
    ];

    testWords(grid, ['a', 'b', 'c']);
  });

  test('4x5 grid: horizontal adjacent cells', () => {
    // mock a 4x4 grid
    const grid = [
      ['', '', '', '', ''],
      ['', 'c', 'a', 'a', ''],
      ['', 'b', 'b', 'c', ''],
      ['', '', '', '', ''],
    ];

    testWords(grid, ['a', 'b']);
    // c
    const pos = findWord(grid, 'c');
    expect(calculateLinks(grid, pos[0])).toEqual([]);
    expect(calculateLinks(grid, pos[1])).toEqual([]);
  });

  test('4x5 grid: horizontal straight', () => {
    // mock a 4x4 grid
    const grid = [
      ['', '', '', '', ''],
      ['', 'a', '', 'a', ''],
      ['', 'b', '', 'b', ''],
      ['', '', '', '', ''],
    ];

    testWords(grid, ['a', 'b']);
  });

  test('5x4 grid: vertical straight', () => {
    // mock a 4x4 grid
    const grid = [
      ['', '', '', ''],
      ['', 'c', 'b', ''],
      ['', '', '', ''],
      ['', 'c', 'b', ''],
      ['', '', '', ''],
    ];

    testWords(grid, ['b', 'c']);
  });

  test('7x7 grid: horizontal straight', () => {
    // mock a 4x4 grid
    const grid = [
      ['', '', '', '', '', '', ''],
      ['', 'a', '', '', '', 'a', ''],
      ['', '', '', '', '', '', ''],
      ['', 'c', '', '', '', 'c', ''],
      ['', '', '', '', '', '', ''],
      ['', 'b', '', '', '', 'b', ''],
      ['', '', '', '', '', '', ''],
    ];

    testWords(grid, ['a', 'b', 'c']);
  });

  test('7x7 grid: vertical straight', () => {
    // mock a 4x4 grid
    const grid = [
      ['', '', '', '', '', '', ''],
      ['', 'a', '', 'c', '', 'b', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', 'c', '', '', ''],
      ['', 'a', '', '', '', 'b', ''],
      ['', '', '', '', '', '', ''],
    ];

    testWords(grid, ['a', 'b', 'c']);
  });

  test('7x7 grid: one turn', () => {
    // mock a 4x4 grid
    const grid = [
      ['', '', '', '', '', '', ''],
      ['', 'a', '', 'b', '', '', ''],
      ['', '', '', 'a', 'b', '', ''],
      ['', '', '', '', 'd', '', ''],
      ['', '', 'e', 'd', '', 'c', ''],
      ['', '', '', 'e', 'c', '', ''],
      ['', '', '', '', '', '', ''],
    ];
    testWords(grid, ['a', 'b', 'c', 'd', 'e']);
  });
});
