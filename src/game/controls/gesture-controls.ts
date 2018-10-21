import { ControlsUpdateCallback, IControlsUpdate, IGestureControls } from './types';
import { ICoordinate, pointOnLineProjectionCoordinate } from '../types';

export class GestureControls implements IGestureControls {
  private readonly listeners: ControlsUpdateCallback[] = [];
  private startPoint: ICoordinate = { x: 0, y: 0 };

  constructor() {
    document.body.addEventListener('touchmove', e => e.preventDefault());

    document.addEventListener('mousedown', this.test);
    document.addEventListener('touchstart', this.startMovement);
    // document.addEventListener('mouseup', this.endMovement);
    document.addEventListener('touchend', this.endMovement);
  }

  subscribe(cb: ControlsUpdateCallback): void {
    this.listeners.push(cb);
  }

  private test = (): void => {
    const result = pointOnLineProjectionCoordinate(
      { x: 3, y: 33 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    );
    console.log(`***${'DEBUG'}*** result :`, result);
  }

  private startMovement = (e: TouchEvent): void => {
    const x = e.touches[0].pageX;
    const y = e.touches[0].pageY;
    this.startPoint = { x, y };
  }

  private endMovement = (e: TouchEvent): void => {
    const x = e.changedTouches[0].pageX;
    const y = e.changedTouches[0].pageY;

    const endPoint = { x, y };

    this.notifyListeners(this.calculateUpdate(this.startPoint, endPoint));
  }

  private calculateUpdate(startPoint: ICoordinate, endPoint: ICoordinate): IControlsUpdate {
    const controlsSensitivity = 0.05;
    return {
      dVelocityX: (endPoint.x - startPoint.x) * controlsSensitivity,
      dVelocityY: (endPoint.y - startPoint.y) * controlsSensitivity,
    };
  }

  private notifyListeners(update: IControlsUpdate): void {
    this.listeners.forEach(listener => listener(update));
  }
}
