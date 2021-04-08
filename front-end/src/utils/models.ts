export interface Position {
  lat: number;
  lng: number;
}
export interface IRoute {
  _id: string;
  title: string;
  startPosition: Position;
  endPosition: Position;
}
