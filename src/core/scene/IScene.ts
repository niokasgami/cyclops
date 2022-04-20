import type { utils, LoaderResource, Container } from 'pixi.js';
import type Game from '../../Game';

export interface IScene extends Container {
  game: Game;
  isReady: boolean;
  setName?(name: string): void;
  preload?(): void;
  start?(): void;
  create?(resources: utils.Dict<LoaderResource>): void;
  update?(dt: number): void;
  resize?(width: number, height: number): void;
  exit?(): void;
}
