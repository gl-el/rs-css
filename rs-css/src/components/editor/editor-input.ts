import ElementBuilder from '../../common/elementBuilder';
import InputBuilder from '../../common/inputBuilder';
import BtnBuilder from '../../common/btnBuilder';
import './input.css';
import { animateWrong } from '../../utils/animations';

export default class EditorInput extends ElementBuilder {
  public input: InputBuilder;

  public submit: BtnBuilder;

  public help: BtnBuilder;

  constructor() {
    super({
      tag: 'div',
      classNames: ['editor'],
    });
    this.input = new InputBuilder('Enter correct selector');
    this.submit = new BtnBuilder('btn btn__enter', 'enter');
    this.help = new BtnBuilder('btn btn__help', 'help');
    this.setUp();
  }

  public setUp(): void {
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
}
