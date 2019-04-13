import { IGravityService } from './types';
import { IBallProps } from '../ball/types';

const GRAVITY = 0.05;

export class GravityService implements IGravityService {
  private readonly ball: IBallProps;

  constructor(ballProps: IBallProps) {
    this.ball = ballProps;
  }

  ballPropsAfterGravity(): IBallProps {
    return {
      ...this.ball,
      velocityY: this.ball.velocityY + GRAVITY,
    };
  }
}