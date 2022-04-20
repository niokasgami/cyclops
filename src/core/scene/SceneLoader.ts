import { utils } from 'pixi.js';
import type { IScene } from './IScene';

export default class SceneLoader extends utils.EventEmitter {
  private scenes: Map<string, IScene> = new Map();

  private currentScene: IScene;

  private lastScene: IScene;

  public has(scene: string | IScene) {
    const name = typeof scene === 'string' ? scene : scene.name;
    return this.scenes.has(name);
  }

  public get(name: string) {
    return this.scenes.get(name);
  }

  public add(scene: IScene, name?: string) {
    const key = name || scene.name;
    if (this.scenes.has(key)) {
      throw new Error(`Scene with key ${key} already exists`);
    }
    scene.setName(key);
    this.scenes.set(key, scene);
    this.emit('sceneAdd', scene);
  }

  public remove(scene: string | IScene) {
    const name = typeof scene === 'string' ? scene : scene.name;
    if (this.scenes.has(name)) {
      this.emit('remove', this.get(name));
      this.scenes.delete(name);
    }
  }

  public change(scene: IScene | string) {
    const newScene = typeof scene === 'string' ? this.get(scene) : scene;
    if (this.currentScene) {
      this.lastScene = this.currentScene;
    }
    this.currentScene = newScene;
    this.emit('change', this.currentScene, this.lastScene);
  }
}
