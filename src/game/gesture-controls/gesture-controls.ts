import { ControlsUpdateCallback, IControlsUpdate, IGestureControls } from './types';
import { IPoint } from '../types';
import { truncateFraction } from '../utils/decimal';

export class GestureControls implements IGestureControls {
  private readonly listeners: ControlsUpdateCallback[] = [];
  private readonly sensitivity = 0.02;
  private startPoint: IPoint = { x: 0, y: 0 };

  constructor() {
    document.addEventListener('touchstart', this.startMovement);
    document.addEventListener('touchend', this.endMovement);
  }

  subscribe(cb: ControlsUpdateCallback): void {
    this.listeners.push(cb);
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

  private calculateUpdate(startPoint: IPoint, endPoint: IPoint): IControlsUpdate {
    return {
      dVelocityX: truncateFraction((endPoint.x - startPoint.x) * this.sensitivity),
      dVelocityY: truncateFraction((endPoint.y - startPoint.y) * this.sensitivity),
    };
  }

  private notifyListeners(update: IControlsUpdate): void {
    this.listeners.forEach(listener => listener(update));
  }
}
