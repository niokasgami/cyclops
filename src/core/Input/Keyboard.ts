import { utils } from 'pixi.js';
import { Key } from './Key';

export class Keyboard extends utils.EventEmitter {

  private registry = new Map<string, Key>();

  /* eslint-disable no-unused-vars */
  private keydownHandler: { (event: KeyboardEvent): void; (this: Window, ev: KeyboardEvent): void };

  private keyupHandler: { (event: KeyboardEvent): void; (this: Window, ev: KeyboardEvent): void };
  /* eslint-enable no-unused-vars */

  constructor() {
    super();
    this.setupEvents();
  }

  /**
   * setup the keyboards events
   * @private
   */
  private setupEvents() {
    this.keydownHandler = (event: KeyboardEvent): void => this.onKeyDown(event);
    this.keyupHandler = (event: KeyboardEvent): void => this.onKeyUp(event);
    window.addEventListener('keydown', this.keydownHandler);
    window.addEventListener('keyup', this.keyupHandler);
  }

  /**
   * will register a new key input to the registry
   * @param {Key} key - the key to register
   */
  public addKey(key: Key) {
    this.registry.set(key.name, key);
  }

  /**
   * return the list of registered keyboard input
   * @returns {Map<string,Key>}
   */
  public keys(): Map<string,Key> {
    return this.registry;
  }
  
  /**
   * return if the button is already registered
   * @param name - the button name
   * @returns {boolean}
   */
  public has(name: string): boolean {
    if(this.registry.has(name)){
      return true;
    }
    return false;
  }

  /**
   * the function that is called when a key is pressed
   * @param {KeyboardEvent} event - the keyboard event to catch
   * @private
   */
  private onKeyDown(event: KeyboardEvent): void {
    if (this.registry.has(event.key)) {
      const key = this.registry.get(event.key);
      key.down(event);
      this.emit('keydown', key);
    }
  }

  /**
   * the function that is called when a key is released
   * @param {KeyboardEvent} event - the keyboard event to catch
   */
  private onKeyUp(event: KeyboardEvent): void {
    if (this.registry.has(event.key)) {
      const key = this.registry.get(event.key);
      key.up(event);
      this.emit('keyup', key);
    }
  }

  /**
   * return wether the key is pressed or not
   * @param {Key} key - the key to check its state
   * @returns {boolean}
   */
  public isPressed(key: Key): boolean {
    if (this.registry.has(key.name)) {
      return key.isDown;
    }
    return false;
  }

  /**
   * return wether the key is released or not
   * @param {Key} key - the key to check its state
   * @returns 
   */
  public isReleased(key: Key): boolean {
    if (this.registry.has(key.name)) {
      return key.isUp;
    }
    return false;
  }

  /**
   * clear all data from the registered Input key
   */
  public clear(): void {
    this.registry.forEach((key) => key.clear());
    this.emit('clear');
  }

  /**
   * destroy the mouse event listener
   */
  public destroy(): void {
    window.removeEventListener('keydown', this.keydownHandler);
    window.removeEventListener('keyup', this.keyupHandler);
    this.clear();
  }
}
