export interface ILives {
  onFrame(): void;
  onCollision(): void;
  current: number;
}
