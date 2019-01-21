import { IBallCollision } from '../collision-detector/types';
import { IBallProps } from '../ball/types';

export interface ICollisionResponser {
  ballPropsAfterCollision(collision: IBallCollision): IBallProps;
}
