import { IBall } from '../ball/types';

export interface ICanvas {
  readonly element: HTMLCanvasElement;
  readonly width: number;
  readonly height: number;
  drawABall(ball: IBall): void;
  clear(): void;
}
