import { ICanvas } from './canvas/types';
import { Canvas } from './canvas/canvas';
import { IBall } from './ball/types';
import { Ball } from './ball/ball';
import { ICollisionDetector } from './collision-detector/types';
import { CollisionDetector } from './collision-detector/collision-detector';
import { Controls } from './controls/controls';
import { IControls } from './controls/types';

export class Game {
  private readonly canvas: ICanvas;
  private readonly ball: IBall;
  private readonly controls: IControls;
  private readonly collisionDetector: ICollisionDetector;

  constructor() {
    this.canvas = new Canvas();
    this.ball = new Ball();
    this.controls = new Controls(this.canvas, this.ball);
    this.collisionDetector = new CollisionDetector();
  }

  run = (): void => {
    if (!this.controls.isActive) {
      this.canvas.clear();

      this.canvas.drawABall(this.ball);
      this.ball.updatePosition();
      this.collisionDetector.checkBorders(this.canvas, this.ball);
    }

    requestAnimationFrame(this.run);
  }
}
