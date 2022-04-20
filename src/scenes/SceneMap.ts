import { utils, LoaderResource } from 'pixi.js';
import AssetLoader from '../core/AssetLoader';
import Scene from '../core/scene/Scene';
import Tilemap from '../core/tilemap/Tilemap';
import { ITilemapConfig } from '../core/tilemap/ITilemapConfig';
import { fullParse } from '../utils/ldtkParser';

export default class SceneMap extends Scene {
  private tilemap: Tilemap;

  public currentMapId: number;

  public override preload() {
    super.preload();
    AssetLoader.add('classic_rpg.png', 'tilesets');
    AssetLoader.addMap('map1.json');
  }

  public override create(resources: utils.Dict<LoaderResource>) {
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
    setTimeout(() => {
      this.game.sceneLoader.change('boot');
    }, 2000);
  }
}
