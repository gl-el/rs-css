import './table.css';
import ElementBuilder from '../../common/elementBuilder';
import TableElement from './table-element';
import { Task } from '../../utils/types';
import Tooltip from './tooltip';

export default class Table extends ElementBuilder {
  public items!: NodeListOf<Element>;

  public tableElements: TableElement<HTMLDivElement>[] = [];

  public tooltips: Tooltip[] = [];

  public tableElementsMap: WeakMap<Element, TableElement<HTMLDivElement>> = new WeakMap();

  public targets: TableElement<HTMLDivElement>[] = [];

  constructor() {
    super({
      tag: 'div',
      classNames: ['table'],
    });
  }

  private createPlates(level: Task): void {
    level.task.forEach((levelEl) => {
      const element = new TableElement(levelEl);
      this.tableElements.push(element);
      if (element.isTarget) this.targets.push(element);
      this.tooltips.push(element.tooltip);
      if (levelEl.childes) {
        levelEl.childes.forEach((child) => {
          const childEl = new TableElement(child);
          if (childEl.isTarget) this.targets.push(element);
          this.tableElements.push(childEl);
          this.tooltips.push(childEl.tooltip);
          element.create().append(childEl.create());
          this.tableElementsMap.set(childEl.create(), childEl);
        });
      }
      this.tableElementsMap.set(element.create(), element);
      this.el.append(element.create());
    });
  }

  public addTask(level: Task): void {
    this.tooltips.forEach((element) => element.remove());
    this.removeNodes();
    this.createPlates(level);
  }

  public removeNodes(): void {
    this.el.replaceChildren();
    this.targets = [];
  }
}
