import { utils } from 'pixi.js';
import Key from './Key';

export default class Keyboard extends utils.EventEmitter {
  private keys = new Map();

  /* eslint-disable no-unused-vars */
  private keydownHandler: { (event: KeyboardEvent): void; (this: Window, ev: KeyboardEvent): void };

  private keyupHandler: { (event: KeyboardEvent): void; (this: Window, ev: KeyboardEvent): void };
  /* eslint-enable no-unused-vars */

  constructor() {
    super();
    this.setupEvents();
  }

  private setupEvents(): void {
    this.keydownHandler = (event: KeyboardEvent): void => this.onKeyDown(event);
    this.keyupHandler = (event: KeyboardEvent): void => this.onKeyUp(event);
    window.addEventListener('keydown', this.keydownHandler);
    window.addEventListener('keyup', this.keyupHandler);
  }

  public addKey(key: Key) {
    this.keys.set(key.name, key);
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (this.keys.has(event.key)) {
      const key = this.keys.get(event.key);
      key.down(event);
      this.emit('keydown', key);
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    if (this.keys.has(event.key)) {
      const key = this.keys.get(event.key);
      key.up(event);
      this.emit('keyup', key);
    }
  }

  public isKeyDown(key: Key): boolean {
    if (this.keys.has(key.name)) {
      return key.isDown;
    }
    return false;
  }

  public isKeyUp(key: Key): boolean {
    if (this.keys.has(key.name)) {
      return key.isUp;
    }
    return false;
  }

  clear(): void {
    this.keys.forEach((key) => key.clear());
    this.emit('clear');
  }

  destroy(): void {
    window.removeEventListener('keydown', this.keydownHandler);
    window.removeEventListener('keyup', this.keyupHandler);
    this.clear();
  }
}
