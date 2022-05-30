
import Vector2 from "math/Vector2";
import { utils } from "pixi.js";

// @TODO fix the whole system

/**
 * the class that handle mouse movement and interactions
 * @extends utils.EventEmitter
 */
export class Mouse extends utils.EventEmitter {

  private buttons = new Map<string, number>();

  private mousedownHandler: { (event: MouseEvent): void; (this: Window, ev: MouseEvent): void };
  private mouseupHandler: { (event: MouseEvent): void; (this: Window, ev: MouseEvent): void };
  private mousemoveHandler: {(event: MouseEvent): void; (this: Window, ev: MouseEvent): void}
  public realTransform = new Vector2(0,0);
  public transform = new Vector2(0,0);
  private buttonState = 0;
  private buttonType: number = null;

  /** @deprecated will be moved to the mouseKey class */
  private buttonStruct = {
    triggered: false,
    cancelled: false,
    moved: false,
    hovered: false,
    released: false,
    wheelX: 0,
    wheelY: 0
  }

  constructor() {
    super();
    this.setupEvents();
  }

  private setupEvents(): void {
    this.initMaps();
    this.mousedownHandler = (event: MouseEvent): void => this.onMouseDown(event);
    this.mouseupHandler = (event: MouseEvent): void => this.onMouseUp(event);
    this.mousemoveHandler = (event: MouseEvent): void => this.onMouseMove(event);
    
    window.addEventListener('mousedown', this.mousedownHandler);
    window.addEventListener('mouseup', this.mouseupHandler);
    window.addEventListener('mousemove', this.mousemoveHandler)
  }

  public addButton(key: string, value: number) {
    this.buttons.set(key, value);
  }

  private initMaps() {
    this.addButton('left', 0);
    this.addButton('middle', 1);
    this.addButton('right', 2);
  }

  private onMouseDown(event: MouseEvent): void {
    this.buttonState = 1;
    let key;
    if (event.button === this.buttons.get('left')) {
      key = this.buttons.get('left');
    }
    if (event.button === this.buttons.get('middle')) {
      key = this.buttons.get('middle');
    }
    if (event.button === this.buttons.get('right')) {
      key = this.buttons.get('right');
    }
    this.buttonType = key;
    this.emit('mousedown', key);
  }

  private onMouseUp(event: MouseEvent): void {
    this.buttonState = 0;
    let key;
    if (event.button === this.buttons.get('left')) {
      key = this.buttons.get('left');
    }
    if (event.button === this.buttons.get('middle')) {
      key = this.buttons.get('middle');
    }
    if (event.button === this.buttons.get('right')) {
      key = this.buttons.get('right');
    }
    this.buttonType = null;
    this.emit('mouseup', key);
  }

  private onMouseMove(event: MouseEvent): void {
    this.transform.x = event.clientX;
    this.transform.y = event.clientY;
    this.realTransform.x = event.pageX;
    this.realTransform.y = event.pageY;
    this.emit('mousemove');
  }


  public isMouseDown(): boolean {
    return this.buttonState === 1;
  }

  public isMouseUp(): boolean {
    return this.buttonState === 0;
  }

  public isLeftMousePressed(): boolean {
    return this.buttonType === this.buttons.get('left') && this.isMouseDown();
  }

  public isScrollPressed(): boolean {
    return this.buttonType === this.buttons.get('middle') && this.isMouseDown();
  }

  public isRightMousePressed() : boolean {
    return this.buttonType === this.buttons.get('right') && this.isMouseDown();
  }

  //
  public isLeftMouseReleased(): boolean {
    return this.buttonType === this.buttons.get('left') && this.isMouseUp();
  }

  public isScrollReleased(): boolean {
    return this.buttonType === this.buttons.get('middle') && this.isMouseUp();
  }

  public isRightMouseReleased() : boolean {
    return this.buttonType === this.buttons.get('right') && this.isMouseUp();
  }

}
