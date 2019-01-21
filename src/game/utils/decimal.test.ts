import { truncateFraction } from './decimal';

describe('Decimal utils', () => {
  test('It should truncateFraction: 3.0000000000000001 -> 3', () => {
    expect(truncateFraction(3.0000000000000001)).toBe(3);
    expect(truncateFraction(2.5999999999999996)).toBe(2.6);
  });
});
