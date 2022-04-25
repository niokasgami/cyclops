
/**
 * ==================================================================
 * Fable Maker Core - The core game engine developed by the creators of Fable Maker
 * 
 * Build Date: 2022-04-25, 2:39:59 p.m.
 * 
 * Version: undefined
 * 
 * ==================================================================
*/

var Cyclops = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __require = (x) => {
    if (typeof require !== "undefined")
      return require(x);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
  };

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    AssetLoader: () => AssetLoader_default,
    Entity: () => Entity_default,
    Game: () => Game_default,
    Key: () => Key_default,
    Keyboard: () => Keyboard_default,
    Scene: () => Scene_default,
    SceneLoader: () => SceneLoader_default,
    Tilemap: () => Tilemap_default,
    Window: () => Window_default,
    ldtkParser: () => ldtkParser_exports
  });

  // src/utils/ldtkParser.ts
  var ldtkParser_exports = {};
  __export(ldtkParser_exports, {
    fullParse: () => fullParse,
    parseLayers: () => parseLayers,
    parseLevels: () => parseLevels,
    parseTilesets: () => parseTilesets
  });
  function getTexture(filepath, resources) {
    const filename = filepath.split("/").pop();
    const key = filename.split(".")[0];
    const {texture} = resources[key];
    if (texture) {
      return texture;
    }
    return null;
  }
  function parseLevelLayers(levelLayers) {
    const layers = [];
    levelLayers.forEach((layer) => {
      layers.push({
        layerId: layer.layerDefUid,
        name: layer.__identifier,
        visible: layer.visible,
        tiles: layer.gridTiles
      });
    });
    return layers;
  }
  function parseLevels(data) {
    const levels = [];
    data.levels.forEach((level) => {
      levels.push({
        id: level.uid,
        name: level.identifier,
        width: level.pxWid,
        height: level.pxHei,
        bgColor: level.bgColor,
        bgRelFilepath: level.bgRelFilepath,
        layers: parseLevelLayers(level.layerInstances)
      });
    });
    return levels;
  }
  function parseLayers(data) {
    const layers = [];
    data.defs.layers.forEach((layer) => {
      layers.push({
        id: layer.uid,
        name: layer.identifier,
        type: layer.type,
        gridSize: layer.gridSize,
        tileWidth: layer.gridSize,
        tileHeight: layer.gridSize,
        tilesetId: layer.tilesetDefUid
      });
    });
    return layers;
  }
  function parseTilesets(data, resources) {
    const tilesets = [];
    data.defs.tilesets.forEach((tileset) => {
      tilesets.push({
        id: tileset.uid,
        name: tileset.identifier,
        relFilepath: tileset.relPath,
        width: tileset.pxWid,
        height: tileset.pxHei,
        gridSize: tileset.tileGridSize,
        tileWidth: tileset.tileGridSize,
        tileHeight: tileset.tileGridSize,
        texture: getTexture(tileset.relPath, resources)
      });
    });
    return tilesets;
  }
  function fullParse(key, resources) {
    const {data} = resources[key];
    const levels = parseLevels(data);
    const layers = parseLayers(data);
    const tilesets = parseTilesets(data, resources);
    return {levels, layers, tilesets};
  }

  // src/entity/Entity.ts
  var import_pixi = __toModule(__require("pixi.js"));
  var Entity = class extends import_pixi.Container {
    constructor(data, coords) {
      super();
      this.id = data.id;
      this.createSprite(data.sprite);
      const rect = data.collision;
      this.collider = new import_pixi.Rectangle(rect.x, rect.y, rect.width, rect.height);
      this.x = coords.x;
      this.y = coords.y;
    }
    setTexture(texture) {
      this.sprite.texture = texture;
    }
    createSprite(data) {
      const texture = data.filename;
      this.sprite = new import_pixi.Sprite(texture);
      this.addChild(this.sprite);
    }
    update(delta) {
      for (const child of this.children) {
        if (child.update) {
          child.update(delta);
        }
      }
    }
    onCollisionEnter(_signal) {
    }
    onCollisionExit(_signal) {
    }
  };
  var Entity_default = Entity;

  // src/Game.ts
  var import_pixi6 = __toModule(__require("pixi.js"));

  // src/core/Window.ts
  var import_pixi2 = __toModule(__require("pixi.js"));
  var Window = class {
    constructor() {
      this.emitter = new import_pixi2.utils.EventEmitter();
      this.appWindow = Window.isNwjs() ? nw.Window.get() : null;
      this.setupCanvas();
      this.setupEvents();
    }
    static getInstance() {
      if (!this.instance) {
        this.instance = new Window();
      }
      return this.instance;
    }
    on(event, listener) {
      this.emitter.on(event, listener);
    }
    setupEvents() {
      if (Window.isNwjs()) {
        this.appWindow.on("resize", this.resizeAndEmit.bind(this));
        this.appWindow.on("restore", this.resizeAndEmit.bind(this));
        this.appWindow.on("maximize", this.resizeAndEmit.bind(this));
        this.appWindow.on("focus", () => this.emitter.emit("focus"));
        this.appWindow.on("blur", () => this.emitter.emit("blur"));
        return;
      }
      window.addEventListener("resize", this.resizeAndEmit.bind(this));
      window.addEventListener("focus", () => this.emitter.emit("focus"));
      window.addEventListener("blur", () => this.emitter.emit("blur"));
    }
    setupCanvas() {
      document.body.style.margin = "0";
      this.canvas = document.getElementById("gameCanvas");
    }
    resizeAndEmit() {
      this.resizeCanvas(window.innerWidth, window.innerHeight);
      this.emitter.emit("resize", window.innerWidth, window.innerHeight);
    }
    resizeCanvas(width, height) {
      const pixelRatio = window.devicePixelRatio;
      const {canvas, ignoreDpi} = this;
      let newWidth = width;
      let newHeight = height;
      if (pixelRatio > 1 && ignoreDpi) {
        newWidth = Math.floor(width / pixelRatio);
        newHeight = Math.floor(height / pixelRatio);
      }
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;
    }
    setTitle(title) {
      if (Window.isNwjs()) {
        this.appWindow.title = title;
        return;
      }
      document.title = title;
    }
    static setIcon(iconUrl) {
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = iconUrl;
      document.head.appendChild(link);
    }
    enterFullscreen() {
      if (Window.isNwjs()) {
        this.appWindow.enterFullscreen();
        return;
      }
      if (this.canvas.requestFullscreen) {
        this.canvas.requestFullscreen();
      }
    }
    exitFullscreen() {
      if (Window.isNwjs()) {
        this.appWindow.leaveFullscreen();
        return;
      }
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    openDevTools() {
      if (Window.isNwjs()) {
        this.appWindow.showDevTools();
      }
    }
    closeDevTools() {
      if (Window.isNwjs()) {
        this.appWindow.closeDevTools();
      }
    }
    static isNwjs() {
      try {
        return typeof nw !== "undefined";
      } catch (e) {
        return false;
      }
    }
  };
  var Window_default = Window;

  // src/core/AssetLoader.ts
  var import_pixi3 = __toModule(__require("pixi.js"));
  var AssetLoader = class {
    static on(event, listener) {
      this.emitter.on(event, listener);
    }
    static getInstance() {
      return this.loader;
    }
    static get(asset) {
      return this.loader.resources[asset];
    }
    static addCharacters(filename) {
      this.add(filename, this.PATH.characters);
    }
    static addSystem(filename) {
      this.add(filename, this.PATH.systems);
    }
    static addMap(filename) {
      this.add(filename, `${this.PATH.data}/maps/`);
    }
    static add(filename, directory) {
      const url = `${this.rootPath}${directory}/${filename}`;
      const key = filename.split(".")[0];
      if (this.loader.resources[key]) {
        return;
      }
      this.loader.add(key, url);
    }
    static load() {
      this.loader.load((loader, resources) => {
        this.emitter.emit("complete", resources);
      });
      this.loader.onProgress.once((loader, resource) => {
        this.emitter.emit("progress", loader, resource);
      });
      this.loader.onError.once((loader, resource) => {
        this.emitter.emit("error", loader, resource);
      });
    }
  };
  AssetLoader.rootPath = "assets/";
  AssetLoader.loader = new import_pixi3.Loader();
  AssetLoader.emitter = new import_pixi3.utils.EventEmitter();
  AssetLoader.PATH = {
    characters: "characters/",
    systems: "systems/",
    data: "data/"
  };
  var AssetLoader_default = AssetLoader;

  // src/core/Input/Keyboard.ts
  var import_pixi4 = __toModule(__require("pixi.js"));
  var Keyboard = class extends import_pixi4.utils.EventEmitter {
    constructor() {
      super();
      this.keys = new Map();
      this.setupEvents();
    }
    setupEvents() {
      this.keydownHandler = (event) => this.onKeyDown(event);
      this.keyupHandler = (event) => this.onKeyUp(event);
      window.addEventListener("keydown", this.keydownHandler);
      window.addEventListener("keyup", this.keyupHandler);
    }
    addKey(key) {
      this.keys.set(key.name, key);
    }
    onKeyDown(event) {
      if (this.keys.has(event.key)) {
        const key = this.keys.get(event.key);
        key.down(event);
        this.emit("keydown", key);
      }
    }
    onKeyUp(event) {
      if (this.keys.has(event.key)) {
        const key = this.keys.get(event.key);
        key.up(event);
        this.emit("keyup", key);
      }
    }
    isKeyDown(key) {
      if (this.keys.has(key.name)) {
        return key.isDown;
      }
      return false;
    }
    isKeyUp(key) {
      if (this.keys.has(key.name)) {
        return key.isUp;
      }
      return false;
    }
    clear() {
      this.keys.forEach((key) => key.clear());
      this.emit("clear");
    }
    destroy() {
      window.removeEventListener("keydown", this.keydownHandler);
      window.removeEventListener("keyup", this.keyupHandler);
      this.clear();
    }
  };
  var Keyboard_default = Keyboard;

  // src/core/scene/SceneLoader.ts
  var import_pixi5 = __toModule(__require("pixi.js"));
  var SceneLoader = class extends import_pixi5.utils.EventEmitter {
    constructor() {
      super(...arguments);
      this.scenes = new Map();
    }
    has(scene) {
      const name = typeof scene === "string" ? scene : scene.name;
      return this.scenes.has(name);
    }
    get(name) {
      return this.scenes.get(name);
    }
    add(scene, name) {
      const key = name || scene.name;
      if (this.scenes.has(key)) {
        throw new Error(`Scene with key ${key} already exists`);
      }
      scene.setName(key);
      this.scenes.set(key, scene);
      this.emit("sceneAdd", scene);
    }
    remove(scene) {
      const name = typeof scene === "string" ? scene : scene.name;
      if (this.scenes.has(name)) {
        this.emit("remove", this.get(name));
        this.scenes.delete(name);
      }
    }
    change(scene) {
      const newScene = typeof scene === "string" ? this.get(scene) : scene;
      if (this.currentScene) {
        this.lastScene = this.currentScene;
      }
      this.currentScene = newScene;
      this.emit("change", this.currentScene, this.lastScene);
    }
  };
  var SceneLoader_default = SceneLoader;

  // src/Game.ts
  var Game = class extends import_pixi6.utils.EventEmitter {
    constructor() {
      super();
      this.keyboard = new Keyboard_default();
      this.setupWindow();
      this.setupRenderer();
      this.setupLoader();
      this.setupGameLoop();
    }
    setupWindow() {
      this.window = Window_default.getInstance();
      this.window.on("resize", this.onResize.bind(this));
      this.window.on("focus", this.onFocus.bind(this));
      this.window.on("blur", this.onBlur.bind(this));
    }
    setupRenderer() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.renderer = new import_pixi6.Renderer({
        width: this.width,
        height: this.height,
        backgroundColor: 0,
        view: Window_default.getInstance().canvas
      });
      document.body.appendChild(this.renderer.view);
    }
    setupLoader() {
      this.sceneLoader = new SceneLoader_default();
      this.sceneLoader.on("change", this.onChangeScene.bind(this));
      this.sceneLoader.on("remove", this.onSceneRemove.bind(this));
      AssetLoader_default.on("complete", this.onLoadComplete.bind(this));
      AssetLoader_default.on("progress", this.onLoadProgress.bind(this));
      AssetLoader_default.on("error", this.onLoadError.bind(this));
    }
    setupGameLoop() {
      this.ticker = new import_pixi6.Ticker();
      this.ticker.add(this.update.bind(this));
      this.ticker.start();
    }
    update(dt) {
      if (this.scene && this.scene.isReady) {
        this.scene.update(dt);
        this.renderer.render(this.scene);
      }
    }
    static getInstance() {
      if (!Game.instance) {
        Game.instance = new Game();
      }
      return Game.instance;
    }
    onChangeScene(scene, lastScene) {
      if (lastScene) {
        lastScene.exit();
      }
      this.scene = scene;
      if (this.scene.isReady) {
        return;
      }
      this.scene.game = Game.instance;
      this.scene.preload();
      AssetLoader_default.load();
    }
    onSceneRemove(_scene) {
      this.scene.exit();
    }
    onResize(width, height) {
      this.width = width;
      this.height = height;
      this.renderer.resize(width, height);
      if (this.scene) {
        this.scene.resize(width, height);
      }
    }
    onFocus() {
      this.ticker.start();
    }
    onBlur() {
      this.ticker.stop();
      this.keyboard.clear();
    }
    onLoadComplete(resources) {
      this.emit("loaderComplete", resources);
    }
    onLoadProgress(resources) {
      this.emit("loaderProgress", resources);
    }
    onLoadError(resources) {
      this.emit("loaderError", resources);
    }
  };
  var Game_default = Game;

  // src/core/scene/Scene.ts
  var import_pixi7 = __toModule(__require("pixi.js"));
  var Scene = class extends import_pixi7.Container {
    constructor() {
      super(...arguments);
      this.isReady = false;
    }
    setName(name) {
      this.name = name;
    }
    preload() {
      this.game.once("loaderComplete", this.create.bind(this));
    }
    start() {
    }
    create(_resources) {
      this.isReady = true;
    }
    update(_dt) {
      for (let i = 0; i < this.children.length; i += 1) {
      }
    }
    resize(_width, _height) {
    }
    exit() {
    }
  };
  var Scene_default = Scene;

  // src/core/Input/Key.ts
  var Key = class {
    constructor(key) {
      this.isEnabled = true;
      this.isDown = false;
      this.isUp = false;
      this.capture = false;
      this.timeDown = 0;
      this.timeUp = 0;
      this.name = key;
    }
    up(event) {
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
    down(event) {
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
    clear() {
      this.isDown = false;
      this.isUp = false;
    }
  };
  var Key_default = Key;

  // src/core/tilemap/Tilemap.ts
  var import_tilemap = __toModule(__require("@pixi/tilemap"));
  var import_pixi8 = __toModule(__require("pixi.js"));
  var Tilemap = class extends import_pixi8.Container {
    constructor(config) {
      super();
      this.tilesets = [];
      this.layers = [];
      this.config = config;
      this.tilesets = config.tilesets;
      this.layers = config.layers;
      this.level = config.level;
      this.createTilemap();
    }
    createTilemap() {
      this.tilemap = new import_tilemap.CompositeTilemap();
      this.populateTilemap();
      this.addChild(this.tilemap);
    }
    populateTilemap() {
      this.tilemap.clear();
      this.level.layers.reverse().forEach((levelLayer) => {
        const layerDef = this.layers.find((l) => l.id === levelLayer.layerId);
        if (layerDef.type !== "Tiles") {
          return;
        }
        const tileset = this.tilesets.find((t) => t.id === layerDef.tilesetId);
        const {texture} = tileset;
        levelLayer.tiles.forEach((tile) => {
          const x = tile.px[0];
          const y = tile.px[1];
          const tilesetX = tile.src[0];
          const tilesetY = tile.src[1];
          texture.frame = new import_pixi8.Rectangle(tilesetX, tilesetY, tileset.tileWidth, tileset.tileHeight);
          this.tilemap.tile(texture, x, y, {
            tileWidth: layerDef.tileWidth,
            tileHeight: layerDef.tileHeight
          });
        });
      });
    }
  };
  var Tilemap_default = Tilemap;
  return src_exports;
})();
//# sourceMappingURL=cyclops.js.map
