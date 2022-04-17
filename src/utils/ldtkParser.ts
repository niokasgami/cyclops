/* eslint-disable no-underscore-dangle */

import { LoaderResource, utils } from 'pixi.js';
import { ILevel, ILevelLayer } from '../core/tilemap/ILevel';
import { ILayer } from '../core/tilemap/ILayer';
import { ITileset } from '../core/tilemap/ITileset';

function getTexture(filepath: string, resources: utils.Dict<LoaderResource>) {
  const filename = filepath.split('/').pop();
  const key = filename.split('.')[0];
  const { texture } = resources[key];
  if (texture) {
    return texture;
  }
  return null;
}

function parseLevelLayers(levelLayers: Array<any>): Array<ILevelLayer> {
  const layers = [];
  levelLayers.forEach((layer: any) => {
    layers.push({
      layerId: layer.layerDefUid,
      name: layer.__identifier,
      visible: layer.visible,
      tiles: layer.gridTiles,
    });
  });
  return layers;
}

export function parseLevels(data: any) {
  const levels: Array<ILevel> = [];
  data.levels.forEach((level) => {
    levels.push({
      id: level.uid,
      name: level.identifier,
      width: level.pxWid,
      height: level.pxHei,
      bgColor: level.bgColor,
      bgRelFilepath: level.bgRelFilepath,
      layers: parseLevelLayers(level.layerInstances),
    });
  });
  return levels;
}

export function parseLayers(data: any) {
  const layers: Array<ILayer> = [];
  data.defs.layers.forEach((layer) => {
    layers.push({
      id: layer.uid,
      name: layer.identifier,
      type: layer.type,
      gridSize: layer.gridSize,
      tileWidth: layer.gridSize,
      tileHeight: layer.gridSize,
      tilesetId: layer.tilesetDefUid,
    });
  });
  return layers;
}

export function parseTilesets(data: any, resources: utils.Dict<LoaderResource>) {
  const tilesets: Array<ITileset> = [];
  data.defs.tilesets.forEach((tileset) => {
    tilesets.push({
      id: tileset.uid,
      name: tileset.identifier,
      relFilepath: tileset.relPath,
      width: tileset.pxWid,
      height: tileset.pxHei,
      gridSize: tileset.tileGridSize,
      tileWidth: tileset.tileGridSize,
      tileHeight: tileset.tileGridSize,
      texture: getTexture(tileset.relPath, resources),
    });
  });
  return tilesets;
}

export function fullParse(key: string, resources: utils.Dict<LoaderResource>) {
  const { data } = resources[key];
  const levels = parseLevels(data);
  const layers = parseLayers(data);
  const tilesets = parseTilesets(data, resources);

  return { levels, layers, tilesets };
}
