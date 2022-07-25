import { Loader, LoaderResource, utils } from "pixi.js";
import { sound } from "@pixi/sound";


export class AudioLoader {

  public static readonly rootPath = 'assets/audio/';
  private static loader = new Loader();
  private static emitter = new utils.EventEmitter();
  public static soundLoader = sound;

  public static readonly PATH = {
    bgm: 'bgm/',
    me: 'me/',
    se: 'se/',
  };

  public static on(event: string, listener: (...args: any[]) => void) {
    this.emitter.on(event, listener);
  }

  public static getInstance() {
    return this.loader;
  }

  public static get(asset: string): LoaderResource {
    return this.loader.resources[asset];
  }

  public static add(filename: string, directory: string) {
    const url = `${this.rootPath}${directory}/${filename}`;
    const key = filename.split('.')[0];
    if (this.loader.resources[key]) {
      return;
    }
    this.loader.add(key, url);
  }

  public static load(){
    this.loader.load((loader,resources)=> {
      this.emitter.emit('complete',resources);
    });

    this.loader.onProgress.once((loader, resource) => {
      this.emitter.emit('progress', loader, resource);
    });

    this.loader.onError.once((loader, resource) => {
      this.emitter.emit('error', loader, resource);
    });
  }

  public static playBgm(name: string, volume = 1){
    const bgm = this.get(name).sound;
    console.log(bgm);
   // bgm.volume = volume;
   // bgm.loop = true;
   // bgm.play();
  }
  

}
