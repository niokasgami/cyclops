import { Sprite } from 'pixi.js';
import AssetsLoader from '../core/AssetsLoader';
import Scene from './Scene';
import SceneMap from './SceneMap';
import Keyboard from '../core/Input/Keyboard';
import Key from '../core/Input/Key';

export default class SceneBoot extends Scene {
  private logo: Sprite;

  private keyboard = new Keyboard();

  private leftKey = new Key('ArrowLeft');

  private rightKey = new Key('ArrowRight');

  public override preload() {
    super.preload();
    AssetsLoader.add('shroom.png', 'pictures/');
    this.keyboard.addKey(this.leftKey);
    this.keyboard.addKey(this.rightKey);
  }

  public override create(resources) {
    super.create(resources);
    this.game.changeScene(new SceneMap());
    this.logo = new Sprite(resources.shroom.texture);
    this.logo.anchor.set(0.5);
    this.logo.x = this.game.width / 2;
    this.logo.y = this.game.height / 2;
    this.addChild(this.logo);
  }

  public override update(dt) {
    if (this.keyboard.isKeyDown(this.leftKey)) {
      this.logo.rotation -= 0.02 * dt;
    }
    if (this.keyboard.isKeyDown(this.rightKey)) {
      this.logo.rotation += 0.02 * dt;
    }
  }

  public override resize(width: number, height: number): void {
    this.logo.x = width / 2;
    this.logo.y = height / 2;
  }
}
