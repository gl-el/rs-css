import './footer.css';
import ElementBuilder from '../../common/elementBuilder';
import ghlogo from '../../assets/svg/github-mark.svg';
import rslogo from '../../assets/svg/rs_school_js.svg';

export default class Footer extends ElementBuilder {
  constructor() {
    super({
      tag: 'footer',
      classNames: ['footer'],
    });
    this.render();
  }

  public render(): void {
    const ghIco = new ElementBuilder({
      tag: 'img',
      classNames: ['footer__ico', 'gh-logo'],
      attr: { src: `${ghlogo}` },
    });

    const ghLink = new ElementBuilder({
      tag: 'a',
      classNames: ['footer__link'],
      attr: { href: 'https://github.com/gl-el', target: '__blank' },
    });
    ghLink.addInner(ghIco);

    const rsIco = new ElementBuilder({
      tag: 'img',
      classNames: ['footer__ico', 'rs-logo'],
      attr: { src: `${rslogo}` },
    });

    const rsLink = new ElementBuilder({
      tag: 'a',
      classNames: ['footer__link'],
      attr: { href: 'https://rs.school/js/', target: '__blank' },
    });
    rsLink.addInner(rsIco);

    const year = new ElementBuilder({
      tag: 'p',
      classNames: ['footer__item', 'footer__text'],
      text: '2023',
    });

    this.addInner(ghLink, year, rsLink);
  }
}
