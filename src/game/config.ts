import { IBallProps } from './ball/types';
import { IObstaclesConfig } from './obstacles/types';

export const polygonObstaclesConfig: IObstaclesConfig = {
  velocityX: 1.2,
  velocityY: -0.5,
  polygonTops: [
    [
      { x: 10, y: 100 },
      { x: 150, y: 100 },
      { x: 150, y: 250 },
      { x: 10, y: 250 },
    ],
    [
      { x: 10, y: 300 },
      { x: 50, y: 270 },
      { x: 30, y: 350 },
    ],
    [
      { x: 70, y: 350 },
      { x: 100, y: 330 },
      { x: 200, y: 320 },
      { x: 125, y: 390 },
      { x: 80, y: 370 },
    ],
  ],
};

export const ballConfig: IBallProps = {
  radius: 15,
  x: 17,
  y: 35,
  velocityX: 5,
  velocityY: 3,
};
