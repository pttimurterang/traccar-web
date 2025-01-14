import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LinearProgress, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from './common/theme';
import BottomMenu from './common/components/BottomMenu';

const useStyles = makeStyles(() => ({
  page: {
    flexGrow: 1,
    overflow: 'auto',
  },
  menu: {
    zIndex: 1204,
  },
}));

const App = () => {
  const classes = useStyles();

  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const initialized = useSelector((state) => !!state.session.user);

  if (!initialized) {
    return (<LinearProgress />);
  }
  return (
    <>
      <div className={classes.page}>
        <Outlet />
      </div>
      {!desktop && (
        <div className={classes.menu}>
          <BottomMenu />
        </div>
      )}
    </>
  );
};

export default App;
