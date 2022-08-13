import { GridConfig } from '@/models';

const MIN_DIV = 2;
const MAX_DIV = 10;

export function resolveGrid(width: number, height: number) {
  const isPortrait = width < height;
  const minDimension = isPortrait ? width : height;
  const remain = Math.abs(width - height);
  const bags: GridConfig[] = [];

  for (let div = MIN_DIV; div < MAX_DIV; div++) {
    const config: GridConfig = {
      blockSize: minDimension / div,
      rows: div,
      columns: div,
    };
    const extra = Math.floor(remain / config.blockSize);
    if (isPortrait) {
      config.rows += extra;
    } else {
      config.columns += extra;
    }
    bags.push(config);
  }
  return bags;
}
