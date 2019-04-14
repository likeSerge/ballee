import { ILives, ILivesConfig } from './types';
import { IBallCollision } from '../collision-detector/types';

export class Lives implements ILives {
  private readonly maxLives: number;
  private readonly framesTillAddLife: number;
  private lives: number;
  private framesSinceCollision: number = 0;

  constructor(config: ILivesConfig) {
    this.maxLives = config.maxLives;
    this.framesTillAddLife = config.framesTillAddLife;
    this.lives = config.maxLives;
  }

  onCollision(collision: IBallCollision): void {
    if (!collision.isCanvasCollision) {
      this.lives -= 1;
      this.framesSinceCollision = 0;
    }
  }

  onFrame(): void {
    this.framesSinceCollision += 1;
    if (this.framesSinceCollision > this.framesTillAddLife && this.lives < this.maxLives) {
      this.lives += 1;
      this.framesSinceCollision = 0;
    }
  }

  get current(): number {
    return this.lives;
  }
}