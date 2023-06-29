import { Task } from '../utils/types';
import { tasks } from '../assets/data/level';
import { storageKeys } from '../utils/consts';

export class TaskModel {
  private tasks: Task[] = tasks;

  private currentLevel = localStorage.getItem(storageKeys.CURRENT_LEVEL)
    ? Number(localStorage.getItem(storageKeys.CURRENT_LEVEL)) : 0;

  public setCurrentLevel(index: number): void {
    if (index < this.tasks.length && index >= 0) this.currentLevel = index;
  }

  public getCurrentLevel(): number {
    return this.currentLevel;
  }

  public upLevel(): void {
    if (this.currentLevel < this.tasks.length - 1) this.currentLevel += 1;
  }

  public getCurrentTask(): Task {
    return this.tasks[this.currentLevel];
  }

  public getAnswer(): string {
    return this.getCurrentTask().answer;
  }
}
