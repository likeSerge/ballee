import { ICanvas } from './types';
import { IBall } from '../ball/types';

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

  drawABall(ball: IBall): void {
    const { x, y , radius } = ball;
    this.drawingContext.beginPath();
    this.drawingContext.arc(x, y, radius, 0, Math.PI * 2);
    this.drawingContext.fillStyle = '#dd6dce';
    this.drawingContext.fill();
    this.drawingContext.closePath();
  }

  clear(): void {
    this.drawingContext.clearRect(0, 0, this.width, this.height);
  }
}
