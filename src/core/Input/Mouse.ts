
import { Vector2 } from "../../math";
import { utils } from "pixi.js";
import { Button } from "./Button";

/**
 * the class that handle mouse movement and interactions
 * @extends utils.EventEmitter
 */
export class Mouse extends utils.EventEmitter {

  private registry = new Map<string, Button>();

  private mousedownHandler: { (event: MouseEvent): void; (this: Window, ev: MouseEvent): void };
  private mouseupHandler: { (event: MouseEvent): void; (this: Window, ev: MouseEvent): void };
  private mousemoveHandler: { (event: MouseEvent): void; (this: Window, ev: MouseEvent): void }
  private mousewheelHandler: { (event: MouseEvent): void; (this: Window, ev: MouseEvent): void }

  /**
   * the mouse coordinate based on the browser page
   * @type {Vector2}
   */
  public realTransform = new Vector2(0, 0);

  /**
   * the mouse coordinates based on the visible screen
   * @type {Vector2}
   */
  public transform = new Vector2(0, 0);

  /**
   * the mouse wheel transform
   * @type {Vector2}
   */
  public wheelTransform = new Vector2(0, 0);

  constructor() {
    super();
    this.setupEvents();
  }

  /**
   * setup the mouse events
   * @private
   */
  private setupEvents(): void {
    this.mousedownHandler = (event: MouseEvent): void => this.onMouseDown(event);
    this.mouseupHandler = (event: MouseEvent): void => this.onMouseUp(event);
    this.mousemoveHandler = (event: MouseEvent): void => this.onMouseMove(event);
    this.mousewheelHandler = (event: WheelEvent): void => this.onMouseWheel(event);
    window.addEventListener('mousedown', this.mousedownHandler);
    window.addEventListener('mouseup', this.mouseupHandler);
    window.addEventListener('mousemove', this.mousemoveHandler)
    window.addEventListener('wheel', this.mousewheelHandler);
  }

  /**
   * Will register a new mouse button to the registry
   * @param {Button} button - the mouse button to register
   */
  public addButton(button: Button) {
    this.registry.set(button.name, button);
  }

  /**
   * return the list of registered mouse button
   * @returns {Map<string,Button>}
   */
  public buttons(): Map<string, Button> {
    return this.registry;
  }

  /**
   * return if the button is already registered
   * @param name - the mouse button name
   * @returns {boolean}
   */
  public has(name: string): boolean {
    if (this.registry.has(name)) {
      return true;
    }
    return false;
  }

  /**
   * the function that is called when a button is pressed down
   * @param {MouseEvent} event - the mouse event to catch
   * @private
   */
  private onMouseDown(event: MouseEvent): void {
    const buttonName = this.fetchButtonName(event.button);
    if (this.registry.has(buttonName)) {
      const button = this.registry.get(buttonName);
      button.down(event);
      this.emit('mousedown', button);
    }
  }

  /**
   * the function that is called when a button is released
   * @param {MouseEvent} event - the mouse event to catch
   * @private
   */
  private onMouseUp(event: MouseEvent): void {
    const buttonName = this.fetchButtonName(event.button);
    if (this.registry.has(buttonName)) {
      const button = this.registry.get(buttonName);
      button.up(event);
      this.emit('mouseup', button);
    }
  }

  /**
   * the function that is called when the mouse is moving
   * @param {MouseEvent} event - the mouse event to catch
   * @private
   */
  private onMouseMove(event: MouseEvent): void {
    this.transform.x = event.clientX;
    this.transform.y = event.clientY;
    this.realTransform.x = event.pageX;
    this.realTransform.y = event.pageY;
    this.emit('mousemove');
  }

  /**
   * the function that is called when the scroll wheel is used
   * @param {WheelEvent} event - the wheel event to catch
   * @private
   */
  private onMouseWheel(event: WheelEvent): void {
    event.preventDefault();
    this.wheelTransform.x = event.deltaX;
    this.wheelTransform.y = event.deltaY;
    this.emit('wheel');
  }

  /**
   * return wether the button is enabled or not
   * @param {Button} button - the button to check its state
   * @returns {boolean}
   */
  public isEnabled(button: Button): boolean {
    if (this.registry.has(button.name)) {
      return button.isEnabled;
    }
    return false;
  }

  /**
   * return wether the button is pressed or not
   * @param {Button} button - the button to check its state
   * @returns {boolean}
   */
  public isPressed(button: Button): boolean {
    if (this.registry.has(button.name)) {
      return button.isDown;
    }
    return false;
  }

  /**
   * return wether the button is released or not
   * @param {Button} button - the button to check its state
   * @returns {boolean}
   */
  public isReleased(button: Button): boolean {
    if (this.registry.has(button.name)) {
      return button.isDown;
    }
    return false;
  }

  /**
   * clear all the registered data for the mouse buttons.
   */
  public clear() {
    this.registry.forEach((button) => button.clear());
    this.emit('clear');
  }

  /**
   * destroy the mouse event listener
   */
  public destroy() {
    window.removeEventListener('mousedown', this.mousedownHandler);
    window.removeEventListener('mouseup', this.mouseupHandler);
    window.removeEventListener('mousemove', this.mousemoveHandler);
    window.removeEventListener('wheel', this.mousewheelHandler);
  }

  /**
   * return the button name based on it's id
   * @param {number} id - the button id
   * @private
   * @returns {string}
   */
  private fetchButtonName(id: number): string {
    for (const [key, button] of this.registry.entries()) {
      if (button.id === id) {
        return key;
      }
    }
  }
}
