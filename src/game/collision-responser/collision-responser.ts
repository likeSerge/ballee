import { ICollisionResponser } from './types';
import { IBallCollision } from '../collision-detector/types';
import { IBallProps } from '../ball/types';
import {
  pointOnLineProjectionCoordinate,
  pointsOnLineAtDistance,
  translatePointThroughPoint,
} from '../utils/geometry';
import { ICoordinate } from '../types';

export class CollisionResponser implements ICollisionResponser {
  private readonly ball: IBallProps;

  constructor(ball: IBallProps) {
    this.ball = ball;
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

    return pointsOnLineAtDistance(
      ballCollision.ballCenterPoint,
      this.getMirroredPathLinePoint(ballCollision),
      ballPathLengthAfterCollision,
    ).forwardPoint;
  }

  private getNextVelocities(
    ballCollision: IBallCollision,
  ): { velocityX: number, velocityY: number } {
    const mirroredPathFullDistancePoint = pointsOnLineAtDistance(
      ballCollision.ballCenterPoint,
      this.getMirroredPathLinePoint(ballCollision),
      this.ballPathLengthWithoutCollision,
    ).forwardPoint;
    return {
      velocityX: mirroredPathFullDistancePoint.x - ballCollision.ballCenterPoint.x,
      velocityY: mirroredPathFullDistancePoint.y - ballCollision.ballCenterPoint.y,
    };
  }

  private get ballPathLengthWithoutCollision(): number {
    const { velocityX, velocityY } = this.ball;
    return Math.sqrt(velocityX * velocityX + velocityY * velocityY);
  }

  private getMirroredPathLinePoint(ballCollision: IBallCollision): ICoordinate {
    return translatePointThroughPoint(
      this.ball,
      pointOnLineProjectionCoordinate(
        this.ball, ballCollision.ballCenterPoint, ballCollision.collisionPoint,
      ));
  }
}
