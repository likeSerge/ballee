import { IPolygon, PolygonTops } from '../polygon/types';
import { ISize } from '../canvas/types';

export interface IObstaclesProps {
  readonly velocityX: number;
  readonly velocityY: number;
  polygons: IPolygon[];
}

export interface IObstacles extends IObstaclesProps {
  update: (canvasSize: ISize) => void;
}

export interface IObstaclesConfig {
  polygonTops: PolygonTops[];
  velocityX: number;
  velocityY: number;
}
