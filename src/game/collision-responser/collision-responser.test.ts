import { CollisionResponser } from './collision-responser';
import { Polygon } from '../polygon/polygon';

// TODO: see comment in CollisionResponser.getNextCoordinates
describe('Collision responser', () => {
  test('It should find collision response, section collision', () => {
    const collisionResponser = new CollisionResponser(
      { x: 0, y: 7, radius: 2, velocityX: 5, velocityY: -2, bounceCoef: 1 },
      { velocityX: 0, velocityY: 0, polygons: [] },
    );
    const result = collisionResponser.ballPropsAfterCollision({
      ballCenterPoint: { x: 2.5, y: 6 },
      collisionPoint: { x: 2.5, y: 4 },
      isCanvasCollision: false,
    });

    expect(result).toEqual({
      x: 2.50928476690885,
      y: 6.00371390676354,
      radius: 2,
      velocityX: 5,
      velocityY: 2,
      bounceCoef: 1,
    });
  });

  test('It should find collision response, top collision bounced', () => {
    const collisionResponser = new CollisionResponser(
      { x: 6, y: 1, radius: 2, velocityX: -2, velocityY: 0, bounceCoef: 1 },
      {
        velocityX: 1,
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
    );
    const result = collisionResponser.ballPropsAfterCollision({
      ballCenterPoint: { x: 5, y: 1 },
      collisionPoint: { x: 3, y: 1 },
      isCanvasCollision: false,
    });

    expect(result).toEqual({
      x: 5.01,
      y: 1,
      radius: 2,
      velocityX: 3,
      velocityY: 0,
      bounceCoef: 1,
    });
  });

  test('It should find collision response, top chasing ball', () => {
    const collisionResponser = new CollisionResponser(
      { x: 6, y: 1, radius: 2, velocityX: 2, velocityY: 0, bounceCoef: 1 },
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
    );
    const result = collisionResponser.ballPropsAfterCollision({
      ballCenterPoint: { x: 5, y: 1 },
      collisionPoint: { x: 3, y: 1 },
      isCanvasCollision: false,
    });

    expect(result).toEqual({
      x: 4.99, // For top chasing ball we take back point, not forward(so -0.01)
      y: 1,
      radius: 2,
      velocityX: 5,
      velocityY: 0,
      bounceCoef: 1,
    });
  });

  test('It should find collision response, ball chasing section', () => {
    const collisionResponser = new CollisionResponser(
      { x: 6, y: 2, radius: 2, velocityX: 5, velocityY: 0, bounceCoef: 1 },
      {
        velocityX: -3,
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
    );
    const result = collisionResponser.ballPropsAfterCollision({
      ballCenterPoint: { x: 5, y: 2 },
      collisionPoint: { x: 3, y: 2 },
      isCanvasCollision: false,
    });

    expect(result).toEqual({
      x: 4.99, // For top chasing ball we take back point, not forward(so -0.01)
      y: 2,
      radius: 2,
      velocityX: 2,
      velocityY: 0,
      bounceCoef: 1,
    });
  });
});
