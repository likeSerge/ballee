import {
  isPointInsideCircle,
  isProjectionOnASection,
  translatePointThroughPoint,
  pointOnLineProjectionCoordinate,
  squaredDistanceBetweenPoints,
  twoSegmentsIntersection,
  degAngleBetweenIntersectedSegments,
  pointsOnLineAtDistance,
  parallelSectionsOnDistance,
  circleSegmentIntersection,
} from './geometry';

describe('Geometry utils', () => {

  test('It should isPointInsideCircle', () => {
    expect(() => isPointInsideCircle(
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      -1,
    ))
      .toThrow('isPointInsideCircle: radius should be >= 0');
    expect(isPointInsideCircle(
      { x: 0, y: 0 },
      { x: 5, y: 0 },
      5,
    ))
      .toBe(true);
    expect(isPointInsideCircle(
      { x: 0.01, y: 0 },
      { x: 0.025, y: 0 },
      0.015,
    ))
      .toBe(true);
    expect(isPointInsideCircle(
      { x: 25, y: 25 },
      { x: 0, y: 0 },
      25,
    ))
      .toBe(false);
  });

  test('It should squaredDistanceBetweenPoints', () => {
    expect(squaredDistanceBetweenPoints(
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ))
      .toBe(0);
    expect(squaredDistanceBetweenPoints(
      { x: 1, y: 0 },
      { x: 11, y: 0 },
    ))
      .toBe(100);
    expect(squaredDistanceBetweenPoints(
      { x: 5, y: 5 },
      { x: 7, y: 3 },
    ))
      .toBe(8);
  });

  test('It should isProjectionOnASection', () => {
    expect(isProjectionOnASection(
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ))
      .toBe(true);
    expect(isProjectionOnASection(
      { x: 7, y: 6 },
      { x: 2, y: 5 },
      { x: 12, y: 7 },
    ))
      .toBe(true);
    expect(isProjectionOnASection(
      { x: -0.1, y: 0 },
      { x: 0, y: 0 },
      { x: 3, y: 9 },
    ))
      .toBe(false);
  });

  test('It should translatePointThroughPoint', () => {
    expect(translatePointThroughPoint(
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ))
      .toEqual({ x: 2, y: 2 });
    expect(translatePointThroughPoint(
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ))
      .toEqual({ x: 0, y: 0 });
    expect(translatePointThroughPoint(
      { x: 0.1, y: 0 },
      { x: 0.2, y: 0 },
    ))
      .toEqual({ x: 0.3, y: 0 });
  });

  test('It should pointOnLineProjectionCoordinate', () => {
    expect(pointOnLineProjectionCoordinate(
      { x: 5, y: 5 },
      { x: 1, y: 1 },
      { x: 7, y: 3 },
    ))
      .toEqual({ x: 5.8, y: 2.6 });
  });

  test('It should pointOnLineProjectionCoordinate', () => {
    expect(pointOnLineProjectionCoordinate(
      { x: 5, y: 5 },
      { x: 1, y: 1 },
      { x: 7, y: 3 },
    ))
      .toEqual({ x: 5.8, y: 2.6 });
  });

  test('It should twoSegmentsIntersection', () => {
    expect(twoSegmentsIntersection(
      {
        start: { x: 5, y: 5 },
        end: { x: 5, y: 10 },
      },
      {
        start: { x: 7, y: 7 },
        end: { x: 7, y: 7 },
      },
    ))
      .toEqual(false);

    expect(twoSegmentsIntersection(
      {
        start: { x: 5, y: 5 },
        end: { x: 5, y: 10 },
      },
      {
        start: { x: 7, y: 10 },
        end: { x: 7, y: 7 },
      },
    ))
      .toEqual(false);

    expect(twoSegmentsIntersection(
      {
        start: { x: 0, y: 0 },
        end: { x: 7, y: 7 },
      },
      {
        start: { x: 2, y: 3 },
        end: { x: 3, y: 2 },
      },
    ))
      .toEqual({ x: 2.5, y: 2.5 });
  });

  test('It should degAngleBetweenIntersectedSegments', () => {
    expect(Math.round(degAngleBetweenIntersectedSegments(
      { x: 0, y: 0 },
      { x: 6, y: 0 },
      { x: 6, y: 3.46410161513775 },
    )))
      .toEqual(30);
  });

  test('It should pointsOnLineAtDistance', () => {
    expect(pointsOnLineAtDistance(
      { x: 0, y: 0 },
      { x: 5, y: 0 },
      3,
    ))
      .toEqual({
        forwardPoint: { x: 3, y: 0 },
        backPoint: { x: -3, y: 0 },
      });
  });

  test('It should parallelSectionsOnDistance', () => {
    const result = parallelSectionsOnDistance(
      { start: { x: 5, y: 3 }, end: { x: 10, y: 3 } },
      3,
    );
    expect(result).toEqual([
      { start: { x: 5, y: 0 }, end: { x: 10, y: 0 } },
      { start: { x: 5, y: 6 }, end: { x: 10, y: 6 } },
    ]);
  });

  test('It should circleSegmentIntersection', () => {
    const result = circleSegmentIntersection(
      { x: 2, y: 2 },
      3,
      { start: { x: 1, y: 6 }, end: { x: 6, y: 1 } },
    );
    expect(result).toEqual([
      { x: 2, y: 5 },
      { x: 5, y: 2 },
    ]);
  });

});
