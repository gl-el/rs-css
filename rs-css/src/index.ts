import './styles.css';
import Game from './components/game/game';
import Footer from './components/footer/footer';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game(document.body);
  game.setUp();
  document.body.append(new Footer().createElement());
});
