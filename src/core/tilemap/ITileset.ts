import { Texture } from 'pixi.js';

export interface ITileset {
  id: number;
  name: string;
  relFilepath: string;
  width: number;
  height: number;
  gridSize: number;
  tileWidth: number;
  tileHeight: number;
  texture: Texture;
}
