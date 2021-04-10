import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import './App.css';
import Mappings from './components/Mappings';
import theme from './theme';

const App: React.FC = () => {
  return (
    <>
      <MuiThemeProvider {...{ theme }}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <Mappings />
        </SnackbarProvider>
      </MuiThemeProvider>
    </>
  );
};

export default App;
