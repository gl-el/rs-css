import * as ace from 'ace-builds';
import 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-css';
import ElementBuilder from '../../common/elementBuilder';
import BtnBuilder from '../../common/btnBuilder';
import './input.css';
import { animateWrong } from '../../utils/animations';

export default class EditorInput extends ElementBuilder {
  public editor: ace.Ace.Editor;

  public input: ElementBuilder;

  public submit: BtnBuilder;

  public help: BtnBuilder;

  constructor(parent: HTMLElement) {
    super({
      tag: 'div',
      classNames: ['editor'],
    });
    this.input = new ElementBuilder({
      tag: 'div',
      attr: { id: 'ace-editor' },
    });
    this.submit = new BtnBuilder('btn btn__enter', 'enter');
    this.help = new BtnBuilder('btn btn__help', 'help');
    this.setUp();
    parent.append(this.el);
    this.editor = ace.edit('ace-editor', {
      theme: 'ace/theme/twilight',
      mode: 'ace/mode/css',
      autoScrollEditorIntoView: true,
      maxLines: 1,
      minLines: 1,
      useWorker: false,
      placeholder: 'Enter CSS selector',
    });
    this.editor.container.style.lineHeight = '2';
    this.editor.renderer.updateFontSize();
  }

  private setUp(): void {
    this.el.innerHTML = '<div class="editor__header"><p class="editor__name">CSS Editor</p><p class="editor__name">styles.css</p></div>';
    const editorWindow = new ElementBuilder({
      tag: 'div',
      classNames: ['editor__window'],
    });
    editorWindow.addInner(this.input);
    editorWindow.addInner(this.submit);
    editorWindow.addInner(this.help);
    this.addInner(editorWindow);
  }

  public shake(): void {
    this.el.animate(animateWrong.animation, animateWrong.time);
  }

  public getValue(): string {
    return this.editor.getValue();
  }

  public setValue(str: string): void {
    this.editor.setValue(str);
  }

  public printValue(str: string): void {
    this.editor.setValue('');
    for (let i = 0; i < str.length; i += 1) {
      setTimeout(() => {
        const letter = str[i];
        this.editor.insert(letter);
      }, 100 * i);
    }
  }
}
