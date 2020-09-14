export type Dictionary<T> = { [key: string]: T };

export interface Identifiable {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}
