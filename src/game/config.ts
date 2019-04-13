import { IBallProps } from './ball/types';
import { IObstaclesConfig } from './obstacles/types';

export const polygonObstaclesConfig: IObstaclesConfig = {
  velocityX: -1.2,
  velocityY: 0,
  polygonTops: [
    // [
    //   { x: 510, y: 100 },
    //   { x: 650, y: 100 },
    //   { x: 650, y: 250 },
    //   { x: 510, y: 250 },
    // ],
    // [
    //   { x: 510, y: 300 },
    //   { x: 550, y: 270 },
    //   { x: 530, y: 350 },
    // ],
    // [
    //   { x: 570, y: 350 },
    //   { x: 600, y: 330 },
    //   { x: 700, y: 320 },
    //   { x: 625, y: 390 },
    //   { x: 580, y: 370 },
    // ],
  ],
  framesToNewObstacle: 150,
};

export const ballConfig: IBallProps = {
  radius: 15,
  x: 300,
  y: 35,
  velocityX: -0.2,
  velocityY: 0.1,
  bounceCoef: 0.9,
};
