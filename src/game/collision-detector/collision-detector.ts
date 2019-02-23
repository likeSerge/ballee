import { IBallCollision, ICollisionDetector } from './types';
import { IBallProps } from '../ball/types';
import { ICoordinate } from '../types';
import {
  parallelSectionsOnDistance,
  pointOnLineProjectionCoordinate,
  squaredDistanceBetweenPoints,
  twoPointHaveSameCoordinates,
  twoSegmentsIntersection,
  circleSegmentIntersection,
} from '../utils/geometry';
import { IPolygon, ISection, PolygonTops } from '../polygon/types';
import { IObstaclesProps } from '../obstacles/types';

export class CollisionDetector implements ICollisionDetector {
  constructor(
    private readonly ball: IBallProps,
    private readonly obstacles: IObstaclesProps,
    private readonly canvasObstacle: IPolygon,
  ) {}

  checkCanvas(): IBallCollision | false {
    const sectionsCollisions = this.checkSections(this.canvasObstacle.sections, true);
    return sectionsCollisions.length > 0 &&
      sectionsCollisions.reduce((acc: IBallCollision, cur: IBallCollision) => {
        const accToBall = squaredDistanceBetweenPoints(this.ball, acc.ballCenterPoint);
        const curToBall = squaredDistanceBetweenPoints(this.ball, cur.ballCenterPoint);
        return (curToBall < accToBall) ? cur : acc;
      });
  }

  checkObstacles(): IBallCollision | false {
    const possibleCollisions: IBallCollision[] = [];

    this.obstacles.polygons.forEach((obstacle: IPolygon) => {
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
      ...this.checkTops(polygon.tops),
    ];
  }

  private checkSections(
    sections: ISection[],
    isCanvas: boolean = false,
  ): IBallCollision[] {
    return sections.reduce(
      (result: IBallCollision[], section: ISection) => {
        parallelSectionsOnDistance(section, this.ball.radius)
          .forEach((parallelSection: ISection) => {
            const point = twoSegmentsIntersection(this.ballPathSection, parallelSection)
              || !isCanvas && twoSegmentsIntersection(
                this.ballPathEquivalentToObstacleMovement,
                parallelSection,
              );
            if (point) {
              result.push({
                ballCenterPoint: point,
                collisionPoint: pointOnLineProjectionCoordinate(point, section.start, section.end),
                isCanvasCollision: isCanvas,
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
        const intersections = [
          ...circleSegmentIntersection(top, this.ball.radius, this.ballPathSection),
          ...circleSegmentIntersection(
            top,
            this.ball.radius,
            this.ballPathEquivalentToObstacleMovement,
          ),
        ];
        intersections.forEach((point: ICoordinate) => {
          result.push({
            ballCenterPoint: point,
            collisionPoint: top,
            isCanvasCollision: false,
          });
        });

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

  // TODO: collision point lies on obstacle before movement in current realization
  // Need to decide, if we need more accuracy here
  /**
   * obst----->
   *    |    |
   *    |  <-----ball
   *    |    x          - real collision point(between ball's and obstacle's path)
   *    x               - calculated collision point(on obstacle)
   */
  private get ballPathEquivalentToObstacleMovement(): ISection {
    return {
      start: this.ballPathSection.end,
      end: {
        x: this.ballPathSection.end.x - this.obstacles.velocityX,
        y: this.ballPathSection.end.y - this.obstacles.velocityY,
      },
    };
  }
}
