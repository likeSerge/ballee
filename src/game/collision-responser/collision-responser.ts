import { ICollisionResponser } from './types';
import { IBallCollision } from '../collision-detector/types';
import { IBallProps } from '../ball/types';
import {
  pointOnLineProjectionCoordinate,
  pointsOnLineAtDistance, squaredDistanceBetweenPoints,
  translatePointThroughPoint,
} from '../utils/geometry';
import { IPoint } from '../types';
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
      bounceCoef: this.ball.bounceCoef,
    };
  }

  private getNextCoordinates(
    ballCollision: IBallCollision,
  ): IPoint {
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

    return this.isBallMovingFromCollision(ballCollision)
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
    if (!this.isBallMovingFromCollision(ballCollision)) {
      return this.ball;
    }

    const mirroredBallPathFullDistancePoint = pointsOnLineAtDistance(
      ballCollision.ballCenterPoint,
      this.getMirroredPathLinePoint(ballCollision),
      this.ballPathLengthWithoutCollision * this.ball.bounceCoef,
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
    const movementFromObstaclePoints = pointsOnLineAtDistance(
      ballCollision.collisionPoint,
      ballCollision.ballCenterPoint,
      this.obstaclePathLength,
    );
    const movementFromObstacle = this.isObstacleMovingFromCollision(ballCollision)
      ? movementFromObstaclePoints.backPoint
      : movementFromObstaclePoints.forwardPoint;
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

  private getMirroredPathLinePoint(ballCollision: IBallCollision): IPoint {
    return translatePointThroughPoint(
      this.ball,
      pointOnLineProjectionCoordinate(
        this.ball, ballCollision.ballCenterPoint, ballCollision.collisionPoint,
      ));
  }

  private isBallMovingFromCollision(ballCollision: IBallCollision): boolean {
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

  private isObstacleMovingFromCollision(ballCollision: IBallCollision): boolean {
    const distanceToNormalCollisionTriangle2 = squaredDistanceBetweenPoints(
        ballCollision.collisionPoint, ballCollision.ballCenterPoint,
      ) +
      squaredDistanceBetweenPoints(
        { x: 0 , y: 0 },
        { x: this.obstacles.velocityX , y: this.obstacles.velocityY },
      );
    const distanceToRealCollisionTriangle2 = squaredDistanceBetweenPoints(
      ballCollision.ballCenterPoint,
      {
        x: ballCollision.collisionPoint.x + this.obstacles.velocityX,
        y: ballCollision.collisionPoint.y + this.obstacles.velocityY,
      },
    );
    return distanceToRealCollisionTriangle2 > distanceToNormalCollisionTriangle2;
  }
}
