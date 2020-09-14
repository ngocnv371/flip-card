export type Dictionary<T> = { [key: string]: T };

export interface Identifiable {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface GameState {
  score: number;
  instance: number;
}

export interface FlipState {
  score: number;
}
