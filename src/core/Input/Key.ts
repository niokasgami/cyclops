export default class Key {
  public name: string;

  public isEnabled: boolean = true;

  public isDown: boolean = false;

  public isUp: boolean = false;

  public capture: boolean = false;

  public timeDown: number = 0;

  public timeUp: number = 0;

  constructor(key: string) {
    this.name = key;
  }

  public up(event: KeyboardEvent): void {
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

  public down(event: KeyboardEvent): void {
    if (!this.isEnabled) {
      return;
    }

    if (this.capture) {
      event.preventDefault();
    }

    this.timeDown = event.timeStamp;
    this.isDown = true;
    this.isUp = false;
  }

  public clear(): void {
    this.isDown = false;
    this.isUp = false;
  }
}
