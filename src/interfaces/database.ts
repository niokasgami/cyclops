/* the interface that shape the data of an entity */
import { Texture } from 'pixi.js';

export interface DataEntity {
  id: string;
  sprite : SpriteShape;
  collision : {
    x: number;
    y: number;
    width: number;
    height: number;
  }
}
/* the interface that shape the data of an actor */
export interface DataActor extends DataEntity {
  name: string;
  profile: string;
}

export interface SpriteShape {
  filename: Texture;
  index: number;
  fps: number;
}
