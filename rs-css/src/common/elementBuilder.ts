import { Params } from '../utils/types';

export default class ElementBuilder<T extends HTMLElement = HTMLElement> {
  public el: T;

  constructor(params: Params) {
    this.el = document.createElement(params.tag) as T;
    this.addClass(params.classNames);
    this.addText(params.text);
    this.setAttribute(params.attr);
  }

  public addClass(classes: Params['classNames']): void {
    if (classes) {
      this.el.classList.add(...classes);
    }
  }

  public addText(text: Params['text']): void {
    if (text) {
      this.el.textContent = text;
    }
  }

  public setAttribute(attr: Params['attr']): void {
    if (attr) {
      Object.entries(attr).forEach(([key, value]) => {
        this.el.setAttribute(key, value);
      });
    }
  }

  public addInner(el: ElementBuilder):void {
    if (el instanceof ElementBuilder) {
      this.el.append(el.createElement());
    }
  }

  public createElement(): HTMLElement {
    return this.el;
  }
}
