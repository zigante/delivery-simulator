import { Position } from './models';

export const getCurrentPosition = (options?: PositionOptions): Promise<Position> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => resolve({ lat: latitude, lng: longitude }),
      reject,
      options,
    );
  });
};
