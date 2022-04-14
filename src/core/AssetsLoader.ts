import {Loader, LoaderResource, utils} from "pixi.js";

export default class AssetsLoader {

    public static rootPath = "assets/";

    private static _loader = new Loader();
    private static _emitter = new utils.EventEmitter();

    public static readonly PATH = {
        characters: "characters/",
        systems: "systems/"
    };


    public static addCharacters(filename: string) {
        this.add(filename, this.PATH.characters);
    }

    public static addSystem(filename: string) {
        this.add(filename, this.PATH.systems);
    }

    public static add(filename, directory) {
        const url = this.rootPath + directory;
        this._loader.add(filename, url);
    }

    /**
     * will load all the queued images
     */
    public static load() {
        this._loader.load((loader,resources) => {
            this._emitter.emit('complete',resources);
        });
    }


}