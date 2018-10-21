import { IBall } from '../ball/types';
import { ObstaclePath } from '../collision-detector/types';

export interface ICanvas {
  readonly element: HTMLCanvasElement;
  readonly width: number;
  readonly height: number;
  drawBall(ball: IBall): void;
  drawObstacle(path: ObstaclePath): void;
  clear(): void;
}
