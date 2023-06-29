import { describe, expect } from '@jest/globals';
import { TaskModel } from '../src/model/taskModel';
import { tasks } from '../src/assets/data/level';

describe('TaskModel', () => {
  let taskModel: TaskModel;
  beforeEach(() => {
    taskModel = new TaskModel();
  });

  it('should set current level', () => {
    taskModel.setCurrentLevel(1);
    expect(taskModel.getCurrentLevel()).toBe(1);
  });

  it('should not set current level if index is out of range', () => {
    taskModel.setCurrentLevel(-1);
    expect(taskModel.getCurrentLevel()).toBe(0);

    taskModel.setCurrentLevel(100);
    expect(taskModel.getCurrentLevel()).toBe(0);
  });

  it('should increase current level', () => {
    taskModel.upLevel();
    expect(taskModel.getCurrentLevel()).toBe(1);
  });

  it('should not increase current level if already at the last level', () => {
    taskModel.setCurrentLevel(tasks.length - 1);
    taskModel.upLevel();
    expect(taskModel.getCurrentLevel()).toBe(tasks.length - 1);
  });

  it('should return current task', () => {
    const currentTask = taskModel.getCurrentTask();
    expect(currentTask).toEqual(tasks[0]);
  });

  it('should return answer of the current task', () => {
    const currentAnswer = taskModel.getAnswer();
    expect(currentAnswer).toEqual(tasks[0].answer);
  });
});
