import Table from '../table/table';
import HTMLViewer from '../editor-display/html-viewer';
import ElementBuilder from '../../common/elementBuilder';
import EditorInput from '../editor/editor-input';
import Menu from '../navigation/navigation';
import { tasks } from '../../assets/data/level';
import './game.css';
import { Status, SavedStatus } from '../../utils/types';

type JsonStatus = [number, Status];

export default class Game {
/*   public editor: ace.Ace.Editor; */
  public menu: Menu;

  public header: ElementBuilder;

  public table: Table;

  public input: EditorInput;

  public viewer: HTMLViewer;

  public levelCounter: number;

  private status: Status = 'uncompleted';

  private statuses: SavedStatus = new Map();

  constructor(parent: HTMLElement) {
    const section = new ElementBuilder({ tag: 'section', classNames: ['game'] });
    this.header = new ElementBuilder({
      tag: 'h1',
      classNames: ['game-task'],
    });
    this.levelCounter = localStorage.getItem('currLvl') ? Number(localStorage.getItem('currLvl')) : 0;
    this.menu = new Menu(tasks);
    this.table = new Table();
    this.input = new EditorInput(parent);
    this.viewer = new HTMLViewer();
    section.addInner(this.header);
    parent.append(this.menu.createElement());
    section.addInner(this.table);
    section.addInner(this.input);
    section.addInner(this.viewer);
    parent.append(section.createElement());
    this.setSavedLvls();
  }

  private setSavedLvls(): void {
    const string = localStorage.getItem('save');
    if (string) {
      const savedLevels = JSON.parse(string) as JsonStatus[];
      savedLevels.forEach((level) => {
        this.statuses.set(level[0], level[1]);
      });
    }
    this.statuses.forEach((value, key) => {
      this.menu.setStatus(value, key);
    });
  }

  public setUp(): void {
    this.setTask();
    this.input.submit.addClick(() => { this.validateInput(this.input.getValue()); });
    document.addEventListener('keypress', (e: KeyboardEvent) => {
      this.input.input.el.focus();
      if (e.key === 'Enter') {
        e.preventDefault();
        this.validateInput(this.input.getValue());
      }
    });
    document.addEventListener('click', () => this.input.editor.focus());
    this.menu.levels.forEach((element, index) => {
      element.el.addEventListener('click', () => {
        this.levelCounter = index;
        this.status = 'uncompleted';
        this.setTask();
      });
    });
    this.menu.resetBtn.addClick(() => { this.reset(); });
    this.getHelp();
  }

  private hoverItem(e: Event, index: number): void {
    e.stopImmediatePropagation();
    this.viewer.viewerElements[index].hover();
    this.table.plates[index].hover();
  }

  private unhoverItem(e: Event, index: number): void {
    this.viewer.viewerElements[index].unhover();
    this.table.plates[index].unhover();
  }

  private setTask(): void {
    this.save();
    this.header.addText(tasks[this.levelCounter].taskStr);
    this.menu.setActive(this.levelCounter);
    this.input.setValue('');
    this.table.addTask(tasks[this.levelCounter]);
    this.viewer.addTask(tasks[this.levelCounter]);
    const itemsLength = this.table.plates.length;
    for (let i = 0; i < itemsLength; i += 1) {
      const plates = this.table.plates[i];
      const tags = this.viewer.viewerElements[i];
      plates.tableEl.addEventListener('mouseover', (e: Event) => { this.hoverItem(e, i); });
      tags.editorEl.addEventListener('mouseover', (e: Event) => { this.hoverItem(e, i); });
      plates.tableEl.addEventListener('mouseout', (e: Event) => { this.unhoverItem(e, i); });
      tags.editorEl.addEventListener('mouseout', (e: Event) => { this.unhoverItem(e, i); });
    }
  }

  private save(): void {
    localStorage.setItem('currLvl', `${this.levelCounter}`);
    localStorage.setItem('save', JSON.stringify([...this.statuses]));
  }

  private shake(): void {
    this.input.shake();
    this.viewer.shake();
  }

  private loadNext(): void {
    const index = this.levelCounter;
    this.statuses.set(index, this.status);
    this.levelCounter += 1;
    setTimeout(() => {
      this.setTask();
      this.menu.setStatus(this.status, index);
      this.status = 'uncompleted';
    }, 600);
  }

  private checkInput(selector: string): void {
    const elements = this.table.el.querySelectorAll(`${selector}`);
    let win = true;
    if (elements.length === 0) {
      win = false;
      this.shake();
    }
    elements.forEach((el) => {
      const returnedEL = this.table.map.get(el);
      if (!returnedEL?.isTarget) win = false;
    });
    if (!win) {
      elements.forEach((el) => {
        const returnedEL = this.table.map.get(el);
        returnedEL?.playWrong();
      });
    } else if (win) {
      elements.forEach((el) => {
        const returnedEL = this.table.map.get(el);
        returnedEL?.playWin();
      });
      if (this.status !== 'help') this.status = 'completed';
      this.loadNext();
    }
  }

  private validateInput(selector: string): void {
    try {
      this.checkInput(selector);
    } catch (err) {
      this.shake();
    }
  }

  private getHelp(): void {
    this.input.help.addClick(() => {
      this.status = 'help';
      this.input.printValue(tasks[this.levelCounter].answer);
    });
  }

  private reset(): void {
    localStorage.removeItem('save');
    localStorage.removeItem('currLvl');
    this.statuses.clear();
    this.levelCounter = 0;
    this.status = 'uncompleted';
    this.menu.resetStatuses();
    this.setTask();
  }
}
