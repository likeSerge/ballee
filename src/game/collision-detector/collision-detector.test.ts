import { CollisionDetector } from './collision-detector';
import { Polygon } from '../polygon/polygon';

const ignoredCanvasObstacle = new Polygon([
  { x: -9999, y: -9999 },
  { x: 9999, y: -9999 },
  { x: 9999, y: 9999 },
  { x: -9999, y: 9999 },
]);

describe('Collision detection', () => {
  test('It should find collision detection point 90deg', () => {
    const collisionDetector = new CollisionDetector(
      { x: 2, y: 6, radius: 1, velocityX: 5, velocityY: -5 },
      {
        velocityX: 0,
        velocityY: 0,
        polygons: [
          new Polygon([
            { x: 0, y: 0 },
            { x: 7, y: 7 },
            { x: 5, y: 3 },
          ]),
        ],
      },
      ignoredCanvasObstacle,
    );
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual({
      ballCenterPoint: { x: 3.29289321881345, y: 4.70710678118655 },
      collisionPoint: { x: 4, y: 4 },
      isCanvasCollision: false,
    });
  });

  test('It should find collision detection point 45deg', () => {
    const collisionDetector = new CollisionDetector(
      { x: 2, y: 7, radius: Math.sqrt(2), velocityX: 0, velocityY: -7 },
      {
        velocityX: 0,
        velocityY: 0,
        polygons: [
          new Polygon([
            { x: 0, y: 0 },
            { x: 7, y: 7 },
            { x: 5, y: -1 },
          ]),
        ],
      },
      ignoredCanvasObstacle,
    );
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual({
      ballCenterPoint: { x: 2, y: 4 },
      collisionPoint: { x: 3, y: 3 },
      isCanvasCollision: false,
    });
  });

  test('It should find collision detection point -45deg', () => {
    const collisionDetector = new CollisionDetector(
      { x: 0, y: 3, radius: Math.sqrt(2), velocityX: 5, velocityY: 0 },
      {
        velocityX: 0,
        velocityY: 0,
        polygons: [
          new Polygon([
            { x: 0, y: 0 },
            { x: 7, y: 7 },
            { x: 5, y: -1 },
          ]),
        ],
      },
      ignoredCanvasObstacle,
    );
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual({
      ballCenterPoint: { x: 1, y: 3 },
      collisionPoint: { x: 2, y: 2 },
      isCanvasCollision: false,
    });
  });

  test('It should find collision detection point, pass don\'t cross section', () => {
    const collisionDetector = new CollisionDetector(
      { x: 0, y: 7, radius: 2, velocityX: 5, velocityY: -2 },
      {
        velocityX: 0,
        velocityY: 0,
        polygons: [
          new Polygon([
            { x: 5, y: 4 },
            { x: 5, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 4 },
          ]),
        ],
      },
      ignoredCanvasObstacle,
    );
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual({
      ballCenterPoint: { x: 2.5, y: 6 },
      collisionPoint: { x: 2.5, y: 4 },
      isCanvasCollision: false,
    });
  });

  test('It should find collision detection point, intersection with tops', () => {
    const collisionDetector = new CollisionDetector(
      { x: 11, y: 12, radius: 7, velocityX: 5, velocityY: -15 },
      {
        velocityX: 0,
        velocityY: 0,
        polygons: [
          new Polygon([
            { x: -2, y: -2 },
            { x: -2, y: 3 },
            { x: 8, y: 3 },
            { x: 8, y:-2 },
          ]),
        ],
      },
      ignoredCanvasObstacle,
    );
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual({
      ballCenterPoint: { x: 12.11159012732749, y: 8.66522961801754 },
      collisionPoint: { x: 8, y: 3 },
      isCanvasCollision: false,
    });
  });

  test('It should find collision detection point with moving obstacle', () => {
    const collisionDetector = new CollisionDetector(
      { x: 9, y: 1, radius: 1, velocityX: -5, velocityY: 0 },
      {
        velocityX: 3,
        velocityY: 0,
        polygons: [
          new Polygon([
            { x: 0, y: 0 },
            { x: 0, y: 3 },
            { x: 3, y: 3 },
            { x: 3, y: 0 },
          ]),
        ],
      },
      ignoredCanvasObstacle,
    );
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual({
      ballCenterPoint: { x: 4, y: 1 },
      collisionPoint: { x: 3, y: 1 },
      isCanvasCollision: false,
    });
  });

  test('It should find collision detection point with moving obstacle, tops', () => {
    const collisionDetector = new CollisionDetector(
      { x: 17.4, y: 203, radius: 15, velocityX: 2.366, velocityY: -0.64 },
      {
        velocityX: -2,
        velocityY: 0,
        polygons: [
          new Polygon([
            { x: 36, y: 100 },
            { x: 136, y: 100 },
            { x: 136, y: 200 },
            { x: 36, y: 200 },
          ]),
        ],
      },
      ignoredCanvasObstacle,
    );
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual({
      ballCenterPoint: { x: 21.18681668242773, y: 202.36 },
      collisionPoint: { x: 36, y: 200 },
      isCanvasCollision: false,
    });
  });

  test('It should find collision detection point with moving obstacle, tops 2', () => {
    const collisionDetector = new CollisionDetector(
      { x: 5, y: 4, radius: 5, velocityX: 0, velocityY: 1 },
      {
        velocityX: -2,
        velocityY: 0,
        polygons: [
          new Polygon([
            { x: 9.12057, y: 8.12057 },
            { x: 9.12057, y: 13 },
            { x: 14.12057, y: 13.12057 },
            { x: 14.12057, y: 8.12057 },
          ]),
        ],
      },
      ignoredCanvasObstacle,
    );
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual({
      ballCenterPoint: { x: 5.21390353418801, y: 5 },
      collisionPoint: { x: 9.12057, y: 8.12057 },
      isCanvasCollision: false,
    });
  });

  test('It should find collision detection point with moving obstacle, chasing tops', () => {
    const collisionDetector = new CollisionDetector(
      { x: 3, y: 3, radius: 1, velocityX: 5, velocityY: 5 },
      {
        velocityX: 1,
        velocityY: 3,
        polygons: [
          new Polygon([
            { x: 0, y: 0 },
            { x: 0, y: 2 },
            { x: 2, y: 2 },
            { x: 2, y: 0 },
          ]),
        ],
      },
      ignoredCanvasObstacle,
    );
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual(false);
  });
});
