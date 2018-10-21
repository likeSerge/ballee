import { ICollisionDetector, ObstaclePath } from './types';
import { ICanvas } from '../canvas/types';
import { IBall } from '../ball/types';
import {
  ICoordinate,
  pointOnLineProjectionCoordinate,
  isPointOnLine,
  isPointInsideCircle,
  translatePointThroughPoint,
} from '../types';

export class CollisionDetector implements ICollisionDetector {
  private readonly ball: IBall;
  private readonly canvas: ICanvas;
  private readonly obstacles: ObstaclePath[] = [];

  constructor(ball: IBall, canvas: ICanvas) {
    this.ball = ball;
    this.canvas = canvas;
  }

  registerObstacle(path: ObstaclePath): void {
    this.obstacles.push(path);
  }

  checkObstacles(): void {
    this.obstacles.forEach((obstacle: ObstaclePath) => {
      this.checkTops(obstacle);
      this.getObstacleLines(obstacle).forEach(line => this.checkLine(line.start, line.end));
    });
  }

  // TODO: class Obstacle
  // TODO: cache
  private getObstacleLines(obstacleTops: ObstaclePath): {start: ICoordinate, end: ICoordinate}[] {
    const result = [];
    for (let i = 1; i < obstacleTops.length; i += 1) {
      result.push({
        start: obstacleTops[i - 1],
        end: obstacleTops[i],
      });
    }
    result.push({
      start: obstacleTops[0],
      end: obstacleTops[obstacleTops.length - 1],
    });
    return result;
  }

  private checkTops(obstacle: ObstaclePath): boolean {
    const { x, y, radius } = this.ball;
    obstacle.forEach((point: ICoordinate) => {
      if (isPointInsideCircle(point, { x, y }, radius)) {
        this.responseOnCollision(point);
        return true;
      }
    });
    return false;
  }

  private checkLine(startPoint: ICoordinate, endPoint: ICoordinate): void {
    const { x, y, radius } = this.ball;
    const projection = pointOnLineProjectionCoordinate({ x, y }, startPoint, endPoint);
    if (
      !isPointOnLine(projection, startPoint, endPoint) ||
      !isPointInsideCircle(projection, { x, y }, radius)
    ) {
      return;
    }

    this.responseOnCollision(projection);
  }

  private responseOnCollision(collisionPoint: ICoordinate): void {
    const nextVelocities = this.calculateNewVelocities(collisionPoint);
    const nextCenterCoordinates = this.calculateNewCenterCoordinate(collisionPoint);

    this.ball.onCollision({
      dVelocityX: nextVelocities.velocityX - this.ball.velocityX,
      dVelocityY: nextVelocities.velocityY - this.ball.velocityY,
      dX: nextCenterCoordinates.x - this.ball.x,
      dY: nextCenterCoordinates.y - this.ball.y,
    });
  }

  private calculateNewVelocities(
    collisionPoint: ICoordinate,
  ): {velocityX: number, velocityY: number} {
    const currentVelocityVector = {
      x: collisionPoint.x - this.ball.velocityX * this.ball.bounceEnergyLeft,
      y: collisionPoint.y - this.ball.velocityY * this.ball.bounceEnergyLeft,
    };
    const currentOnNormalProjection = pointOnLineProjectionCoordinate(
      currentVelocityVector,
      { x: this.ball.x, y: this.ball.y },
      collisionPoint,
    );
    const reflectedVelocityVector = translatePointThroughPoint(
      currentVelocityVector,
      currentOnNormalProjection,
    );

    return {
      velocityX: reflectedVelocityVector.x - collisionPoint.x,
      velocityY: reflectedVelocityVector.y - collisionPoint.y,
    };
  }

  private calculateNewCenterCoordinate(collisionPoint: ICoordinate): ICoordinate {
    // Rab = sqrt((Xb-Xa)^2 + (Yb-Ya)^2)
    // k = Rac / Rab
    // Xc = Xa + (Xb-Xa)*k
    // Yc = Ya + (Yb-Ya)*k
    const { x, y, radius } = this.ball;
    const centerToCollisionLength = Math.sqrt(
      (x - collisionPoint.x) * (x - collisionPoint.x) +
      (y - collisionPoint.y) * (y - collisionPoint.y),
    );
    const extensionCoefficient = radius / centerToCollisionLength;
    return {
      x: collisionPoint.x + (x - collisionPoint.x) * extensionCoefficient,
      y: collisionPoint.y + (y - collisionPoint.y) * extensionCoefficient,
    };
  }

  checkBorders(): void {
    this.checkBottomBorder();
    this.checkLeftBorder();
    this.checkRightBorder();
  }

  private checkBottomBorder(): void {
    if (this.ball.y + this.ball.radius >= this.canvas.height) {
      const dY = (this.canvas.height - this.ball.radius) - this.ball.y;
      // TODO: check math
      const dVelocityY = - (
        this.ball.velocityY + // compensate
        this.ball.bounceEnergyLeft * this.ball.velocityY + // new velocity after bounce
        dY / this.ball.velocityY // compensate dY non-zero shift
      );
      this.ball.onCollision({
        dY,
        dVelocityY,
        dVelocityX: - this.ball.velocityX * (1 - this.ball.rollEnergyLeft),
        dX: 0,
      });
    }
  }

  private checkLeftBorder(): void {
    if (this.ball.x - this.ball.radius <= 0) {
      this.ball.onCollision({
        dVelocityX: - 2 * this.ball.velocityX * this.ball.bounceEnergyLeft,
        dVelocityY: - this.ball.velocityY * (1 - this.ball.rollEnergyLeft),
        dX: this.ball.radius - this.ball.x,
        dY: 0,
      });
    }
  }

  private checkRightBorder(): void {
    if (this.ball.x + this.ball.radius >= this.canvas.width) {
      this.ball.onCollision({
        dVelocityX: - 2 * this.ball.velocityX * this.ball.bounceEnergyLeft,
        dVelocityY: - this.ball.velocityY * (1 - this.ball.rollEnergyLeft),
        dX: (this.canvas.width - this.ball.radius) - this.ball.x,
        dY: 0,
      });
    }
  }
}
