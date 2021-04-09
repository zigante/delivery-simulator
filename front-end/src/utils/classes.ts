import { RouteExistsError } from '../errors/route-exists.error';
import { IRouteOptions } from './models';

export class Route {
  public currentMarker: google.maps.Marker;
  public endMarker: google.maps.Marker;
  private _directionsRender: google.maps.DirectionsRenderer;

  constructor(options: IRouteOptions) {
    const { currentMarkerOption, endMarkerOption } = options;

    this.currentMarker = new google.maps.Marker(currentMarkerOption);
    this.endMarker = new google.maps.Marker(endMarkerOption);

    const strokeColor = (this.currentMarker.getIcon() as google.maps.ReadonlySymbol).strokeColor;
    this._directionsRender = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: { strokeColor, strokeOpacity: 0.5, strokeWeight: 5 },
    });

    this._directionsRender.setMap(this.currentMarker.getMap() as google.maps.Map);

    this.calculateRoute();
  }

  private calculateRoute() {
    const currentPosition = this.currentMarker.getPosition() as google.maps.LatLng;
    const endPosition = this.endMarker.getPosition() as google.maps.LatLng;

    new google.maps.DirectionsService().route(
      { origin: currentPosition, destination: endPosition, travelMode: google.maps.TravelMode.DRIVING },
      (result, status) => {
        if (status !== 'OK') throw new Error(status);
        this._directionsRender.setDirections(result);
      },
    );
  }

  delete() {
    this.currentMarker.setMap(null);
    this.endMarker.setMap(null);
    this._directionsRender.setMap(null);
  }
}

export class Map {
  public map: google.maps.Map;
  private _routes: Record<string, Route> = {};

  constructor(element: Element, options: google.maps.MapOptions) {
    this.map = new google.maps.Map(element, options);
  }

  moveCurrentMarker(id: string, position: google.maps.LatLngLiteral) {
    this._routes[id].currentMarker.setPosition(position);
  }

  removeRoute(id: string) {
    if (!(id in this._routes)) return;
    this._routes[id].delete();
    delete this._routes[id];
  }

  addRoute(id: string, routeOptions: IRouteOptions) {
    if (id in this._routes) throw new RouteExistsError();

    const { currentMarkerOption, endMarkerOption } = routeOptions;
    this._routes[id] = new Route({
      currentMarkerOption: { ...currentMarkerOption, map: this.map },
      endMarkerOption: { ...endMarkerOption, map: this.map },
    });

    this.fitBounds();
  }

  private fitBounds() {
    const bounds = new google.maps.LatLngBounds();

    Object.values(this._routes).forEach(route => {
      console.log({ route });
      bounds.extend(route.currentMarker.getPosition()!);
      bounds.extend(route.endMarker.getPosition()!);
    });

    this.map.fitBounds(bounds);
  }
}
