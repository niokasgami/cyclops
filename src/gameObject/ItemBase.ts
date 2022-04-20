/**
 * the most basic data shape of an item
 */
import { Resource, Texture } from 'pixi.js';
import AssetLoader from '../core/AssetLoader';

interface DataItem {
  id: string;
  name: string;
  icon: string;
  description: string;
}

/**
 * the super class of items and skill in the game
 */
export default class ItemBase {
  public id: string;

  public name: string;

  public icon: Texture;

  public description: string;

  constructor(data: DataItem) {
    this.id = data.id;
    this.name = data.name;
    this.icon = ItemBase.fetchTextureIcon(data.icon);
  }

  private static fetchTextureIcon(icon: string): Texture<Resource> {
    return AssetLoader.get(icon).texture;
  }
}
