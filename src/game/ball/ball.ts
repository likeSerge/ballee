import { IBall, IBallProps } from './types';
import { IControlsUpdate } from '../gesture-controls/types';

export class Ball implements IBall {
  readonly radius: number = 25;
  x: number = 179.4843979390862;
  y: number = 376.1144509300823;
  velocityX: number = -15.5151920385645212;
  velocityY: number = -30.962851635663924;

  setProps(nextProps: IBallProps): void {
    this.x = nextProps.x;
    this.y = nextProps.y;
    this.velocityX = nextProps.velocityX;
    this.velocityY = nextProps.velocityY;
  }

  onGesture = (update: IControlsUpdate): void => {
    this.velocityX = update.dVelocityX;
    this.velocityY = update.dVelocityY;
  }
}
