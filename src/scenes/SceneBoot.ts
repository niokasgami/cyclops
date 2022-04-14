import { Sprite } from 'pixi.js';
import AssetsLoader from '../core/AssetsLoader';
import Scene from './Scene';

export default class SceneBoot extends Scene {
  logo: Sprite;

  preload() {
    super.preload();
    AssetsLoader.add('shroom.png', 'pictures/');
  }

  create(resources) {
    super.create(resources);
    this.logo = new Sprite(resources.shroom.texture);
    this.logo.anchor.set(0.5);
    this.logo.x = this.game.width / 2;
    this.logo.y = this.game.height / 2;
    this.addChild(this.logo);
  }

  update(dt) {
    this.logo.rotation += 0.01 * dt;
  }
}
