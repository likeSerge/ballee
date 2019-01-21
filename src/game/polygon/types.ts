import { ICoordinate } from '../types';

// TODO: interface location?
export interface ISection {
  start: ICoordinate;
  end: ICoordinate;
}

export type PolygonTops = { 0: ICoordinate, 1: ICoordinate, 2: ICoordinate } & ICoordinate[];

export interface IPolygon {
  readonly tops: PolygonTops;
  readonly sections: ISection[];
}
