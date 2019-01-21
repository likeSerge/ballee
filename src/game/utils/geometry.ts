import { ICoordinate } from '../types';
import { truncateFraction } from './decimal';
import { ISection } from '../polygon/types';

export function isPointInsideCircle(
  point: ICoordinate,
  circleCenter: ICoordinate,
  radius: number,
): boolean {
  if (radius < 0) {
    throw new Error('isPointInsideCircle: radius should be >= 0');
  }
  const squaredDistanceCircleToPoint = (point.x - circleCenter.x) * (point.x - circleCenter.x) +
    (point.y - circleCenter.y) * (point.y - circleCenter.y);
  return truncateFraction(squaredDistanceCircleToPoint) <= truncateFraction(radius * radius);
}

export function squaredDistanceBetweenPoints(
  point1: ICoordinate,
  point2: ICoordinate,
): number {
  return truncateFraction(
    (point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y),
  );
}

export function isProjectionOnASection(
  point: ICoordinate,
  lineStart: ICoordinate,
  lineEnd: ICoordinate,
): boolean {
  return point.x >= Math.min(lineStart.x, lineEnd.x) &&
    point.x <= Math.max(lineStart.x, lineEnd.x) &&
    point.y >= Math.min(lineStart.y, lineEnd.y) &&
    point.y <= Math.max(lineStart.y, lineEnd.y);
}

export function translatePointThroughPoint(
  startPoint: ICoordinate,
  translationPoint: ICoordinate,
): ICoordinate {
  return {
    x: truncateFraction(translationPoint.x - (startPoint.x - translationPoint.x)),
    y: truncateFraction(translationPoint.y - (startPoint.y - translationPoint.y)),
  };
}

export function pointOnLineProjectionCoordinate(
  point: ICoordinate,
  lineStart: ICoordinate,
  lineEnd: ICoordinate,
): ICoordinate {
  const normal = { // Second point of normal line is (0, 0)
    x: lineEnd.y - lineStart.y,
    y: lineStart.x - lineEnd.x,
  };
  const L = (lineStart.x * lineEnd.y - lineEnd.x * lineStart.y + lineStart.y * point.x -
    lineEnd.y * point.x + lineEnd.x * point.y - lineStart.x * point.y) /
    (normal.x * (lineEnd.y - lineStart.y) + normal.y * (lineStart.x - lineEnd.x));

  return {
    x: truncateFraction(point.x + normal.x * L),
    y: truncateFraction(point.y + normal.y * L),
  };
}

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
export function twoSegmentsIntersection(
  section1: ISection,
  section2: ISection,
): ICoordinate | false {
  const { x: x1, y: y1 } = section1.start;
  const { x: x2, y: y2 } = section1.end;
  const { x: x3, y: y3 } = section2.start;
  const { x: x4, y: y4 } = section2.end;

  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }

  const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  // Lines are parallel
  if (denominator === 0) {
    return false;
  }

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }

  return {
    x: truncateFraction(x1 + ua * (x2 - x1)),
    y: truncateFraction(y1 + ua * (y2 - y1)),
  };
}

export function degAngleBetweenIntersectedSegments(
  intersection: ICoordinate,
  point1: ICoordinate,
  point2: ICoordinate,
) {
  const dAx = point1.x - intersection.x;
  const dAy = point1.y - intersection.y;
  const dBx = point2.x - intersection.x;
  const dBy = point2.y - intersection.y;
  let angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
  if (angle < 0) {
    angle = angle * -1;
  }
  return truncateFraction(angle * (180 / Math.PI));
}

export function pointsOnLineAtDistance(
  basePoint: ICoordinate,
  linePoint: ICoordinate,
  distance: number,
): { forwardPoint: ICoordinate, backPoint: ICoordinate } {
  const lineLength = Math.sqrt((linePoint.x - basePoint.x) * (linePoint.x - basePoint.x) +
    (linePoint.y - basePoint.y) * (linePoint.y - basePoint.y));
  return {
    forwardPoint: {
      x: basePoint.x - distance / lineLength * (basePoint.x - linePoint.x),
      y: basePoint.y - distance / lineLength * (basePoint.y - linePoint.y),
    },
    backPoint: {
      x: basePoint.x + distance / lineLength * (basePoint.x - linePoint.x),
      y: basePoint.y + distance / lineLength * (basePoint.y - linePoint.y),
    },
  };
}

export function parallelSectionsOnDistance(
  section: ISection,
  distance: number,
): [ ISection, ISection ] {
  const { start, end } = section;
  const normalFromZero = { // Second point of normal line is (0, 0)
    x: end.y - start.y,
    y: start.x - end.x,
  };
  const normalFromStartPoint = {
    x: normalFromZero.x + start.x,
    y: normalFromZero.y + start.y,
  };
  const normalFromEndPoint = {
    x: normalFromZero.x + end.x,
    y: normalFromZero.y + end.y,
  };
  const startPointsAtDistance = pointsOnLineAtDistance(start, normalFromStartPoint, distance);
  const endPointsAtDistance = pointsOnLineAtDistance(end, normalFromEndPoint, distance);

  return [
    { start: startPointsAtDistance.forwardPoint, end: endPointsAtDistance.forwardPoint },
    { start: startPointsAtDistance.backPoint, end: endPointsAtDistance.backPoint },
  ];
}

export function circleSegmentIntersection( // TODO: its line
  circleCenter: ICoordinate,
  radius: number,
  segment: ISection,
): [ ICoordinate, ICoordinate ] | false {
  const projectionPoint = pointOnLineProjectionCoordinate(
    circleCenter, segment.start, segment.end,
  );
  const squaredDistanceToProjection = squaredDistanceBetweenPoints(projectionPoint, circleCenter);
  if (
    // !isProjectionOnASection(projectionPoint, segment.start, segment.end) ||
    squaredDistanceToProjection > radius * radius
  ) {
    return false;
  }

  const projectionToIntersectionDistance = Math.sqrt(
  radius * radius - squaredDistanceToProjection,
  );
  const result = pointsOnLineAtDistance(
    projectionPoint,
    segment.start,
    projectionToIntersectionDistance,
  );
  return [result.forwardPoint, result.backPoint];
}

export function twoPointHaveSameCoordinates(point1: ICoordinate, point2: ICoordinate): boolean {
  return (point1.x === point2.x) && (point1.y === point2.y);
}