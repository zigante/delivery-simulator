import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Loader } from 'google-maps';
import React from 'react';
import { envs, getCurrentPosition, IRoute, makeMarkerIcon } from '../utils';

type Props = {};

const googleMapsLoader = new Loader(envs.googleAPIKey);

const Mappings: React.FC<Props> = () => {
  const [routes, setRoutes] = React.useState<IRoute[]>([]);
  const [currentRoute, setcurrentRoute] = React.useState<string>('');
  const mapReference = React.useRef<google.maps.Map>();

  React.useEffect(() => {
    fetch(`${envs.apiURL}/routes`)
      .then(data => data.json())
      .then(setRoutes);

    Promise.all([googleMapsLoader.load(), getCurrentPosition()]).then(([, position]) => {
      const mapDivElement = document.getElementById('map')!;
      mapReference.current = new google.maps.Map(mapDivElement, { zoom: 15, center: position });
    });
  }, []);

  const startRoute = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const route = routes.find(({ _id }) => _id === currentRoute);
      new google.maps.Marker({
        position: route?.startPosition,
        map: mapReference.current,
        icon: makeMarkerIcon('black'),
      });
      fetch(`${envs.apiURL}/routes/${currentRoute}/start`);
    },
    [currentRoute, routes],
  );

  return (
    <Grid container style={{ width: '100%', height: '100%' }}>
      <Grid item xs={12} sm={3}>
        <form onSubmit={startRoute}>
          <Select
            fullWidth
            displayEmpty
            value={currentRoute}
            onChange={({ target }) => setcurrentRoute(target.value as string)}>
            <MenuItem value=''>
              <em>Selecione uma corrida</em>
            </MenuItem>
            {routes.map((route, index) => {
              const { _id: id, title } = route;

              return (
                <MenuItem key={index} value={id}>
                  {title}
                </MenuItem>
              );
            })}
          </Select>
          <Button type='submit' color='primary' variant='contained'>
            Iniciar uma corrida
          </Button>
        </form>
      </Grid>
      <Grid item xs={12} sm={9}>
        <div id='map' style={{ width: '100%', height: '100%' }}></div>
      </Grid>
    </Grid>
  );
};

export default Mappings;
