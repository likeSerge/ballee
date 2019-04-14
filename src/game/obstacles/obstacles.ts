import { IObstacles } from './types';
import { IPolygon } from '../polygon/types';
import { ISize } from '../canvas/types';
import { Polygon } from '../polygon/polygon';
import { getRandomInRange } from '../utils/random';

export class Obstacles implements IObstacles {
  private framesSinceLastObstacleAdded: number = 0;

  constructor(
    readonly polygons: IPolygon[],
    public velocityX: number,
    readonly velocityY: number,
    private readonly framesToNewObstacle: number,
    private readonly canvasSize: ISize,
  ) {}

  update(): void {
    this.moveAndRemovePolygons();
    this.addNewObstacles();
    this.framesSinceLastObstacleAdded += 1;
  }

  clear(): void {
    this.polygons.length = 0;
  }

  private moveAndRemovePolygons(): void {
    this.polygons.forEach((poly) => {
      poly.tops.forEach((top) => {
        top.x = top.x + this.velocityX;
        top.y = top.y + this.velocityY;
      });

      this.removeOutOfScreenObstacle(poly);
    });
  }

  private removeOutOfScreenObstacle(poly: IPolygon): void {
    const outOfCanvas = poly.tops.every(top => top.x < 0)
      || poly.tops.every(top => top.y < 0);

    if (outOfCanvas) {
      this.polygons.splice(this.polygons.indexOf(poly), 1);
    }
  }

  private addNewObstacles(): void {
    this.velocityX -= 0.0005;
    if (this.framesSinceLastObstacleAdded >= this.framesToNewObstacle) {
      this.framesSinceLastObstacleAdded = 0;
      this.polygons.push(this.generatePolygonObstacle());
    }
  }

  private generatePolygonObstacle(): IPolygon {
    const width = getRandomInRange(10, 20) * this.canvasSize.width / 100;
    const height = getRandomInRange(10, 35) * this.canvasSize.height / 100;
    const x = this.canvasSize.width;
    const y = getRandomInRange(0, this.canvasSize.height - height);
    // const width = 100;
    // const height = 100;
    // const x = this.canvasSize.width;
    // const y = 100;

    return new Polygon([
      { x, y },
      { y, x: x + width },
      { x: x + width, y: y + height },
      { x, y: y + height },
    ]);
  }
}
