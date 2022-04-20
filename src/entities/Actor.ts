import { Point } from 'pixi.js';
import Entity from './Entity';
import { DataActor } from '../interfaces/database';

export default class Actor extends Entity {
  protected displayName: string;

  protected exp: number;

  constructor(data:DataActor, coords: Point) {
    super(data, coords);
    this.displayName = '';
    this.exp = 0;
  }
}
