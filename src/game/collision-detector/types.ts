import { ICoordinate } from '../types';

export interface IBallCollision {
  ballCenterPoint: ICoordinate;
  collisionPoint: ICoordinate;
}

export interface ICollisionDetector {
  checkObstacles(): IBallCollision | false;
}
