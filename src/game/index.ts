import { ICanvas } from './canvas/types';
import { Canvas } from './canvas/canvas';
import { IBall } from './ball/types';
import { Ball } from './ball/ball';
import { ICollisionDetector, ObstaclePath } from './collision-detector/types';
import { CollisionDetector } from './collision-detector/collision-detector';
import { Controls } from './controls/controls';
import { IControls, IGestureControls } from './controls/types';
import { GestureControls } from './controls/gesture-controls';

const obstaclePath: ObstaclePath = [
  { x: 10, y: 100 },
  { x: 150, y: 100 },
  { x: 150, y: 250 },
  { x: 10, y: 250 },
];

const obstaclePath2: ObstaclePath = [
  { x: 10, y: 300 },
  { x: 50, y: 270 },
  { x: 30, y: 350 },
];

const obstaclePath3: ObstaclePath = [
  { x: 70, y: 350 },
  { x: 100, y: 330 },
  { x: 200, y: 320 },
  { x: 125, y: 390 },
  { x: 80, y: 370 },
];

export class Game {
  private readonly canvas: ICanvas;
  private readonly ball: IBall;
  // private readonly controls: IControls;
  private readonly gestureControls: IGestureControls;
  private readonly collisionDetector: ICollisionDetector;

  constructor() {
    this.canvas = new Canvas();
    this.gestureControls = new GestureControls();
    this.ball = new Ball();
    // this.controls = new Controls(this.canvas, this.ball);
    this.collisionDetector = new CollisionDetector(this.ball, this.canvas);

    this.gestureControls.subscribe(this.ball.onGesture);
    this.collisionDetector.registerObstacle(obstaclePath);
    this.collisionDetector.registerObstacle(obstaclePath2);
    this.collisionDetector.registerObstacle(obstaclePath3);
  }

  start = (): void => {
    this.canvas.drawBall(this.ball);
    this.canvas.drawObstacle(obstaclePath);
    this.run();
  }

  run = (): void => {
    this.canvas.clear();

    this.ball.updatePosition();

    this.collisionDetector.checkBorders();
    this.collisionDetector.checkObstacles();

    this.canvas.drawObstacle(obstaclePath);
    this.canvas.drawObstacle(obstaclePath2);
    this.canvas.drawObstacle(obstaclePath3);
    this.canvas.drawBall(this.ball);

    requestAnimationFrame(this.run);
  }
}
