import { IControlsUpdate } from '../gesture-controls/types';

export interface IBallProps {
  readonly radius: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}

export interface IBall {
  setProps(ballProps: IBallProps): void;
  onGesture(update: IControlsUpdate): void;
  readonly radius: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}
