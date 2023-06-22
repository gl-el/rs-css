import { LevelElement } from '../../components/table/table-element';

export type Task = {
  task: LevelElement[];
  answer: string;
  taskStr: string,
};

export const tasks: Task[] = [
  {
    task: [
      {
        element: 'plate',
        tooltip: '<plate>',
        isTarget: true,
      },
      {
        element: 'plate',
        tooltip: '<plate>',
        isTarget: true,
      },
      {
        element: 'plate',
        tooltip: '<plate>',
        isTarget: true,
      },
    ],
    answer: 'plate',
    taskStr: 'Select plates',
  },

  {
    task: [
      {
        element: 'plate',
        tooltip: '<plate>',
      },
      {
        element: 'plate',
        attributes: { id: 'red' },
        tooltip: '<pan id="red">',
        isTarget: true,
      },
    ],
    answer: '#red',
    taskStr: 'Select the plate with red border',
  },

  {
    task: [
      {
        element: 'plate',
        tooltip: '<plate>',
        childes: [
          {
            element: 'steak',
            tooltip: '<steak>',
          },
        ],
      },
      {
        element: 'pan',
        tooltip: '<pan>',
        childes: [
          {
            element: 'steak',
            tooltip: '<steak>',
            isTarget: true,
          },
          {
            element: 'steak',
            tooltip: '<steak>',
            isTarget: true,
          },
        ],
      },
    ],
    answer: 'pan steak',
    taskStr: 'Select steak on the pan and very very very very very long task',
  },

  {
    task: [
      {
        element: 'plate',
        tooltip: '<plate>',
        childes: [
          {
            element: 'steak',
            attributes: { id: 'cooked' },
            tooltip: '<steak id="cooked">',
            isTarget: true,
          },
        ],
      },
      {
        element: 'pan',
        tooltip: '<pan>',
        childes: [
          {
            element: 'steak',
            tooltip: '<steak>',
          },
          {
            element: 'steak',
            tooltip: '<steak>',
          },
        ],
      },
    ],
    answer: '#cooked',
    taskStr: 'Select cooked steak',
  },

];
