

export default class Button {

  public name: string;
  public isEnabled: boolean = true;
  public isDown: boolean = false;
  public isUp: boolean = false;
  public capture: boolean = false;
  public timeDown: number = 0;
  public timeUp: number = 0;

  constructor(button: string) {
    this.name = button;
  }

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

  public down(event: MouseEvent): void {
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

  public clear(): void {
    this.isDown = false;
    this.isUp = false;
  }


}
