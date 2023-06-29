import { TaskModel } from '../../model/taskModel';
import Table from '../table/table';
import HTMLViewer from '../editor-display/html-viewer';
import ElementBuilder from '../../common/elementBuilder';
import EditorInput from '../editor/editor-input';
import Menu from '../navigation/navigation';
import { tasks } from '../../assets/data/level';
import './game.css';
import { Status, SavedStatus } from '../../utils/types';
import { storageKeys } from '../../utils/consts';

type JsonStatus = [number, Status];

export default class Game {
  public menu: Menu = new Menu(tasks);

  public header: ElementBuilder;

  public table: Table = new Table();

  public editorInput: EditorInput;

  public htmlViewer: HTMLViewer = new HTMLViewer();

  private status: Status = 'uncompleted';

  private statusesMap: SavedStatus = new Map();

  private model: TaskModel = new TaskModel();

  constructor(parent: HTMLElement) {
    const section = new ElementBuilder({ tag: 'section', classNames: ['game'] });
    this.header = new ElementBuilder({
      tag: 'h1',
      classNames: ['game-task'],
    });
    this.editorInput = new EditorInput(parent);
    section.addInner(this.header, this.table, this.editorInput, this.htmlViewer);
    parent.append(this.menu.createElement(), section.createElement());
    this.setSavedLvls();
  }

  private setSavedLvls(): void {
    const string = localStorage.getItem(storageKeys.SAVE);
    if (string) {
      const savedLevels = JSON.parse(string) as JsonStatus[];
      savedLevels.forEach((level) => this.statusesMap.set(...level));
    }
    this.statusesMap.forEach((value, key) => this.menu.setStatus(value, key));
  }

  public setUp(): void {
    this.setTask();
    this.editorInput.submit.addClick(() => { this.validateInput(this.editorInput.getValue()); });
    document.addEventListener('keypress', (e: KeyboardEvent) => {
      this.editorInput.editor.focus();
      if (e.key === 'Enter') {
        e.preventDefault();
        this.validateInput(this.editorInput.getValue());
      }
    });
    this.menu.levels.forEach((element, index) => {
      element.el.addEventListener('click', () => {
        this.model.setCurrentLevel(index);
        this.status = 'uncompleted';
        this.setTask();
      });
    });
    this.menu.resetBtn.addClick(() => this.reset());
    this.getHelp();
  }

  private hoverItem(e: Event, index: number): void {
    e.stopPropagation();
    this.htmlViewer.viewerElements[index].hover();
    this.table.tableElements[index].hover();
  }

  private unhoverItem(e: Event, index: number): void {
    this.htmlViewer.viewerElements[index].unhover();
    this.table.tableElements[index].unhover();
  }

  private setTask(): void {
    this.save();
    const task = this.model.getCurrentTask();
    this.editorInput.submit.el.removeAttribute('disabled');
    this.editorInput.help.el.removeAttribute('disabled');
    this.header.addText(task.taskStr);
    this.menu.setActive(this.model.getCurrentLevel());
    this.editorInput.setValue('');
    this.table.addTask(task);
    this.htmlViewer.addTask(task);
    this.table.tableElements.forEach((plate, index) => {
      const tags = this.htmlViewer.viewerElements[index];
      plate.tableEl.addEventListener('mouseover', (e: Event) => this.hoverItem(e, index));
      tags.editorEl.addEventListener('mouseover', (e: Event) => this.hoverItem(e, index));
      plate.tableEl.addEventListener('mouseout', (e: Event) => this.unhoverItem(e, index));
      tags.editorEl.addEventListener('mouseout', (e: Event) => this.unhoverItem(e, index));
    });
  }

  private save(): void {
    localStorage.setItem(storageKeys.CURRENT_LEVEL, `${this.model.getCurrentLevel()}`);
    localStorage.setItem(storageKeys.SAVE, JSON.stringify([...this.statusesMap]));
  }

  private shake(): void {
    this.editorInput.shake();
    this.htmlViewer.shake();
  }

  private loadNext(): void {
    const index = this.model.getCurrentLevel();
    this.statusesMap.set(index, this.status);
    if (index < tasks.length - 1) {
      this.model.upLevel();
      setTimeout(() => {
        this.setTask();
        this.menu.setStatus(this.status, index);
        this.status = 'uncompleted';
      }, 600);
    } else {
      setTimeout(() => {
        this.menu.setStatus(this.status, index);
        this.editorInput.submit.el.setAttribute('disabled', 'true');
        this.editorInput.help.el.setAttribute('disabled', 'true');
        this.editorInput.setValue('');
        this.htmlViewer.removeSelectors();
        this.table.removeNodes();
        this.header.addText('You won! Press reset progress to start again or select a level');
      }, 600);
    }
  }

  private checkInput(selector: string): void {
    const userElements = this.table.el.querySelectorAll(`${selector}`);
    const correctElements = this.table.el.querySelectorAll(this.model.getAnswer());
    let win = true;
    if (!userElements.length) {
      win = false;
      this.shake();
    }
    userElements.forEach((userEl, index) => {
      if (userEl !== correctElements[index]) win = false;
    });
    if (!win) {
      userElements.forEach((el) => {
        const returnedEL = this.table.tableElementsMap.get(el);
        returnedEL?.playWrong();
      });
    } else if (win) {
      userElements.forEach((el) => {
        const returnedEL = this.table.tableElementsMap.get(el);
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
    this.editorInput.help.addClick(() => {
      this.status = 'help';
      this.editorInput.printValue(this.model.getAnswer());
    });
  }

  private reset(): void {
    localStorage.removeItem('save');
    localStorage.removeItem('currLvl');
    this.statusesMap.clear();
    this.model.setCurrentLevel(0);
    this.status = 'uncompleted';
    this.menu.resetStatuses();
    this.setTask();
  }
}
