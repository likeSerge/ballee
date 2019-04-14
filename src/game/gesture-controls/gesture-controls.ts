import { Observable, fromEvent, merge } from 'rxjs';
import { filter, map, switchMapTo, takeUntil } from 'rxjs/operators';
import { ControlsUpdateCallback, IControlsUpdate, IGestureControls, IGestureControlsConfig } from './types';
import { IPoint } from '../types';

export class GestureControls implements IGestureControls {
  private readonly listeners: ControlsUpdateCallback[] = [];
  // private readonly sensitivity: number;
  private readonly forcedVelocityY: number;
  private prevPoint: IPoint = { x: 0, y: 0 };
  private readonly gestureStart$: Observable<IPoint>;
  // private readonly gestureMove$: Observable<IPoint>;
  // private readonly gestureEnd$: Observable<IPoint>;

  constructor(config: IGestureControlsConfig) {
    // this.sensitivity = config.sensitivity;
    this.forcedVelocityY = config.forcedVelocityY;
    this.gestureStart$ = merge(
      this.mouseToPointStream(fromEvent<MouseEvent>(document, 'mousedown')),
      this.touchToPointStream(fromEvent<TouchEvent>(document, 'touchstart')),
    );
    // this.gestureMove$ = merge(
    //   this.mouseToPointStream(fromEvent<MouseEvent>(document, 'mousemove')),
    //   this.touchToPointStream(fromEvent<TouchEvent>(document, 'touchmove')),
    // );
    // this.gestureEnd$ = merge(
    //   this.mouseToPointStream(fromEvent<MouseEvent>(document, 'mouseup')),
    //   this.touchToPointStream(fromEvent<TouchEvent>(document, 'touchend')),
    // );
    // const move$ = this.gestureStart$.pipe(
    //   switchMapTo(this.gestureMove$.pipe(
    //     takeUntil(this.gestureEnd$),
    //   )),
    // );

    this.gestureStart$.subscribe(this.handleClick);
    // this.gestureStart$.subscribe(this.prevPointFormEvent);
    // move$.subscribe(this.handleMove);
  }

  subscribe(cb: ControlsUpdateCallback): void {
    this.listeners.push(cb);
  }

  private mouseToPointStream(mouse$: Observable<MouseEvent>): Observable<IPoint> {
    return mouse$.pipe(
      map((e: MouseEvent) => {
        return { x: screenX, y: screenY };
      }),
    );
  }

  private touchToPointStream(touch$: Observable<TouchEvent>): Observable<IPoint> {
    return touch$.pipe(
      filter((e: TouchEvent) => {
        return e.touches.length === 1;
      }),
      map((e: TouchEvent) => {
        return { x: e.touches[0].screenX, y: e.touches[0].screenY };
      }),
    );
  }

  private prevPointFormEvent = (point: IPoint): void => {
    this.prevPoint = point;
    this.handleClick(point);
  }

  // private handleMove = (point: IPoint): void => {
  //   const update = {
  //     nextVelocityX: (point.x - this.prevPoint.x) * this.sensitivity,
  //     nextVelocityY: (point.y - this.prevPoint.y) * this.sensitivity,
  //   };
  //   this.notifyListeners(update);
  //
  //   this.prevPointFormEvent(point);
  // }

  private handleClick = (point: IPoint): void => {
    const update = {
      nextVelocityX: 0,
      nextVelocityY: this.forcedVelocityY,
    };
    this.notifyListeners(update);
  }

  private notifyListeners(update: IControlsUpdate): void {
    this.listeners.forEach(listener => listener(update));
  }
}
