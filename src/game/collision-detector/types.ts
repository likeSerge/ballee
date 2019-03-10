import { ICoordinate } from '../types';

export interface IBallCollision {
  ballCenterPoint: ICoordinate;
  collisionPoint: ICoordinate;
  isCanvasCollision: boolean;
}

export interface ICollisionDetector {
  checkObstacles(): IBallCollision | false;
}
