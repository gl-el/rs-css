import { Task } from '../../assets/data/level';
import ElementBuilder from '../../common/elementBuilder';
import EditorElement from './editor-item';
import { animateWrong } from '../../utils/animations';
import './editor.css';

export default class HTMLViewer extends ElementBuilder {
  public viewerElements: EditorElement<HTMLDivElement>[] = [];

  public viewerWindow: ElementBuilder<HTMLElement>;

  constructor() {
    super({
      tag: 'div',
      classNames: ['viewer'],
    });
    this.viewerWindow = new ElementBuilder({
      tag: 'div',
      classNames: ['viewer__window'],
    });
    this.render();
  }

  public render(): HTMLElement {
    this.el.innerHTML = '<div class="viewer__header"><p class="viewer__name">HTML Viewer</p><p class="viewer__name">table.html</p></div>';
    this.createLines();
    this.addInner(this.viewerWindow);
    return this.el;
  }

  private createLines(): void {
    const maxLines = 20;
    const editor = new ElementBuilder({
      tag: 'div',
      classNames: ['viewer__numbers'],
    });
    for (let i = 1; i <= maxLines; i += 1) {
      const line = new ElementBuilder({
        tag: 'div',
        classNames: ['viewer__line'],
      });
      line.addInner(new ElementBuilder({
        tag: 'span',
        classNames: ['line__number'],
        text: `${i}`,
      }));
      editor.addInner(line);
    }
    this.addInner(editor);
  }

  public addTask(level: Task): void {
    this.viewerWindow.el.replaceChildren();
    level.task.forEach((levelEl) => {
      const element = new EditorElement(levelEl);
      this.viewerElements.push(element);
      element.create().innerHTML = element.textBefore;
      if (levelEl.childes) {
        levelEl.childes.forEach((child) => {
          const childEl = new EditorElement(child);
          childEl.create().innerHTML = `${childEl.textBefore}`;
          const childAfter = new ElementBuilder({
            tag: 'span',
            classNames: ['tag'],
            text: childEl.textAfter,
          }).createElement();
          childEl.create().append(childAfter);
          this.viewerElements.push(childEl);
          element.create().append(childEl.create());
        });
      }
      const after = new ElementBuilder({
        tag: 'span',
        classNames: ['tag'],
        text: element.textAfter,
      }).createElement();
      element.create().append(after);
      this.viewerWindow.el.append(element.create());
    });
  }

  public shake(): void {
    this.el.animate(animateWrong.animation, animateWrong.time);
  }
}
