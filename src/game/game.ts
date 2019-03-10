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
import { ballConfig, polygonObstaclesConfig } from './config';
import { IObstacles } from './obstacles/types';
import { Obstacles } from './obstacles/obstacles';
import { IPolygon } from './polygon/types';
import { IGameScore } from './game-score/types';
import { GameScore } from './game-score/game-score';
import { ILives } from './lives/types';
import { Lives } from './lives/lives';

export class Game {
  private readonly canvas: ICanvas;
  private readonly ball: IBall;
  private readonly obstacles: IObstacles;
  private readonly collisionDetector: ICollisionDetector;
  private readonly collisionResponser: ICollisionResponser;
  private readonly gestureControls: IGestureControls;
  private readonly gameScore: IGameScore;
  private readonly lives: ILives;

  constructor() {
    this.canvas = new Canvas();
    this.ball = new Ball(ballConfig);
    this.obstacles = new Obstacles(
      polygonObstaclesConfig.polygonTops.map(poly => new Polygon(poly)),
      polygonObstaclesConfig.velocityX,
      polygonObstaclesConfig.velocityY,
      polygonObstaclesConfig.framesToNewObstacle,
      this.canvas.size,
    );
    this.collisionDetector = new CollisionDetector(
      this.ball,
      this.obstacles,
      this.canvasAsBorderPolygonObstacle(),
    );
    this.collisionResponser = new CollisionResponser(this.ball, this.obstacles);
    this.gestureControls = new GestureControls();
    this.gameScore = new GameScore();
    this.lives = new Lives();

    this.gestureControls.subscribe(this.ball.onGesture);
  }

  run = (): void => {
    this.canvas.clear();

    // 1) Gravity

    this.obstacles.polygons.forEach(this.canvas.drawObstacle);
    const collision = this.collisionDetector.checkObstacles();
    if (collision) {
      this.ball.setProps(this.collisionResponser.ballPropsAfterCollision(collision));
      this.lives.onCollision();
    } else {
      this.obstacles.update();
      this.ball.setProps({
        ...this.ball,
        x: this.ball.x + this.ball.velocityX,
        y: this.ball.y + this.ball.velocityY,
      });
    }

    this.canvas.drawBall(this.ball);
    this.canvas.drawGameScore(this.gameScore.score);
    this.canvas.drawLives(this.lives.current);

    this.gameScore.update();
    this.lives.onFrame();
    requestAnimationFrame(this.run);
  }

  // TODO: move to canvas
  private canvasAsBorderPolygonObstacle(): IPolygon {
    return new Polygon([
      { x: 0, y: 0 },
      { x: this.canvas.size.width, y: 0 },
      { x: this.canvas.size.width, y: this.canvas.size.height },
      { x: 0, y: this.canvas.size.height },
    ]);
  }
}
