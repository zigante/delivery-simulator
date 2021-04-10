import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' arial-label='menu'>
          <DriveEtaIcon />
        </IconButton>
        <Typography variant='h6'>My Delivery</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
