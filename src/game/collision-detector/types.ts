import { IPolygon } from '../polygon/types';
import { ICoordinate } from '../types';

export interface IBallCollision {
  ballCenterPoint: ICoordinate;
  collisionPoint: ICoordinate;
}

export interface ICollisionDetector {
  registerPolygonObstacle(polygon: IPolygon): void;
  checkObstacles(): IBallCollision | false;
}
