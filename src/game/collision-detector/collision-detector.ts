import { IBallCollision, ICollisionDetector } from './types';
import { IBallProps } from '../ball/types';
import { ICoordinate } from '../types';
import {
  circleSegmentIntersection,
  isProjectionOnASection,
  parallelSectionsOnDistance,
  pointOnLineProjectionCoordinate,
  squaredDistanceBetweenPoints,
  twoPointHaveSameCoordinates,
  twoSegmentsIntersection,
} from '../utils/geometry';
import { IPolygon, ISection, PolygonTops } from '../polygon/types';

export class CollisionDetector implements ICollisionDetector {
  private readonly ball: IBallProps;
  private readonly polygonObstacles: IPolygon[] = [];

  constructor(ball: IBallProps) {
    this.ball = ball;
  }

  registerPolygonObstacle(polygon: IPolygon): void {
    this.polygonObstacles.push(polygon);
  }

  checkObstacles(): IBallCollision | false {
    const possibleCollisions: IBallCollision[] = [];
    this.polygonObstacles.forEach((obstacle: IPolygon) => {
      possibleCollisions.push(
        ...this.checkPolygon(obstacle),
      );
    });
    if (!possibleCollisions.length) {
      return false;
    }

    return possibleCollisions
      .reduce((acc: IBallCollision, cur: IBallCollision) => {
        const accToBall = squaredDistanceBetweenPoints(this.ball, acc.ballCenterPoint);
        const curToBall = squaredDistanceBetweenPoints(this.ball, cur.ballCenterPoint);
        return (curToBall < accToBall) ? cur : acc;
      });
  }

  private checkPolygon(polygon: IPolygon): IBallCollision[] {
    return [
      ...this.checkSections(polygon.sections)
        .filter((collision: IBallCollision) => {
          return !twoPointHaveSameCoordinates(this.ball, collision.ballCenterPoint);
        }),
      ...this.checkTops(polygon.tops)];
  }

  private checkSections(sections: ISection[]): IBallCollision[] {
    return sections.reduce(
      (result: IBallCollision[], section: ISection) => {
        parallelSectionsOnDistance(section, this.ball.radius)
          .forEach((parallelSection: ISection) => {
            const point = twoSegmentsIntersection(this.ballPathSection, parallelSection);
            if (point) {
              result.push({
                ballCenterPoint: point,
                collisionPoint: pointOnLineProjectionCoordinate(point, section.start, section.end),
              });
            }
          });
        return result;
      },
      [],
    );
  }

  private checkTops(tops: PolygonTops): IBallCollision[] {
    return tops.reduce(
      (result: IBallCollision[], top: ICoordinate) => {
        const intersections =
          circleSegmentIntersection(top, this.ball.radius, this.ballPathSection);
        if (intersections) {
          intersections
            .filter(point => isProjectionOnASection(
              point,
              this.ballPathSection.start,
              this.ballPathSection.end,
            ))
            .forEach((point: ICoordinate) => {
              result.push({
                ballCenterPoint: point,
                collisionPoint: top,
              });
            });
        }
        return result;
      },
      [],
    );
  }

  private get ballPathSection(): ISection {
    const { x, y, velocityX, velocityY } = this.ball;
    return {
      start: { x, y },
      end: { x: x + velocityX, y: y + velocityY },
    };
  }
}
