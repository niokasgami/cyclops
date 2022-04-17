import { CompositeTilemap } from '@pixi/tilemap';
import { Container, Rectangle } from 'pixi.js';
import { ITilemapConfig } from './ITilemapConfig';
import { ILevel } from './ILevel';
import { ILayer } from './ILayer';
import { ITileset } from './ITileset';

export default class Tilemap extends Container {
  private tilesets: Array<ITileset> = [];

  private level: ILevel;

  private layers: Array<ILayer> = [];

  public config: ITilemapConfig;

  private tilemap: CompositeTilemap;

  constructor(config: ITilemapConfig) {
    super();
    this.config = config;
    this.tilesets = config.tilesets;
    this.layers = config.layers;
    this.level = config.level;
    this.createTilemap();
  }

  private createTilemap() {
    this.tilemap = new CompositeTilemap();
    this.populateTilemap();
    this.addChild(this.tilemap);
  }

  private populateTilemap() {
    this.tilemap.clear();
    this.level.layers.reverse().forEach((levelLayer) => {
      const layerDef = this.layers.find((l) => l.id === levelLayer.layerId);
      if (layerDef.type !== 'Tiles') {
        return;
      }
      const tileset = this.tilesets.find((t) => t.id === layerDef.tilesetId);
      const { texture } = tileset;
      levelLayer.tiles.forEach((tile) => {
        const x = tile.px[0];
        const y = tile.px[1];
        const tilesetX = tile.src[0];
        const tilesetY = tile.src[1];
        texture.frame = new Rectangle(tilesetX, tilesetY, tileset.tileWidth, tileset.tileHeight);
        this.tilemap.tile(texture, x, y, {
          tileWidth: layerDef.tileWidth,
          tileHeight: layerDef.tileHeight,
        });
      });
    });
  }
}
