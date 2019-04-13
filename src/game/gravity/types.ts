import { IBallProps } from '../ball/types';

export interface IGravityService {
  ballPropsAfterGravity(): IBallProps;
}