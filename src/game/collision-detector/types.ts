import { ICanvas } from '../canvas/types';
import { IBall } from '../ball/types';

export interface ICollisionDetector {
  checkBorders(canvas: ICanvas, ball: IBall): void;
}
