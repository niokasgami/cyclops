import Game from './Game';
import SceneBoot from './scenes/SceneBoot';

window.onload = () => {
  const game = Game.getInstance();
  game.changeScene(new SceneBoot());
};
