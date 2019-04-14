export interface IControlsUpdate {
  readonly nextVelocityX: number;
  readonly nextVelocityY: number;
}

export type ControlsUpdateCallback = (upd: IControlsUpdate) => void;

export interface IGestureControls {
  subscribe(cb: ControlsUpdateCallback): void;
}

export interface IGestureControlsConfig {
  // readonly sensitivity: number;
  readonly forcedVelocityY: number;
}
