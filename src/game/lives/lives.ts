import { ILives } from './types';

const FRAMES_TILL_ADD_LIFE = 100;
const MAX_LIVES = 10;

export class Lives implements ILives {
  private lives: number = MAX_LIVES;
  private framesSinceCollision: number = 0;

  onCollision(): void {
    this.lives -= 1;
    this.framesSinceCollision = 0;
  }

  onFrame(): void {
    this.framesSinceCollision += 1;
    if (this.framesSinceCollision > FRAMES_TILL_ADD_LIFE && this.lives < MAX_LIVES) {
      this.lives += 1;
      this.framesSinceCollision = 0;
    }
  }

  get current(): number {
    return this.lives;
  }
}