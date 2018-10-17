import { IControls } from './types';
import { ICanvas } from '../canvas/types';
import { IBall } from '../ball/types';

interface ICoordinate2D {
  x: number;
  y: number;
}

export class Controls implements IControls {
  isActive = false;
  private readonly canvas: ICanvas;
  private readonly ball: IBall;
  private startPoint = { x: 0, y: 0 };

  constructor(canvas: ICanvas, ball: IBall) {
    this.canvas = canvas;
    this.ball = ball;
    document.addEventListener('mousedown', this.startMovement);
    document.addEventListener('touchstart', this.startMovement);
    document.addEventListener('mouseup', this.endMovement);
    document.addEventListener('touchend', this.endMovement);
  }

  check(): void {

  }

  private startMovement = (e: TouchEvent): void => {
    const x = e.touches[0].pageX - this.canvas.element.offsetLeft;
    const y = e.touches[0].pageY - this.canvas.element.offsetTop;
    this.startPoint = { x, y };
    if (pointInCircle(x, y, this.ball)) {
      this.isActive = true;
    }
  }

  private endMovement = (e: TouchEvent): void => {
    if (!this.isActive) {
      return;
    }
    const x = e.changedTouches[0].pageX - this.canvas.element.offsetLeft;
    const y = e.changedTouches[0].pageY - this.canvas.element.offsetTop;

    this.ball.onCollision({
      dX: 0,
      dY: 0,
      dVelocityX: - (x - this.startPoint.x) / 10,
      dVelocityY: - (y - this.startPoint.y) / 10,
    });

    this.isActive = false;
  }
}

// x,y is the point to test
// cx, cy is circle center, and radius is circle radius
function pointInCircle(x: number, y: number, ball: IBall) {
  const distanceSquared = (x - ball.x) * (x - ball.x) + (y - ball.y) * (y - ball.y);
  return distanceSquared <= ball.radius * ball.radius;
}
