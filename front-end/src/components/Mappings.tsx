import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { Loader } from 'google-maps';
import sample from 'lodash/sample';
import shuffle from 'lodash/shuffle';
import { useSnackbar } from 'notistack';
import React from 'react';
import io from 'socket.io-client';
import { RouteExistsError } from '../errors/route-exists.error';
import { envs, getCurrentPosition, IRoute, makeCarIcon, makeMarkerIcon, Map } from '../utils';
import Navbar from './Navbar';

const googleMapsLoader = new Loader(envs.googleAPIKey);

const colors = [
  '#b71c1c',
  '#4a148c',
  '#2e7d32',
  '#e65100',
  '#2962ff',
  '#c2185b',
  '#FFCD00',
  '#3e2723',
  '#03a9f4',
  '#827717',
];

const useStyles = makeStyles({
  full: {
    width: '100%',
    height: '100%',
  },
  form: {
    margin: 16,
    height: 'calc(100% - 100px)',
  },
  submitContainer: {
    textAlign: 'center',
    marginTop: 16,
  },
  submit: {
    width: '80%',
    height: 45,
  },
});

const Mappings: React.FC = () => {
  const [routes, setRoutes] = React.useState<IRoute[]>([]);
  const [currentRoute, setcurrentRoute] = React.useState<string>('');
  const mapReference = React.useRef<Map>();
  const socketIOReference = React.useRef<SocketIOClient.Socket>();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const finishRoute = React.useCallback(
    (route: IRoute) => {
      enqueueSnackbar(`${route.title} finalizou.`, { variant: 'success' });
      mapReference.current?.removeRoute(route._id);
    },
    [enqueueSnackbar],
  );

  React.useEffect(() => {
    if (!socketIOReference.current?.connected) {
      socketIOReference.current = io.connect(envs.apiURL);

      socketIOReference.current?.on('connect', () => console.log('Websocket server is connected'));
    }
    const handler = (data: { routeId: string; position: [number, number]; finished: boolean }) => {
      const { routeId, position, finished } = data;
      mapReference.current?.moveCurrentMarker(routeId, { lat: position[0], lng: position[1] });
      const route = routes.find(({ _id }) => _id === routeId);
      if (finished && route) finishRoute(route);
    };

    socketIOReference.current?.on('new-position', handler);
    return () => {
      socketIOReference.current?.off('new-position', handler);
    };
  }, [finishRoute, routes, currentRoute]);

  React.useEffect(() => {
    fetch(`${envs.apiURL}/routes`)
      .then(data => data.json())
      .then(setRoutes);

    Promise.all([googleMapsLoader.load(), getCurrentPosition({ enableHighAccuracy: true })]).then(([, position]) => {
      const mapDivElement = document.getElementById('map')!;
      mapReference.current = new Map(mapDivElement, { zoom: 15, center: position });
    });
  }, []);

  const startRoute = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (!currentRoute) return;

      const route = routes.find(({ _id }) => _id === currentRoute);
      if (!route) return;
      const color = sample(shuffle(colors))!;

      const { endPosition, startPosition } = route;
      try {
        mapReference.current?.addRoute(currentRoute, {
          currentMarkerOption: { position: startPosition, icon: makeCarIcon(color) },
          endMarkerOption: { position: endPosition, icon: makeMarkerIcon(color) },
        });

        socketIOReference.current?.emit('new-direction', { routeId: currentRoute });
      } catch (error) {
        if (error instanceof RouteExistsError)
          return enqueueSnackbar(`${currentRoute} já adicionado, espere finalziar.`, { variant: 'error' });
        throw error;
      }

      fetch(`${envs.apiURL}/routes/${currentRoute}/start`);
    },
    [currentRoute, routes, enqueueSnackbar],
  );

  return (
    <Grid container className={classes.full}>
      <Grid item xs={12} sm={3}>
        <Navbar />
        <form onSubmit={startRoute} className={classes.form}>
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
          <div className={classes.submitContainer}>
            <Button type='submit' color='primary' className={classes.submit} variant='contained'>
              Iniciar uma corrida
            </Button>
          </div>
        </form>
      </Grid>
      <Grid item xs={12} sm={9}>
        <div id='map' className={classes.full} />
      </Grid>
    </Grid>
  );
};

export default Mappings;
