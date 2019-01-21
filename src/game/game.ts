import { ICanvas } from './canvas/types';
import { Canvas } from './canvas/canvas';
import { IBall } from './ball/types';
import { Ball } from './ball/ball';
import { ICollisionDetector } from './collision-detector/types';
import { CollisionDetector } from './collision-detector/collision-detector';
import { IGestureControls } from './gesture-controls/types';
import { GestureControls } from './gesture-controls/gesture-controls';
import { Polygon } from './polygon/polygon';
import { ICollisionResponser } from './collision-responser/types';
import { CollisionResponser } from './collision-responser/collision-responser';

const obstacle = new Polygon([
  { x: 10, y: 100 },
  { x: 150, y: 100 },
  { x: 150, y: 250 },
  { x: 10, y: 250 },
]);
const obstacle2 = new Polygon([
  { x: 10, y: 300 },
  { x: 50, y: 270 },
  { x: 30, y: 350 },
]);
const obstacle3 = new Polygon([
  { x: 70, y: 350 },
  { x: 100, y: 330 },
  { x: 200, y: 320 },
  { x: 125, y: 390 },
  { x: 80, y: 370 },
]);

export class Game {
  private readonly canvas: ICanvas;
  private readonly ball: IBall;
  private readonly gestureControls: IGestureControls;
  private readonly collisionDetector: ICollisionDetector;
  private readonly collisionResponser: ICollisionResponser;

  constructor() {
    this.canvas = new Canvas();
    this.gestureControls = new GestureControls();
    this.ball = new Ball();
    this.collisionDetector = new CollisionDetector(this.ball);
    this.collisionResponser = new CollisionResponser(this.ball);

    this.gestureControls.subscribe(this.ball.onGesture);
    this.collisionDetector.registerPolygonObstacle(obstacle);
    this.collisionDetector.registerPolygonObstacle(obstacle2);
    this.collisionDetector.registerPolygonObstacle(obstacle3);
    this.collisionDetector.registerPolygonObstacle(new Polygon([
      { x: 0, y: 0 },
      { x: this.canvas.size.width, y: 0 },
      { x: this.canvas.size.width, y: this.canvas.size.height },
      { x: 0, y: this.canvas.size.height },
    ]));
  }

  start = (): void => {
    this.canvas.drawBall(this.ball);
    this.run();
  }

  run = (): void => {
    this.canvas.clear();

    // 1) Gravity

    const collision = this.collisionDetector.checkObstacles();
    if (collision) {
      this.ball.setProps(this.collisionResponser.ballPropsAfterCollision(collision));
    } else {
      this.ball.setProps({
        ...this.ball,
        x: this.ball.x + this.ball.velocityX,
        y: this.ball.y + this.ball.velocityY,
      });
    }

    this.canvas.drawObstacle(obstacle);
    this.canvas.drawObstacle(obstacle2);
    this.canvas.drawObstacle(obstacle3);
    this.canvas.drawBall(this.ball);

    requestAnimationFrame(this.run);
  }
}
