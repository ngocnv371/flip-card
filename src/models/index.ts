import { Identifiable } from './id';

export * from './id';

export interface LevelData {
  level: number;
  rows: number;
  cols: number;
  cards: string[];
}

export interface Topic extends Identifiable {
  level: number;
  played: number;
  words: string[];
}

export interface GameState {
  score: number;
  instance: number;
  topics: Topic[];
}

export interface FlipState {
  score: number;
}
