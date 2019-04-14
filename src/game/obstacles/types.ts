import { IPolygon, PolygonTops } from '../polygon/types';

export interface IObstaclesProps {
  readonly velocityX: number;
  readonly velocityY: number;
  readonly polygons: IPolygon[];
}

export interface IObstacles extends IObstaclesProps {
  update(): void;
  clear(): void;
}

export interface IObstaclesConfig {
  readonly initialPolygonTops: PolygonTops[];
  readonly velocityX: number;
  readonly velocityY: number;
  readonly framesToNewObstacle: number;
}
