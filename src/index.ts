import {
  Application, Loader, LoaderResource, Sprite, utils,
} from 'pixi.js';

export default class Game {
  private app: Application;

  // eslint-disable-next-line no-use-before-define
  private static game: Game;

  public constructor() {
    this.app = new Application({ width: 640, height: 480, backgroundColor: 0x000000 });
    document.body.appendChild(this.app.view);

    this.app.loader.add('gecko', 'assets/gecko.png');
    this.app.loader.load((loader, resources) => {
      this.onLoadComplete(loader, resources);
    });
    this.app.loader.load();
  }

  public static getInstance(): Game {
    if (!this.game) {
      this.game = new Game();
    }
    return this.game;
  }

  private onLoadComplete(loader: Loader, resources: utils.Dict<LoaderResource>): void {
    const gecko: Sprite = new Sprite(resources.gecko.texture);
    gecko.x = this.app.renderer.width / 2;
    gecko.y = this.app.renderer.height / 2;

    gecko.anchor.x = 0.5;
    gecko.anchor.y = 0.5;

    this.app.stage.addChild(gecko);

    this.app.ticker.add(() => {
      gecko.rotation -= 0.01;
    });
  }
}

window.onload = () => {
  Game.getInstance();
};
