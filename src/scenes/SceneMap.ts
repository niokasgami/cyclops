import AssetLoader from '../core/AssetsLoader';
import Scene from './Scene';
import Tilemap from '../core/tilemap/Tilemap';
import { ITilemapConfig } from '../core/tilemap/ITilemapConfig';
import { fullParse } from '../utils/ldtkParser';

export default class extends Scene {
  private tilemap: Tilemap;

  public currentMapId: number;

  override preload() {
    super.preload();
    AssetLoader.add('classic_rpg.png', 'tilesets');
    AssetLoader.addMap('map1.json');
  }

  override create(resources) {
    super.create(resources);
    const { layers, levels, tilesets } = fullParse('map1', resources);
    const level = levels[0];
    const config: ITilemapConfig = {
      tilesets,
      layers,
      level,
    };
    this.tilemap = new Tilemap(config);
    this.addChild(this.tilemap);
  }
}
