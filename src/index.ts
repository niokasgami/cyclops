import Game from './Game';
import SceneBoot from './scenes/SceneBoot';
import SceneMap from './scenes/SceneMap';

window.onload = () => {
  const game = Game.getInstance();
  game.sceneLoader.add(new SceneBoot(), 'boot');
  game.sceneLoader.add(new SceneMap(), 'map');
  game.sceneLoader.change('boot');
};
