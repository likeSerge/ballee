import { IBall } from '../ball/types';
import { IPolygon } from '../polygon/types';

export interface ISize {
  readonly width: number;
  readonly height: number;
}

export interface ICanvas {
  readonly element: HTMLCanvasElement;
  readonly size: ISize;
  drawBall(ball: IBall): void;
  drawObstacle(polygon: IPolygon): void;
  drawGameScore(score: number): void;
  drawLives(lives: number): void;
  clear(): void;
}
