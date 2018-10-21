import { ICanvas } from './types';
import { IBall } from '../ball/types';
import { ObstaclePath } from '../collision-detector/types';
import { ICoordinate } from '../types';

export class Canvas implements ICanvas {
  readonly width: number;
  readonly height: number;
  readonly element: HTMLCanvasElement;
  private readonly drawingContext: CanvasRenderingContext2D;

  constructor() {
    this.element = document.getElementById('ballee-game') as HTMLCanvasElement;

    this.drawingContext = this.element.getContext('2d')!;
    this.width = this.element.width;
    this.height = this.element.height;
  }

  clear(): void {
    this.drawingContext.clearRect(0, 0, this.width, this.height);
  }

  drawBall(ball: IBall): void {
    const { x, y , radius } = ball;
    this.drawingContext.beginPath();
    this.drawingContext.arc(x, y, radius, 0, Math.PI * 2);
    this.drawingContext.fillStyle = '#dd6dce';
    this.drawingContext.fill();
    this.drawingContext.closePath();
  }

  drawObstacle(path: ObstaclePath): void {
    this.drawingContext.beginPath();
    path.forEach((point: ICoordinate, index: number) => {
      !index
        ? this.drawingContext.moveTo(point.x, point.y)
        : this.drawingContext.lineTo(point.x, point.y);
    });
    this.drawingContext.fillStyle = '#141ddd';
    this.drawingContext.fill();
  }
}
