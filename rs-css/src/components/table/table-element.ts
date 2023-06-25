import Tooltip from './tooltip';
import { animateActive, animateWin, animateWrong } from '../../utils/animations';
import { LevelElement } from '../../utils/types';

export default class TableElement<T extends HTMLDivElement> {
  public isTarget: boolean | undefined;

  public tableEl: T;

  public tooltip: Tooltip;

  constructor(levelEl: LevelElement) {
    this.tableEl = document.createElement(`${levelEl.element}`) as T;
    this.setProperties(levelEl);
    this.tooltip = new Tooltip(levelEl.tooltip);
    this.isTarget = levelEl?.isTarget;
    this.setTarget();
  }

  private setProperties(levelEl: LevelElement): void {
    if (levelEl.attributes) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(levelEl.attributes)) {
        this.tableEl.setAttribute(`${key}`, `${value}`);
      }
    }
  }

  public create(): HTMLElement {
    return this.tableEl;
  }

  public hover(): void {
    this.tableEl.setAttribute('data-hovered', 'true');
    const { x, y } = this.tableEl.getBoundingClientRect();
    this.tooltip.show(x + this.tableEl.offsetWidth / 2, y);
  }

  public unhover(): void {
    this.tableEl.removeAttribute('data-hovered');
    this.tooltip.hide();
  }

  private setTarget(): void {
    if (this.isTarget) {
      this.tableEl.animate(animateActive.animation, animateActive.time);
    }
  }

  public playWin(): void {
    this.tableEl.animate(animateWin.animation, animateWin.time);
  }

  public playWrong(): void {
    this.tableEl.animate(animateWrong.animation, animateWrong.time);
  }
}
