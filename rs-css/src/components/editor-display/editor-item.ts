import { LevelElement } from '../../utils/types';

export default class EditorElement<T extends HTMLDivElement> {
  public editorEl: T;

  public textBefore = '';

  public textAfter = '';

  constructor(levelEl: LevelElement) {
    this.editorEl = document.createElement('div') as T;
    this.genText(levelEl);
  }

  private genText(levelEl: LevelElement): void {
    this.textBefore = `<span class="tag">&lt;${levelEl.element}</span>`;
    if (levelEl.attributes) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(levelEl.attributes)) {
        this.textBefore += ` <span class="prop">${key}=</span><span class="prop-text">"${value}"</span>`;
      }
    }
    this.textBefore += '<span class="tag">&gt;</span>';
    this.textAfter += `</${levelEl.element}>`;
  }

  public create(): HTMLElement {
    return this.editorEl;
  }

  public hover(): void {
    this.editorEl.setAttribute('data-code', 'true');
  }

  public unhover(): void {
    this.editorEl.removeAttribute('data-code');
  }
}
