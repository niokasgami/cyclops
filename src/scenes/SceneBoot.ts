import { Sprite } from 'pixi.js';
import Scene from './Scene';

export default class SceneBoot extends Scene {
  logo: Sprite;

  preload() {
    super.preload();
    this.game.loader.add('gecko', './assets/pictures/gecko.png');
  }

  create(resources) {
    super.create(resources);
    this.logo = new Sprite(resources.gecko.texture);
    this.addChild(this.logo);
  }

  update() {
    if (this.logo) {
      this.logo.rotation += 0.01;
    }
  }
}
