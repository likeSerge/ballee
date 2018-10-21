import { IBall, IBallCollisionUpdate } from './types';
import { IControlsUpdate } from '../controls/types';

export class Ball implements IBall {
  readonly radius: number = 25;
  x: number = 35;
  y: number = 35;
  velocityX: number = 1.0;
  velocityY: number = 1.0;
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

    // this.stabilizeSlowBall();
  }

  onGesture = (update: IControlsUpdate): void => {
    this.velocityX = update.dVelocityX;
    this.velocityY = update.dVelocityY;
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
    if (this.velocityY === 0 && this.x + this.radius >= 520) {
      return;
    }
    this.velocityY = this.velocityY + this.accelerationY;
  }

  private stabilizeSlowBall(): void {
    if (Math.abs(this.velocityY) < 0.7) {
      this.velocityY = 0;
    }
  }
}
