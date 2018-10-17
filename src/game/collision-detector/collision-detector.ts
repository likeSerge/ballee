import { ICollisionDetector } from './types';
import { ICanvas } from '../canvas/types';
import { IBall } from '../ball/types';

export class CollisionDetector implements ICollisionDetector {
  checkBorders(canvas: ICanvas, ball: IBall): void {
    CollisionDetector.checkBottomBorder(canvas, ball);
    CollisionDetector.checkLeftBorder(canvas, ball);
    CollisionDetector.checkRightBorder(canvas, ball);
  }

  private static checkBottomBorder(canvas: ICanvas, ball: IBall): void {
    if (ball.y + ball.radius >= canvas.height) {
      ball.onCollision({
        dVelocityY: - 2 * ball.velocityY * ball.bounceEnergyLeft,
        dVelocityX: - ball.velocityX * (1 - ball.rollEnergyLeft),
        dY: (canvas.height - ball.radius) - ball.y,
        dX: 0,
      });
    }
  }

  private static checkLeftBorder(canvas: ICanvas, ball: IBall): void {
    if (ball.x - ball.radius <= 0) {
      ball.onCollision({
        dVelocityX: - 2 * ball.velocityX * ball.bounceEnergyLeft,
        dVelocityY: - ball.velocityY * (1 - ball.rollEnergyLeft),
        dX: ball.radius - ball.x,
        dY: 0,
      });
    }
  }

  private static checkRightBorder(canvas: ICanvas, ball: IBall): void {
    if (ball.x + ball.radius >= canvas.width) {
      ball.onCollision({
        dVelocityX: - 2 * ball.velocityX * ball.bounceEnergyLeft,
        dVelocityY: - ball.velocityY * (1 - ball.rollEnergyLeft),
        dX: (canvas.width - ball.radius) - ball.x,
        dY: 0,
      });
    }
  }
}
