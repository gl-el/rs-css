import { TaskModel } from '../../model/taskModel';
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
  public menu: Menu = new Menu(tasks);

  public header: ElementBuilder;

  public table: Table = new Table();

  public input: EditorInput;

  public viewer: HTMLViewer = new HTMLViewer();

  private status: Status = 'uncompleted';

  private statuses: SavedStatus = new Map();

  private model: TaskModel = new TaskModel();

  constructor(parent: HTMLElement) {
    const section = new ElementBuilder({ tag: 'section', classNames: ['game'] });
    this.header = new ElementBuilder({
      tag: 'h1',
      classNames: ['game-task'],
    });
    const levelCounter = localStorage.getItem('currLvl') ? Number(localStorage.getItem('currLvl')) : 0;
    this.model.setCurrLvl(levelCounter);
    this.input = new EditorInput(parent);
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
      this.input.editor.focus();
      if (e.key === 'Enter') {
        e.preventDefault();
        this.validateInput(this.input.getValue());
      }
    });
    this.menu.levels.forEach((element, index) => {
      element.el.addEventListener('click', () => {
        this.model.setCurrLvl(index);
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
    const task = this.model.getCurrentTask();
    this.input.submit.el.removeAttribute('disabled');
    this.input.help.el.removeAttribute('disabled');
    this.header.addText(task.taskStr);
    this.menu.setActive(this.model.getCurrLvl());
    this.input.setValue('');
    this.table.addTask(task);
    this.viewer.addTask(task);
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
    localStorage.setItem('currLvl', `${this.model.getCurrLvl()}`);
    localStorage.setItem('save', JSON.stringify([...this.statuses]));
  }

  private shake(): void {
    this.input.shake();
    this.viewer.shake();
  }

  private loadNext(): void {
    const index = this.model.getCurrLvl();
    this.statuses.set(index, this.status);
    if (index < tasks.length - 1) {
      this.model.upLvl();
      setTimeout(() => {
        this.setTask();
        this.menu.setStatus(this.status, index);
        this.status = 'uncompleted';
      }, 600);
    } else {
      setTimeout(() => {
        this.menu.setStatus(this.status, index);
        this.input.submit.el.setAttribute('disabled', 'true');
        this.input.help.el.setAttribute('disabled', 'true');
        this.input.setValue('');
        this.viewer.removeSelectors();
        this.table.removeNodes();
        this.header.addText('You won! Press reset progress to start again or select a level');
      }, 600);
    }
  }

  private checkInput(selector: string): void {
    const userElements = this.table.el.querySelectorAll(`${selector}`);
    const correctElements = this.table.el.querySelectorAll(this.model.getAnswer());
    let win = true;
    if (userElements.length === 0) {
      win = false;
      this.shake();
    }
    userElements.forEach((userEl, index) => {
      if (userEl !== correctElements[index]) win = false;
    });
    if (!win) {
      userElements.forEach((el) => {
        const returnedEL = this.table.map.get(el);
        returnedEL?.playWrong();
      });
    } else if (win) {
      userElements.forEach((el) => {
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
      this.input.printValue(this.model.getAnswer());
    });
  }

  private reset(): void {
    localStorage.removeItem('save');
    localStorage.removeItem('currLvl');
    this.statuses.clear();
    this.model.setCurrLvl(0);
    this.status = 'uncompleted';
    this.menu.resetStatuses();
    this.setTask();
  }
}
