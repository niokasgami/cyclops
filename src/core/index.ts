import AssetLoader from './AssetLoader'
import Window from './Window'
import Scene from './scene/Scene';
import { IScene } from './scene/IScene';
import SceneLoader from './scene/SceneLoader';

import Tilemap from './tilemap/Tilemap';
import { ILevel } from './tilemap';
import { ILayer } from './tilemap';
import { ITilemapConfig } from './tilemap';
import { ITileset } from './tilemap';
import { ITile } from './tilemap';
/*
import Keyboard from './Input/Keyboard';
import Key from './Input/Key';
import { Mouse } from './Input/Mouse';
import Button from './Input/Button';
import { MouseButton } from './Input/Button';
*/
export * from './Input';


export {
  AssetLoader,
  Window,
  Scene,
  IScene,
  SceneLoader,
//  Keyboard,
//  Key,
  Tilemap,
  ILevel,
  ILayer,
  ITileset,
  ITile,
  ITilemapConfig,
//  Mouse,
//  Button,
//  MouseButton
}
