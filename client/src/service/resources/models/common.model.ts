export interface CommonEntity {
  id: string;
}

export type Empty = Record<string, never>;

export type Params = Record<string, string>;

export enum SliceName {
  Auth = 'auth',
  Board = 'board',
  Column = 'column',
  Card = 'card',
  Maintain = 'maintain'
}
