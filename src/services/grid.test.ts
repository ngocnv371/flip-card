import { canConnect, findWord, generateGrid, Grid } from './grid';

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
  const dataset: [string, Grid, string[], any[]][] = [
    [
      'straight vertical',
      [
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', 'a', ' ', 'b', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', 'd', ' '],
        [' ', ' ', ' ', ' ', 'c', 'd', ' '],
        [' ', ' ', ' ', 'b', ' ', ' ', ' '],
        [' ', 'a', ' ', ' ', 'c', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ],
      ['a', 'b', 'c', 'd'],
      [],
    ],
    [
      'straight horizontal',
      [
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', 'a', ' ', ' ', ' ', 'a', ' '],
        [' ', ' ', 'b', ' ', ' ', 'b', ' '],
        [' ', ' ', ' ', 'c', ' ', 'c', ' '],
        [' ', ' ', ' ', ' ', 'd', 'd', ' '],
        [' ', ' ', 'e', 'e', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ],
      ['a', 'b', 'c', 'd', 'e'],
      [],
    ],
  ];
  function printPosition(p: any) {
    return `(${p[0].col} ${p[0].row})`;
  }
  describe.each(dataset)('%s', (name, grid, words, path) => {
    const p = findWord(grid, words[0]);
    it(`should find correct link for '${words[0]}': (${p[0].col},${p[0].row}) -> (${p[1].col},${p[1].row})`, () => {
      expect(canConnect(grid, p[0], p[1])).toBeTruthy();
      expect(canConnect(grid, p[1], p[0])).toBeTruthy();
    });
  });
});
