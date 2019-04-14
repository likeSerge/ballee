import { IBallCollision } from '../collision-detector/types';

export interface ILives {
  onFrame(): void;
  onCollision(collision: IBallCollision): void;
  current: number;
}

export interface ILivesConfig {
  readonly framesTillAddLife: number;
  readonly maxLives: number;
}
