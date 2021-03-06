import { IBall, IBallProps } from './types';
import { IControlsUpdate } from '../gesture-controls/types';

export class Ball implements IBall {
  readonly radius: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  readonly bounceCoef: number;

  constructor(ballProps: IBallProps) {
    this.radius = ballProps.radius;
    this.x = ballProps.x;
    this.y = ballProps.y;
    this.velocityX = ballProps.velocityX;
    this.velocityY = ballProps.velocityY;
    this.bounceCoef = ballProps.bounceCoef;
  }

  setProps(nextProps: IBallProps): void {
    this.x = nextProps.x;
    this.y = nextProps.y;
    this.velocityX = nextProps.velocityX;
    this.velocityY = nextProps.velocityY;
  }

  onGesture = (update: IControlsUpdate): void => {
    this.velocityX = this.velocityX + update.nextVelocityX;
    this.velocityY = update.nextVelocityY;
  }
}
