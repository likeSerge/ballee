import { CollisionDetector } from './collision-detector';
import { Polygon } from '../polygon/polygon';

describe('Collision detection', () => {
  test('It should find collision detection point 90deg', () => {
    const collisionDetector = new CollisionDetector(
      { x: 2, y: 6, radius: 1, velocityX: 5, velocityY: -5 },
    );
    collisionDetector.registerPolygonObstacle(new Polygon([
      { x: 0, y: 0 },
      { x: 7, y: 7 },
      { x: 5, y: 3 },
    ]));
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual({
      ballCenterPoint: { x: 3.29289321881345, y: 4.70710678118655 },
      collisionPoint: { x: 4, y: 4 },
    });
  });

  test('It should find collision detection point 45deg', () => {
    const collisionDetector = new CollisionDetector(
      { x: 2, y: 7, radius: Math.sqrt(2), velocityX: 0, velocityY: -7 },
    );
    collisionDetector.registerPolygonObstacle(new Polygon([
      { x: 0, y: 0 },
      { x: 7, y: 7 },
      { x: 5, y: -1 },
    ]));
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual({
      ballCenterPoint: { x: 2, y: 4 },
      collisionPoint: { x: 3, y: 3 },
    });
  });

  test('It should find collision detection point -45deg', () => {
    const collisionDetector = new CollisionDetector(
      { x: 0, y: 3, radius: Math.sqrt(2), velocityX: 5, velocityY: 0 },
    );
    collisionDetector.registerPolygonObstacle(new Polygon([
      { x: 0, y: 0 },
      { x: 7, y: 7 },
      { x: 5, y: -1 },
    ]));
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual({
      ballCenterPoint: { x: 1, y: 3 },
      collisionPoint: { x: 2, y: 2 },
    });
  });

  test('It should find collision detection point, pass don\'t cross section', () => {
    const collisionDetector = new CollisionDetector(
      { x: 0, y: 7, radius: 2, velocityX: 5, velocityY: -2 },
    );
    collisionDetector.registerPolygonObstacle(new Polygon([
      { x: 5, y: 4 },
      { x: 5, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 4 },
    ]));
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual({
      ballCenterPoint: { x: 2.5, y: 6 },
      collisionPoint: { x: 2.5, y: 4 },
    });
  });

  test('It should find collision detection point, intersection with tops', () => {
    const collisionDetector = new CollisionDetector(
      { x: 11, y: 12, radius: 7, velocityX: 5, velocityY: -15 },
    );
    collisionDetector.registerPolygonObstacle(new Polygon([
      { x: -2, y: -2 },
      { x: -2, y: 3 },
      { x: 8, y: 3 },
      { x: 8, y:-2 },
    ]));
    const result = collisionDetector.checkObstacles();

    expect(result).toEqual({
      ballCenterPoint: { x: 12.111590127327489, y: 8.665229618017536 },
      collisionPoint: { x: 8, y: 3 },
    });
  });
});
