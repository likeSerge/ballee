import { IBall, IBallCollisionUpdate } from './types';

export class Ball implements IBall {
  readonly radius: number = 25;
  x: number = 35;
  y: number = 35;
  velocityX: number = 0.3;
  velocityY: number = 0.1;
  readonly bounceEnergyLeft: number = 0.9;
  readonly rollEnergyLeft: number = 0.98;

  private accelerationY: number = 0.1;
  private accelerationX: number = 0;

  updatePosition(): void {
    this.updateX();
    this.updateY();
    this.updateVelocityX();
    this.updateVelocityY();
  }

  onCollision(update: IBallCollisionUpdate): void {
    this.x += update.dX;
    this.y += update.dY;
    this.velocityX += update.dVelocityX;
    this.velocityY += update.dVelocityY;

    this.stabilizeSlowBall();
  }

  private updateX(): void {
    this.x = this.x + this.velocityX;
  }

  private updateY(): void {
    this.y = this.y + this.velocityY;
  }

  private updateVelocityX(): void {
    this.velocityX = this.velocityX + this.accelerationX;
  }

  private updateVelocityY(): void {
    this.velocityY = this.velocityY + this.accelerationY;
  }

  private stabilizeSlowBall(): void {
    if (Math.abs(this.velocityY) < 0.7) {
      this.velocityY = 0;
    }
  }
}
