export type Status = 'completed' | 'help' | 'uncompleted';

export type SavedStatus = Map<number, Status>;

export interface Params {
  tag: string,
  classNames?: string[],
  text?: string,
  attr?: { [key: string]: string },
}

export interface LevelElement {
  element: string,
  tooltip: string,
  attributes?: { class?: string; id?: string },
  childes?: LevelElement[],
  isTarget?: boolean,
}

export interface Task {
  task: LevelElement[],
  answer: string,
  taskStr: string,
}
