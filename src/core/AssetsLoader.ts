import { Loader, utils } from 'pixi.js';

export default class AssetsLoader {
  public static rootPath = 'assets/';

  private static loader = new Loader();

  private static emitter = new utils.EventEmitter();

  public static readonly PATH = {
    characters: 'characters/',
    systems: 'systems/',
  };

  public static on(event: string, listener: (..._args: any[]) => void) {
    this.emitter.on(event, listener);
  }

  public static getInstance() {
    return this.loader;
  }

  public static addCharacters(filename: string) {
    this.add(filename, this.PATH.characters);
  }

  public static addSystem(filename: string) {
    this.add(filename, this.PATH.systems);
  }

  public static add(filename, directory) {
    const url = `${this.rootPath}${directory}/${filename}`;
    const key = filename.split('.')[0];
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
