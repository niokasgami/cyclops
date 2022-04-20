import { Point, Rectangle, Sprite } from 'pixi.js';
import AssetLoader from '../core/AssetLoader';
import Scene from './Scene';
// import SceneMap from './SceneMap';
import Keyboard from '../core/Input/Keyboard';
import Key from '../core/Input/Key';
import Entity from '../entities/Entity';

export default class SceneBoot extends Scene {
  private entity: Entity;

  private logo: Sprite;

  private keyboard = new Keyboard();

  private leftKey = new Key('ArrowLeft');

  private rightKey = new Key('ArrowRight');

  public override preload() {
    super.preload();
    AssetLoader.add('shroom.png', 'pictures/');
    this.keyboard.addKey(this.leftKey);
    this.keyboard.addKey(this.rightKey);
    // to test if it work
  }

  public override create(resources) {
    super.create(resources);

    // this.game.changeScene(new SceneMap());
    const entity = {
      data: {
        id: 'shroom',
        sprite: {
          filename: resources.shroom.texture,
          index: 0,
          fps: 0,
        },
        collision: new Rectangle(0, 0, 0, 0),
      },
      coords: new Point(
        this.game.width / 2,
        this.game.height / 2,
      ),
    };
    this.entity = new Entity(entity.data, entity.coords);
    this.addChild(this.entity);
    this.logo = new Sprite(resources.shroom.texture);
    this.logo.anchor.set(0.5);
    this.logo.x = this.game.width / 2;
    this.logo.y = this.game.height / 2;
  }

  public override update(dt?: number) {
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
