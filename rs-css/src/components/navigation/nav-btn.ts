import BtnBuilder from '../../common/btnBuilder';
import ElementBuilder from '../../common/elementBuilder';

export default class NavBtn extends BtnBuilder {
  public btn!: BtnBuilder;

  constructor() {
    super(['menu__btn'], '');
    this.setUp();
  }

  private setUp(): void {
    const line = new ElementBuilder({
      tag: 'span',
      classNames: ['btn__line'],
    });
    this.addInner(line);
    this.addClick(() => { this.toggle(); });
  }

  public toggle(): void {
    this.el.classList.toggle('menu__btn_active');
  }

  public removeActive(): void {
    this.el.classList.remove('menu__btn_active');
  }
}
