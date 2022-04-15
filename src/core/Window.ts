/* globals nw, NWJS_Helpers */
import { utils } from 'pixi.js';

export default class Window {
  private static instance: Window;

  // eslint-disable-next-line camelcase
  private appWindow: NWJS_Helpers.win;

  private emitter: utils.EventEmitter;

  public canvas: HTMLCanvasElement;

  public ignoreDpi: boolean;

  private constructor() {
    this.emitter = new utils.EventEmitter();
    this.appWindow = Window.isNwjs() ? nw.Window.get() : null;
    this.setupCanvas();
    this.setupEvents();
  }

  public static getInstance(): Window {
    if (!this.instance) {
      this.instance = new Window();
    }
    return this.instance;
  }

  public on(event: string, listener: (..._args: any[]) => void) {
    this.emitter.on(event, listener);
  }

  private setupEvents() {
    if (Window.isNwjs()) {
      this.appWindow.on('resize', this.resizeAndEmit.bind(this));
      this.appWindow.on('restore', this.resizeAndEmit.bind(this));
      this.appWindow.on('maximize', this.resizeAndEmit.bind(this));
      this.appWindow.on('focus', () => this.emitter.emit('focus'));
      this.appWindow.on('blur', () => this.emitter.emit('blur'));
      return;
    }
    window.addEventListener('resize', this.resizeAndEmit.bind(this));
    window.addEventListener('focus', () => this.emitter.emit('focus'));
    window.addEventListener('blur', () => this.emitter.emit('blur'));
  }

  private setupCanvas(): void {
    document.body.style.margin = '0';
    this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  }

  private resizeAndEmit(): void {
    this.resizeCanvas(window.innerWidth, window.innerHeight);
    this.emitter.emit('resize', window.innerWidth, window.innerHeight);
  }

  public resizeCanvas(width: number, height: number): void {
    const pixelRatio = window.devicePixelRatio;
    const { canvas, ignoreDpi } = this;
    let newWidth = width;
    let newHeight = height;

    if (pixelRatio > 1 && ignoreDpi) {
      newWidth = Math.floor(width / pixelRatio);
      newHeight = Math.floor(height / pixelRatio);
    }

    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;
  }

  public setTitle(title: string): void {
    if (Window.isNwjs()) {
      this.appWindow.title = title;
      return;
    }
    document.title = title;
  }

  /**
   * Change the icon of the browser window
   *
   * Only available for browser windows.
   *
   * @param iconUrl The path to the icon
   */
  public static setIcon(iconUrl: string): void {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = iconUrl;
    document.head.appendChild(link);
  }

  /**
   * Request a fullscreen change on the window.
   *
   * In a browser window this method must be called while responding to a user
   * interaction or a device orientation change; otherwise it will fail.
   *
   * @returns {void}
   */
  public enterFullscreen(): void {
    if (Window.isNwjs()) {
      this.appWindow.enterFullscreen();
      return;
    }
    if (this.canvas.requestFullscreen) {
      this.canvas.requestFullscreen();
    }
  }

  public exitFullscreen(): void {
    if (Window.isNwjs()) {
      this.appWindow.leaveFullscreen();
      return;
    }
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  public openDevTools(): void {
    if (Window.isNwjs()) {
      this.appWindow.showDevTools();
    }
  }

  public closeDevTools(): void {
    if (Window.isNwjs()) {
      this.appWindow.closeDevTools();
    }
  }

  public static isNwjs(): boolean {
    try {
      return typeof nw !== 'undefined';
    } catch (e) {
      return false;
    }
  }
}
