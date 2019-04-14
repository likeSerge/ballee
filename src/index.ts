import { Game } from './game/game';

document.addEventListener('DOMContentLoaded', () => {
  const canvasEl = document.getElementById('ballee-game');
  if (canvasEl) {
    canvasEl.setAttribute('height', `${window.innerHeight - 15}`);
    canvasEl.setAttribute('width', `${window.innerWidth}`);
  }
  const game = new Game();
  game.run();
});
