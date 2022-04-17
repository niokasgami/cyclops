export interface ILevel {
  id: number,
  name: string,
  width: number,
  height: number,
  bgColor: string,
  bgRelFilepath: string,
  layers: Array<ILevelLayer>,
}

export interface ITile {
  px: Array<number>
  src: Array<number>
  f: number
  t: number
  d: Array<number>
}

export interface ILevelLayer {
  name: string;
  layerId: number;
  visible: boolean;
  tiles: Array<ITile>;
}
