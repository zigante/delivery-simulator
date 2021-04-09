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

export interface IRouteOptions {
  currentMarkerOption: google.maps.ReadonlyMarkerOptions;
  endMarkerOption: google.maps.ReadonlyMarkerOptions;
}
