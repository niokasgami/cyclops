import { Container, LoaderResource, utils } from 'pixi.js';
import { IScene } from './IScene';
import type Game from '../../Game';

export default class Scene extends Container implements IScene {
  public game: Game;

  public isReady: boolean = false;

  public setName(name: string) {
    this.name = name;
  }

  public preload() {
    this.game.once('loaderComplete', this.create.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  public start() {}

  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  public create(_resources: utils.Dict<LoaderResource>) {
    this.isReady = true;
  }

  // eslint-disable-next-line no-unused-vars
  public update(_dt: number): void {
    for (let i = 0; i < this.children.length; i += 1) {
      // @TODO Create entity class and assign Scene's children property the entity/any type
      // const child = this.children[i];
      // if (typeof child.update === 'function') {
      //   child.update(dt);
      // }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public resize(_width: number, _height: number) {}

  // eslint-disable-next-line class-methods-use-this
  public exit() {}
}
