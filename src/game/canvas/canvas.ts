import { ICanvas, ISize } from './types';
import { IBall } from '../ball/types';
import { IPolygon } from '../polygon/types';
import { IPoint } from '../types';

// TODO: minimize images with webpack
const ballImageSRC = require('./images/ball2.png');
const obstacleImageSRC = require('./images/obstacle2.jpg');

export class Canvas implements ICanvas {
  readonly size: ISize;
  readonly element: HTMLCanvasElement;
  private readonly drawingContext: CanvasRenderingContext2D;
  private readonly ballImage: HTMLImageElement = new Image();
  private readonly obstacleImage: HTMLImageElement = new Image();

  constructor() {
    this.element = document.getElementById('ballee-game') as HTMLCanvasElement;

    this.drawingContext = this.element.getContext('2d')!;
    this.size = {
      width: this.element.width,
      height: this.element.height,
    };
    this.ballImage.src = ballImageSRC;
    this.obstacleImage.src = obstacleImageSRC;
    this.drawingContext.font = '30px Arial';
  }

  clear(): void {
    this.drawingContext.clearRect(0, 0, this.size.width, this.size.height);
  }

  drawBall(ball: IBall): void {
    const { x, y , radius } = ball;

    this.drawingContext.drawImage(
      this.ballImage,
      x - radius,
      y - radius,
      radius * 2,
      radius * 2,
    );
  }

  drawObstacle = (polygon: IPolygon): void => {
    this.drawingContext.beginPath();
    polygon.tops.forEach((point: IPoint, index: number) => {
      !index
        ? this.drawingContext.moveTo(point.x, point.y)
        : this.drawingContext.lineTo(point.x, point.y);
    });
    // this.drawingContext.fillStyle = '#dd6dce';
    this.drawingContext.fillStyle = this.drawingContext.createPattern(
      this.obstacleImage,
      'repeat',
    )!;
    this.drawingContext.fill();
  }

  drawGameScore(score: number): void {
    this.drawingContext.strokeText(`POINTS: ${score}`, 10, 50);
  }

  drawLives(lives: number): void {
    this.drawingContext.strokeText(`LIVES: ${lives}`, 175, 50);
  }
}
