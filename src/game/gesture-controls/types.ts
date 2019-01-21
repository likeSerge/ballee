export interface IControlsUpdate {
  dVelocityX: number;
  dVelocityY: number;
}

export type ControlsUpdateCallback = (upd: IControlsUpdate) => void;

export interface IGestureControls {
  subscribe(cb: ControlsUpdateCallback): void;
}
