import { Container, LoaderResource, utils } from 'pixi.js';
import type Game from '../Game';

export default class Scene extends Container {
  public game: Game;

  public isReady: boolean = false;

  preload() {
    this.game.on('loaderComplete', this.create.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  start() {}

  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  create(_resources: utils.Dict<LoaderResource>) {
    this.isReady = true;
  }

  // eslint-disable-next-line no-unused-vars
  update(_dt: number): void {
    for (let i = 0; i < this.children.length; i += 1) {
      // @TODO Create entity class and assign Scene's children property the entity/any type
      // const child = this.children[i];
      // if (typeof child.update === 'function') {
      //   child.update(dt);
      // }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  resize(_width: number, _height: number) {}
}
