import { Sprite } from 'pixi.js';
import AssetsLoader from '../core/AssetsLoader';
import Scene from './Scene';
import SceneMap from './SceneMap';
import Keyboard from '../core/Input/Keyboard';
import Key from '../core/Input/Key';

export default class SceneBoot extends Scene {
  logo: Sprite;

  keyboard = new Keyboard();

  leftKey = new Key('ArrowLeft');

  rightKey = new Key('ArrowRight');

  preload() {
    super.preload();
    AssetsLoader.add('shroom.png', 'pictures/');
    this.keyboard.addKey(this.leftKey);
    this.keyboard.addKey(this.rightKey);
  }

  create(resources) {
    super.create(resources);
    this.game.changeScene(new SceneMap());
    this.logo = new Sprite(resources.shroom.texture);
    this.logo.anchor.set(0.5);
    this.logo.x = this.game.width / 2;
    this.logo.y = this.game.height / 2;
    this.addChild(this.logo);
  }

  update(dt) {
    if (this.keyboard.isKeyDown(this.leftKey)) {
      this.logo.rotation -= 0.02 * dt;
    }
    if (this.keyboard.isKeyDown(this.rightKey)) {
      this.logo.rotation += 0.02 * dt;
    }
  }

  resize(width: number, height: number): void {
    this.logo.x = width / 2;
    this.logo.y = height / 2;
  }
}
