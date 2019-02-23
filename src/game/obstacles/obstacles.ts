import { IObstacles } from './types';
import { IPolygon } from '../polygon/types';
import { ISize } from '../canvas/types';
import { Polygon } from '../polygon/polygon';

export class Obstacles implements IObstacles {
  constructor(
    readonly polygons: IPolygon[],
    readonly velocityX: number,
    readonly velocityY: number,
  ) {}

  update(canvasSize: ISize): void {
    this.polygons.forEach((poly) => {
      poly.tops.forEach((top) => {
        top.x = top.x + this.velocityX;
        top.y = top.y + this.velocityY;
      });

      const outOfCanvas = poly.tops.every(top => top.x < 0)
        || poly.tops.every(top => top.y < 0);

      if (outOfCanvas) {
        console.log(`***${'DEBUG'}*** 'out' :`, 'out', poly);
        this.polygons.splice(this.polygons.indexOf(poly), 1);

        this.polygons.push(new Polygon([
          { x: 310, y: 300 },
          { x: 350, y: 270 },
          { x: 330, y: 350 },
        ]));
      }
    });
  }
}
