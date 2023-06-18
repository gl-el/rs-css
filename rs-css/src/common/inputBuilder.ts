import ElementBuilder from './elementBuilder';

export default class InputBuilder extends ElementBuilder {
  constructor(placeholderText: string) {
    super({
      tag: 'input',
      classNames: ['input-field'],
      attr: { input: 'text', autofocus: 'true', placeholder: `${placeholderText}` },
    });
  }

  public setValue(value: string): InputBuilder {
    (this.el as HTMLInputElement).value = value;
    return this;
  }

  public getValue(): string {
    return (this.el as HTMLInputElement).value;
  }

  public printValue(value: string): InputBuilder {
    (this.el as HTMLInputElement).value = '';
    const letters = value.split('');
    for (let i = 0; i < letters.length; i += 1) {
      setTimeout(() => {
        (this.el as HTMLInputElement).value += letters[i];
      }, i * 200);
    }
    return this;
  }
}
