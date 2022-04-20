/* eslint-disable comma-dangle */
import { Loader, LoaderResource, utils } from 'pixi.js';

export default class AssetLoader {
  public static readonly rootPath = 'assets/';

  private static loader = new Loader();

  private static emitter = new utils.EventEmitter();

  public static readonly PATH = {
    characters: 'characters/',
    systems: 'systems/',
    data: 'data/',
  };

  public static on(event: string, listener: (..._args: any[]) => void) {
    this.emitter.on(event, listener);
  }

  public static getInstance() {
    return this.loader;
  }

  public static get(asset: string): LoaderResource {
    return this.loader.resources[asset];
  }

  public static addCharacters(filename: string) {
    this.add(filename, this.PATH.characters);
  }

  public static addSystem(filename: string) {
    this.add(filename, this.PATH.systems);
  }

  public static addMap(filename: string) {
    this.add(filename, `${this.PATH.data}/maps/`);
  }

  public static add(filename: string, directory: string) {
    const url = `${this.rootPath}${directory}/${filename}`;
    const key = filename.split('.')[0];
    if (this.loader.resources[key]) {
      // @todo the logger should warn about resource already existing
      return;
    }
    this.loader.add(key, url);
  }

  /**
     * will load all the queued images
     */
  public static load() {
    this.loader.load((loader, resources) => {
      this.emitter.emit('complete', resources);
    });

    this.loader.onProgress.once((loader, resource) => {
      this.emitter.emit('progress', loader, resource);
    });

    this.loader.onError.once((loader, resource) => {
      this.emitter.emit('error', loader, resource);
    });
  }
}
