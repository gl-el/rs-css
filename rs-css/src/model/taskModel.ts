import { Task } from '../utils/types';
import { tasks } from '../assets/data/level';

export class TaskModel {
  private tasks: Task[] = tasks;

  private currLvl = 0;

  public setCurrLvl(index: number): void {
    if (index < this.tasks.length && index >= 0) this.currLvl = index;
  }

  public getCurrLvl(): number {
    return this.currLvl;
  }

  public upLvl(): void {
    if (this.currLvl < this.tasks.length - 1) this.currLvl += 1;
  }

  public getCurrentTask(): Task {
    return this.tasks[this.currLvl];
  }

  public getAnswer(): string {
    return this.getCurrentTask().answer;
  }
}
