import { Task } from '../../utils/types';

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
    taskStr: 'Select the plates',
  },

  {
    task: [
      {
        element: 'steak',
        tooltip: '<steak>',
      },
      {
        element: 'plate',
        tooltip: '<plate>',
      },
      {
        element: 'pan',
        tooltip: '<pan>',
        isTarget: true,
      },
    ],
    answer: 'pan',
    taskStr: 'Select the pan',
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
      {
        element: 'pan',
        tooltip: '<pan>',
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
        ],
      },
      {
        element: 'steak',
        tooltip: '<steak>',
      },
    ],
    answer: 'pan steak',
    taskStr: 'Select the steak on the pan',
  },

  {
    task: [
      {
        element: 'pan',
        tooltip: '<pan>',
        childes: [
          {
            element: 'steak',
            tooltip: '<steak>',
          },
        ],
      },
      {
        element: 'pan',
        attributes: { id: 'green' },
        tooltip: '<pan id="green">',
        childes: [
          {
            element: 'steak',
            tooltip: '<steak>',
            isTarget: true,
          },
        ],
      },
      {
        element: 'plate',
        tooltip: '<plate>',
        childes: [
          {
            element: 'steak',
            tooltip: '<steak id="cooked">',
            attributes: { id: 'cooked' },
          },
        ],
      },
    ],
    answer: '#green steak',
    taskStr: 'Select the steak on the pan with green border',
  },

  {
    task: [
      {
        element: 'plate',
        tooltip: '<plate>',
        childes: [
          {
            element: 'steak',
            attributes: { id: 'cooked', class: 'small' },
            tooltip: '<steak id="cooked" class="small">',
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
            attributes: { class: 'small' },
            tooltip: '<steak class="small">',
            isTarget: true,
          },
          {
            element: 'steak',
            tooltip: '<steak>',
          },
        ],
      },
      {
        element: 'steak',
        tooltip: '<steak class="small">',
        attributes: { class: 'small' },
        isTarget: true,
      },
    ],
    answer: '.small',
    taskStr: 'Select the small steaks',
  },

  {
    task: [
      {
        element: 'pan',
        tooltip: '<pan id="green">',
        attributes: { id: 'green' },
        childes: [
          {
            element: 'steak',
            attributes: { class: 'small' },
            tooltip: '<steak class="small">',
            isTarget: true,
          },
        ],
      },
      {
        element: 'plate',
        tooltip: '<plate>',
        childes: [
          {
            element: 'steak',
            attributes: { id: 'cooked', class: 'small' },
            tooltip: '<steak id="cooked" class="small">',
          },
        ],
      },
      {
        element: 'pan',
        tooltip: '<pan>',
        childes: [
          {
            element: 'steak',
            attributes: { class: 'small' },
            tooltip: '<steak class="small">',
            isTarget: true,
          },
          {
            element: 'steak',
            tooltip: '<steak>',
          },
        ],
      },
    ],
    answer: 'pan .small',
    taskStr: 'Select the small steaks on the pans',
  },

  {
    task: [
      {
        element: 'steak',
        tooltip: '<steak>',
      },
      {
        element: 'plate',
        tooltip: '<plate>',
        isTarget: true,
      },
      {
        element: 'pan',
        tooltip: '<pan>',
        isTarget: true,
        childes: [
          {
            element: 'steak',
            tooltip: '<steak>',
          },
        ],
      },
      {
        element: 'pan',
        tooltip: '<pan id="green">',
        attributes: { id: 'green' },
        isTarget: true,
        childes: [
          {
            element: 'steak',
            attributes: { class: 'small' },
            tooltip: '<steak class="small">',
          },
        ],
      },
      {
        element: 'steak',
        tooltip: '<steak>',
      },
    ],
    answer: 'pan, plate',
    taskStr: 'Select all pans and plates',
  },

  {
    task: [
      {
        element: 'pan',
        tooltip: '<pan>',
        isTarget: true,
        childes: [
          {
            element: 'steak',
            tooltip: '<steak>',
            isTarget: true,
          },
          {
            element: 'steak',
            attributes: { class: 'small' },
            tooltip: '<steak class="small">',
            isTarget: true,
          },
        ],
      },
      {
        element: 'pan',
        tooltip: '<pan id="green">',
        attributes: { id: 'green' },
        isTarget: true,
        childes: [
          {
            element: 'steak',
            attributes: { class: 'small' },
            tooltip: '<steak class="small">',
            isTarget: true,
          },
        ],
      },
      {
        element: 'fish',
        tooltip: '<fish>',
        isTarget: true,
      },
    ],
    answer: '*',
    taskStr: 'Select all',
  },

  {
    task: [
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
            element: 'fish',
            attributes: { class: 'small' },
            tooltip: '<fish class="small">',
            isTarget: true,
          },
        ],
      },
      {
        element: 'pan',
        tooltip: '<pan id="green">',
        attributes: { id: 'green' },
        childes: [
          {
            element: 'steak',
            attributes: { class: 'small' },
            tooltip: '<steak class="small">',
            isTarget: true,
          },
        ],
      },
      {
        element: 'plate',
        tooltip: '<plate>',
        childes: [
          {
            element: 'steak',
            attributes: { class: 'small' },
            tooltip: '<steak class="small">',
          },
        ],
      },
    ],
    answer: 'pan *',
    taskStr: 'Select all on the pans',
  },

  {
    task: [
      {
        element: 'pan',
        tooltip: '<pan>',
        childes: [
          {
            element: 'steak',
            attributes: { class: 'small' },
            tooltip: '<steak class="small">',
          },
        ],
      },
      {
        element: 'steak',
        attributes: { class: 'small' },
        tooltip: '<steak class="small">',
        isTarget: true,
      },
      {
        element: 'pan',
        tooltip: '<pan id="green">',
        attributes: { id: 'green' },
      },
      {
        element: 'steak',
        tooltip: '<steak>',
        isTarget: true,
      },
      {
        element: 'steak',
        tooltip: '<steak>',
      },
    ],
    answer: 'pan + steak',
    taskStr: 'Select the steaks next to the pans',
  },

  {
    task: [
      {
        element: 'pan',
        tooltip: '<pan>',
        childes: [
          {
            element: 'steak',
            tooltip: '<steak>',
          },
        ],
      },
      {
        element: 'steak',
        attributes: { class: 'small' },
        tooltip: '<steak class="small">',
        isTarget: true,
      },
      {
        element: 'steak',
        tooltip: '<steak>',
        isTarget: true,
      },
      {
        element: 'plate',
        tooltip: '<plate>',
        childes: [
          {
            element: 'steak',
            attributes: { id: 'cooked' },
            tooltip: '<steak id="cooked">',
          },
        ],
      },
    ],
    answer: 'pan ~ steak',
    taskStr: 'Select the steaks beside the pan',
  },

];
