import { IPolygon, PolygonTops } from '../polygon/types';

export interface IObstaclesProps {
  readonly velocityX: number;
  readonly velocityY: number;
  polygons: IPolygon[];
}

export interface IObstacles extends IObstaclesProps {
  update: () => void;
}

export interface IObstaclesConfig {
  polygonTops: PolygonTops[];
  velocityX: number;
  velocityY: number;
  framesToNewObstacle: number;
}
