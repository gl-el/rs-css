import ElementBuilder from './elementBuilder';

export default class BtnBuilder extends ElementBuilder {
  constructor(className: string, text: string) {
    super({
      tag: 'button',
      classNames: className.split(' '),
      text: `${text}`,
    });
  }

  public addClick(callback: () => void): BtnBuilder {
    this.el.addEventListener('click', callback);
    return this;
  }
}
