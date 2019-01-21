import { IPolygon, ISection, PolygonTops } from './types';

export class Polygon implements IPolygon {
  readonly tops: PolygonTops;

  constructor(tops: PolygonTops) {
    this.tops = tops;
  }

  get sections(): ISection[] {
    const result = [];
    for (let i = 1; i < this.tops.length; i += 1) {
      result.push({
        start: { ...this.tops[i - 1] },
        end: { ...this.tops[i] },
      });
    }
    result.push({
      start: { ...this.tops[this.tops.length - 1] },
      end: { ...this.tops[0] },
    });
    return result;
  }
}
