import { IPoint } from '../types';

export interface IBallCollision {
  ballCenterPoint: IPoint;
  collisionPoint: IPoint;
  isCanvasCollision: boolean;
}

export interface ICollisionDetector {
  checkObstacles(): IBallCollision | false;
}
