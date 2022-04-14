import {
  Container, Loader, LoaderResource, Renderer, Ticker, utils,
} from 'pixi.js';

import Scene from './scenes/Scene';
import AssetLoader from './core/AssetsLoader';

export default class Game extends utils.EventEmitter {
  private renderer: Renderer;

  private stage: Container;

  private ticker: Ticker;

  private scene: Scene;

  public loader: Loader;

  // eslint-disable-next-line no-use-before-define
  private static instance: Game;

  private constructor() {
    super();
    this.setupRenderer();
    this.setupLoader();
    this.setupGameLoop();
  }

  private setupRenderer(): void {
    this.renderer = new Renderer({
      width: 640,
      height: 480,
      backgroundColor: 0x000000,
    });
    document.body.appendChild(this.renderer.view);
    this.stage = new Container();
  }

  private setupLoader(): void {
    this.loader = new Loader();
    this.loader.onComplete.add(this.onLoadComplete.bind(this));
    this.loader.onProgress.add(this.onLoadProgress.bind(this));
    this.loader.onError.add(this.onLoadError.bind(this));
  }

  private setupGameLoop(): void {
    this.ticker = new Ticker();
    this.ticker.add(this.update.bind(this));
    this.ticker.start();
  }

  private update(dt: number): void {
    if (this.scene && this.scene.isReady) {
      this.scene.update(dt);
      this.renderer.render(this.scene);
    }
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  public changeScene(scene: Scene): void {
    this.scene = scene;
    this.scene.preload();
    this.loader.load();
  }

  private onLoadComplete(loader: Loader, resources: utils.Dict<LoaderResource>): void {
    this.emit('loaderComplete', resources);
  }

  private onLoadProgress(loader: Loader, resources: utils.Dict<LoaderResource>): void {
    this.emit('loaderProgress', resources);
  }

  private onLoadError(loader: Loader, resources: utils.Dict<LoaderResource>): void {
    this.emit('loaderError', resources);
  }
}
