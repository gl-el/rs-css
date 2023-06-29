import ElementBuilder from './elementBuilder';

export default class BtnBuilder extends ElementBuilder {
  constructor(className: string[], text: string) {
    super({
      tag: 'button',
      classNames: className,
      text: `${text}`,
    });
  }

  public addClick(callback: () => void): void {
    this.el.addEventListener('click', callback);
  }
}
