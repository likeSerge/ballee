import { CollisionResponser } from './collision-responser';

// TODO: see comment in CollisionResponser.getNextCoordinates
describe('Collision responser', () => {
  test('It should find collision response, section collision', () => {
    const collisionResponser = new CollisionResponser(
      { x: 0, y: 7, radius: 2, velocityX: 5, velocityY: -2 },
    );
    const result = collisionResponser.ballPropsAfterCollision({
      ballCenterPoint: { x: 2.5, y: 6 },
      collisionPoint: { x: 2.5, y: 4 },
    });

    expect(result).toEqual({
      x: 2.5092847669088525,
      y: 6.003713906763541,
      radius: 2,
      velocityX: 5,
      velocityY: 2,
    });
  });

  test('It should find collision response, top collision', () => {
    const collisionResponser = new CollisionResponser(
      { x: 11, y: 12, radius: 7, velocityX: 2, velocityY: -6 },
    );
    const result = collisionResponser.ballPropsAfterCollision({
      ballCenterPoint: { x: 12, y: 9 },
      collisionPoint: { x: 8, y: 3 },
    });

    expect(result).toEqual({
      x: 12.009973337235916,
      y: 9.000729756383116,
      radius: 7,
      velocityX: 6.307692307692307,
      velocityY: 0.46153846153847944,
    });
  });
});
