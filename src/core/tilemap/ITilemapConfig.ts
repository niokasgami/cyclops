import { ILevel } from './ILevel';
import { ITileset } from './ITileset';

export interface ITilemapConfig {
  tilesets: Array<ITileset>;
  level: ILevel;
  layers: Array<any>;
}
