import {
  Container, Point, Rectangle, Sprite, Texture,
} from 'pixi.js';
import { DataEntity, SpriteShape } from './IEntityData';

/**
 * the super class that define how an entity is shaped
 * @extends Container
 */
export default class Entity extends Container {
  /**
   * the entity id
   * @type {string}
   */
  public id: string;

  /**
   * the entity sprite
   * @type {Sprite}
   */
  public sprite: Sprite;

  /**
   * the entity collider
   * @type {Rectangle}
   */
  public collider: Rectangle;

  constructor(data: DataEntity, coords: Point) {
    super();
    this.id = data.id;
    this.createSprite(data.sprite);
    const rect = data.collision;
    this.collider = new Rectangle(rect.x, rect.y, rect.width, rect.height);
    this.x = coords.x;
    this.y = coords.y;
  }

  /**
   * swap the texture of an entity
   * @param {Texture} texture - the texture to swap with the old one
   */
  public setTexture(texture: Texture) {
    this.sprite.texture = texture;
  }

  /**
   * create the entity sprite
   * @param {SpriteShape} data
   * @protected
   */
  protected createSprite(data: SpriteShape) {
    const texture = data.filename;
    this.sprite = new Sprite(texture);
    this.addChild(this.sprite);
  }

  /**
   * update the entity and it's children
   * @param {number} delta
   */
  public update(delta: number) {
    for (const child of this.children as Entity[]) {
      if (child.update) {
        child.update(delta);
      }
    }
  }

  // @todo I gotta figure out how to implement this
  // eslint-disable-next-line class-methods-use-this
  public onCollisionEnter(_signal: unknown) {

  }

  // @todo I gotta figure out how to implement this
  // eslint-disable-next-line class-methods-use-this
  public onCollisionExit(_signal: unknown) {

  }
}
