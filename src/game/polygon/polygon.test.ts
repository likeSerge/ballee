import { Polygon } from './polygon';
import { PolygonTops } from './types';

describe('Polygon', () => {
  const tops = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ] as PolygonTops;

  test('It should get tops', () => {
    const poly = new Polygon(tops);
    expect(poly.tops).toEqual(tops);
  });

  test('It should get sections', () => {
    const poly = new Polygon(tops);
    expect(poly.sections).toEqual([
      {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      },
      {
        start: { x: 1, y: 1 },
        end: { x: 2, y: 2 },
      },
      {
        start: { x: 2, y: 2 },
        end: { x: 0, y: 0 },
      },
    ]);
  });
});
