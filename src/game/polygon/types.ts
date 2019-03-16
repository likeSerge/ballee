import { IPoint } from '../types';

// TODO: interface location?
export interface ISection {
  start: IPoint;
  end: IPoint;
}

export type PolygonTops = { 0: IPoint, 1: IPoint, 2: IPoint } & IPoint[];

export interface IPolygon {
  readonly tops: PolygonTops;
  readonly sections: ISection[];
}
