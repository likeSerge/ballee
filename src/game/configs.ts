import { IBallProps } from './ball/types';
import { IObstaclesConfig } from './obstacles/types';
import { IGestureControlsConfig } from './gesture-controls/types';
import { ILivesConfig } from './lives/types';

export const polygonObstaclesConfig: IObstaclesConfig = {
  velocityX: -3.5,
  velocityY: 0,
  initialPolygonTops: [
    // [
    //   { x: 510, y: 100 },
    //   { x: 650, y: 100 },
    //   { x: 650, y: 250 },
    //   { x: 510, y: 250 },
    // ],
  ],
  framesToNewObstacle: 150,
};

export const ballConfig: IBallProps = {
  radius: 15,
  x: 150,
  y: 35,
  velocityX: -0,
  velocityY: -1,
  bounceCoef: 0.83,
};

export const gestureControlsConfig: IGestureControlsConfig = {
  // sensitivity: 0.05,
  forcedVelocityY: -7,
};

export const livesConfig: ILivesConfig = {
  framesTillAddLife: 200,
  maxLives: 10,
};
