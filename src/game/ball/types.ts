import { IControlsUpdate } from '../controls/types';

export interface IBall {
  updatePosition(): void;
  onCollision(update: IBallCollisionUpdate): void;
  onGesture(update: IControlsUpdate): void;
  readonly radius: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  readonly bounceEnergyLeft: number;
  readonly rollEnergyLeft: number;
}

export interface IBallCollisionUpdate {
  readonly dX: number;
  readonly dY: number;
  readonly dVelocityX: number;
  readonly dVelocityY: number;
}
