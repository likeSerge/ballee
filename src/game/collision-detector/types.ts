import { ICoordinate } from '../types';

export type ObstaclePath = { 0: ICoordinate, 1: ICoordinate, 2: ICoordinate } & ICoordinate[];

// TODO: separate detection and update
export interface ICollisionDetector {
  registerObstacle(path: ObstaclePath): void;
  checkObstacles(): void;
  checkBorders(): void;
}
