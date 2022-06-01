/**
 * The default button mapping of a standard mouse
 * @enum 
 */
export enum MouseButton {
  LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2
}

/**
 * the class that shape the state of a mouse button
 * contrary to the keyboard, mouse button are integer based.
 * In this case we both have a name and a id to the button.
 * the name being an alias while the id is the true integer value
 */
export class Button {

  /**
   * the button real id.
   * @type {number}
   */
  public id: number;

  /**
   * the button name
   * @type {string}
   */
  public name: string;

  /**
   * wether the button is enabled or not
   * @type {boolean}
   */
  public isEnabled: boolean = true;

  /**
   * wether the button is pressed down or not
   */
  public isDown: boolean = false;

  /**
   * wether the button is released or not
   * @type {boolean}
   */
  public isUp: boolean = false;

  /**
   * wether the current event is captured and prevent default event to fire
   * @type {boolean}
   */
  public capture: boolean = false;

  /**
   * the number of frames that the button is pressed down
   * @type {number}
   */
  public timeDown: number = 0;

  /**
   * the number of frames that the button is released
   * @type {number}
   */
  public timeUp: number = 0;

  /**
   * create a new instance of a button
   * @param {string} name - the button name
   * @param {number} value - the button id
   */
  constructor(name: string, value: number) {
    this.name = name;
    this.id = value;
  }

  /**
   * the action to execute when a button is clicked
   * @param {MouseEvent} event - the event to fire 
   */
  public up(event: MouseEvent): void {
    if (!this.isEnabled) {
      return;
    }

    if (this.capture) {
      event.preventDefault();
    }
    this.timeUp = event.timeStamp;
    this.isDown = false;
    this.isUp = true;
  }

  /**
   * the action to execute when a button is released
   * @param {MouseEvent} event - the event to fire 
   */
  public down(event: MouseEvent): void {
    if (!this.isEnabled) {
      return;
    }


    if (this.capture) {
      event.preventDefault();
    }
    this.timeUp = event.timeStamp;
    this.isDown = true;
    this.isUp = false;
  }

  /**
   * clear the button data
   */
  public clear(): void {
    this.isDown = false;
    this.isUp = false;
  }
}
