import { IObstacles } from './types';
import { IPolygon } from '../polygon/types';

export class Obstacles implements IObstacles {
  constructor(
    readonly polygons: IPolygon[],
    readonly velocityX: number,
    readonly velocityY: number,
  ) {}

  update(): void {
    this.polygons.forEach((poly) => {
      poly.tops.forEach((top) => {
        top.x = top.x + this.velocityX;
        top.y = top.y + this.velocityY;
      });
    });
  }
}