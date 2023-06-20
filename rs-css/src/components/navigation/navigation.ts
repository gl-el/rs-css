import ElementBuilder from '../../common/elementBuilder';
import { Task } from '../../assets/data/level';
import BtnBuilder from '../../common/btnBuilder';
import './navigation.css';
import { Status } from '../../utils/types';
import NavBtn from './nav-btn';

export default class Menu extends ElementBuilder {
  public list!: ElementBuilder<HTMLElement>;

  public resetBtn!: BtnBuilder;

  public levels: ElementBuilder<HTMLElement>[] = [];

  private navBtn!: NavBtn;

  private background!: ElementBuilder<HTMLElement>;

  constructor(tasks: Task[]) {
    super({
      tag: 'div',
      classNames: ['menu'],
    });
    this.setUp();
    this.setLvls(tasks);
  }

  private setUp(): void {
    const menu = new ElementBuilder({
      tag: 'ul',
      classNames: ['levels'],
    });
    this.list = menu;
    this.resetBtn = new BtnBuilder('btn btn__reset', 'Reset progress');
    this.navBtn = new NavBtn();
    this.navBtn.addClick(() => this.el.classList.toggle('menu_active'));
    this.background = new ElementBuilder({
      tag: 'div',
      classNames: ['menu__after'],
    });
    this.background.el.addEventListener('click', () => { this.toggleMenu(); });
    this.addInner(menu);
    this.addInner(this.background);
    this.el.append(this.resetBtn.createElement());
    document.body.append(this.navBtn.el);
  }

  public resetStatuses(): void {
    for (let i = 0; i < this.levels.length; i += 1) {
      this.setUncompleted(i);
    }
  }

  private setLvls(tasks: Task[]): void {
    for (let i = 1; i <= tasks.length; i += 1) {
      const level = new ElementBuilder({
        tag: 'li',
        classNames: ['level'],
        text: `Level ${i}`,
      });
      this.levels.push(level);
      this.list.addInner(level);
    }
    this.levels.forEach((level, index) => {
      level.el.addEventListener('click', () => {
        this.setActive(index);
        this.toggleMenu();
      });
    });
  }

  public setActive(index: number): void {
    this.levels.forEach((level) => {
      level.el.classList.remove('level_active');
    });
    this.levels[index].addClass(['level_active']);
  }

  public setStatus(status: Status, index: number): void {
    if (status === 'help') {
      this.setHelp(index);
    } else if (status === 'completed') {
      this.setCompleted(index);
    }
  }

  public setHelp(index: number): void {
    this.levels[index].el.className = 'level';
    this.levels[index].addClass(['level_help']);
  }

  public setCompleted(index: number): void {
    this.levels[index].el.className = 'level';
    this.levels[index].addClass(['level_completed']);
  }

  private setUncompleted(index: number): void {
    this.levels[index].el.className = 'level';
    this.levels[index].addClass(['level_uncompleted']);
  }

  private toggleMenu(): void {
    this.el.classList.remove('menu_active');
    this.navBtn.removeActive();
  }
}
