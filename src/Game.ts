import {
  Container, LoaderResource, Renderer, Ticker, utils,
} from 'pixi.js';

import Window from './core/Window';
import Scene from './scenes/Scene';
import AssetLoader from './core/AssetsLoader';
import Keyboard from './core/Input/Keyboard';

export default class Game extends utils.EventEmitter {
  private renderer: Renderer;

  private stage: Container;

  private ticker: Ticker;

  private scene: Scene;

  private window: Window;

  public width: number;

  public height: number;

  public keyboard: Keyboard = new Keyboard();

  private static instance: Game;

  private constructor() {
    super();
    this.setupWindow();
    this.setupRenderer();
    this.setupLoader();
    this.setupGameLoop();
  }

  private setupWindow(): void {
    this.window = Window.getInstance();
    this.window.on('resize', this.onResize.bind(this));
    this.window.on('focus', this.onFocus.bind(this));
    this.window.on('blur', this.onBlur.bind(this));
  }

  private setupRenderer(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.renderer = new Renderer({
      width: this.width,
      height: this.height,
      backgroundColor: 0x000000,
      view: Window.getInstance().canvas,
    });
    document.body.appendChild(this.renderer.view);
  }

  private setupLoader(): void {
    AssetLoader.on('complete', this.onLoadComplete.bind(this));
    AssetLoader.on('progress', this.onLoadProgress.bind(this));
    AssetLoader.on('error', this.onLoadError.bind(this));
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
    AssetLoader.load();
  }

  public onResize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.renderer.resize(width, height);
    if (this.scene) {
      this.scene.resize(width, height);
    }
  }

  public onFocus(): void {
    this.ticker.start();
  }

  public onBlur(): void {
    this.ticker.stop();
    this.keyboard.clear();
  }

  private onLoadComplete(resources: utils.Dict<LoaderResource>): void {
    this.emit('loaderComplete', resources);
  }

  private onLoadProgress(resources: utils.Dict<LoaderResource>): void {
    this.emit('loaderProgress', resources);
  }

  private onLoadError(resources: utils.Dict<LoaderResource>): void {
    this.emit('loaderError', resources);
  }
}
