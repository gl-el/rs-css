import ElementBuilder from '../../common/elementBuilder';

export default class Tooltip extends ElementBuilder {
  constructor(tipText: string) {
    super({
      tag: 'div',
      classNames: ['tooltip'],
      text: tipText,
    });
    document.body.append(this.el);
  }

  public show(x: number, y:number): void {
    this.el.classList.add('tooltip_active');
    this.el.style.top = `${y - 40}px`;
    this.el.style.left = `${x}px`;
  }

  public hide(): void {
    this.el.classList.remove('tooltip_active');
  }

  public remove(): void {
    this.el.remove();
  }
}
