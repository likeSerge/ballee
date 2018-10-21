export interface ICoordinate {
  readonly x: number;
  readonly y: number;
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
    x: point.x + normal.x * L,
    y: point.y + normal.y * L,
  };
}

export function isPointOnLine(
  point: ICoordinate,
  lineStart: ICoordinate,
  lineEnd: ICoordinate,
): boolean {
  const a = point.x >= Math.min(lineStart.x, lineEnd.x) &&
    point.x <= Math.max(lineStart.x, lineEnd.x) &&
    point.y >= Math.min(lineStart.y, lineEnd.y) &&
    point.y <= Math.max(lineStart.y, lineEnd.y);
  return a;
}

export function isPointInsideCircle(
  point: ICoordinate,
  circleCenter: ICoordinate,
  radius: number,
): boolean {
  const squaredDistanceCircleToPoint = (point.x - circleCenter.x) * (point.x - circleCenter.x) +
    (point.y - circleCenter.y) * (point.y - circleCenter.y);
  return squaredDistanceCircleToPoint < radius * radius;
}

export function translatePointThroughPoint(
  startPoint: ICoordinate,
  translationPoint: ICoordinate,
): ICoordinate {
  return {
    x: translationPoint.x - (startPoint.x - translationPoint.x),
    y: translationPoint.y - (startPoint.y - translationPoint.y),
  };
}
