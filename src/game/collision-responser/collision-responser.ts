import { ICollisionResponser } from './types';
import { IBallCollision } from '../collision-detector/types';
import { IBallProps } from '../ball/types';
import {
  pointOnLineProjectionCoordinate,
  pointsOnLineAtDistance, squaredDistanceBetweenPoints,
  translatePointThroughPoint,
} from '../utils/geometry';
import { ICoordinate } from '../types';
import { IObstaclesProps } from '../obstacles/types';

export class CollisionResponser implements ICollisionResponser {
  private readonly ball: IBallProps;
  private readonly obstacles: IObstaclesProps;

  constructor(ball: IBallProps, obstacles: IObstaclesProps) {
    this.ball = ball;
    this.obstacles = obstacles;
  }

  ballPropsAfterCollision(ballCollision: IBallCollision): IBallProps {
    return {
      ...this.getNextCoordinates(ballCollision),
      ...this.getNextVelocities(ballCollision),
      radius: this.ball.radius,
    };
  }

  private getNextCoordinates(
    ballCollision: IBallCollision,
  ): ICoordinate {
    /* TODO: on full length after bounce, it can be other collision
    *  Hardcoded to small value to bounce a little, can stick to
     *  collided surface without it*/
    // const ballPathLengthBeforeCollision = Math.sqrt(
    //   squaredDistanceBetweenPoints(this.ball, ballCollision.ballCenterPoint),
    // );
    // const ballPathLengthAfterCollision =
    //   this.ballPathLengthWithoutCollision - ballPathLengthBeforeCollision;
    const ballPathLengthAfterCollision = 0.01;
    const possibleBallCentersAfterCollision = pointsOnLineAtDistance(
      ballCollision.ballCenterPoint,
      this.getMirroredPathLinePoint(ballCollision),
      ballPathLengthAfterCollision,
    );

    return this.isBouncedCollision(ballCollision)
      ? possibleBallCentersAfterCollision.forwardPoint
      : possibleBallCentersAfterCollision.backPoint;
  }

  private getNextVelocities(
    ballCollision: IBallCollision,
  ): { velocityX: number, velocityY: number } {
    const rawNextVelocities = this.getRawNextVelocities(ballCollision);

    return ballCollision.isCanvasCollision
      ? rawNextVelocities
      : this.updateWithObstacleVelocities(rawNextVelocities, ballCollision);
  }

  private getRawNextVelocities(
    ballCollision: IBallCollision,
  ): { velocityX: number, velocityY: number } {
    if (!this.isBouncedCollision(ballCollision)) {
      return this.ball;
    }

    const mirroredBallPathFullDistancePoint = pointsOnLineAtDistance(
      ballCollision.ballCenterPoint,
      this.getMirroredPathLinePoint(ballCollision),
      this.ballPathLengthWithoutCollision,
    ).forwardPoint;

    return {
      velocityX: mirroredBallPathFullDistancePoint.x - ballCollision.ballCenterPoint.x,
      velocityY: mirroredBallPathFullDistancePoint.y - ballCollision.ballCenterPoint.y,
    };
  }

  private updateWithObstacleVelocities(
    velocities: { velocityX: number, velocityY: number },
    ballCollision: IBallCollision,
  ): { velocityX: number, velocityY: number } {
    const movementFromObstacle = pointsOnLineAtDistance(
      ballCollision.collisionPoint,
      ballCollision.ballCenterPoint,
      this.obstaclePathLength,
    ).forwardPoint;
    return {
      velocityX: velocities.velocityX + (movementFromObstacle.x - ballCollision.collisionPoint.x),
      velocityY: velocities.velocityY + (movementFromObstacle.y - ballCollision.collisionPoint.y),
    };
  }

  private get ballPathLengthWithoutCollision(): number {
    const { velocityX, velocityY } = this.ball;
    return this.getDistanceByVelocities(velocityX, velocityY);
  }

  private get obstaclePathLength(): number {
    const { velocityX, velocityY } = this.obstacles;
    return this.getDistanceByVelocities(velocityX, velocityY);
  }

  private getDistanceByVelocities(velocityX: number, velocityY: number): number {
    return Math.sqrt(velocityX * velocityX + velocityY * velocityY);
  }

  private getMirroredPathLinePoint(ballCollision: IBallCollision): ICoordinate {
    return translatePointThroughPoint(
      this.ball,
      pointOnLineProjectionCoordinate(
        this.ball, ballCollision.ballCenterPoint, ballCollision.collisionPoint,
      ));
  }

  private isBouncedCollision(ballCollision: IBallCollision): boolean {
    if (!this.ball.velocityX && !this.ball.velocityY) {
      return true;
    }

    const ballToCollisionPointDistance2 = squaredDistanceBetweenPoints(
      ballCollision.collisionPoint,
      this.ball,
    );
    const ballToCollisionPointDistanceAfterMovement2 = squaredDistanceBetweenPoints(
      ballCollision.collisionPoint,
      pointsOnLineAtDistance(
        this.ball,
        {
          x: this.ball.x + this.ball.velocityX,
          y: this.ball.y + this.ball.velocityY,
        },
        0.01,
      ).forwardPoint,
    );
    return ballToCollisionPointDistance2 >= ballToCollisionPointDistanceAfterMovement2;
  }
}
