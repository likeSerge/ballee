import { IGameScore } from './types';

export class GameScore implements IGameScore {
  private frameCounter: number = 0;

  update(): void {
    this.frameCounter += 1;
  }

  get score(): number {
    return Math.floor(this.frameCounter / 100);
  }
}
