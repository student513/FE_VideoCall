import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setShowDrawer(open);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <p>참여자/채팅</p>
      <Divider />
      <p>재생목록</p>
    </div>
  );

  return (
    <div>
      <React.Fragment key="right">
        <Button onClick={toggleDrawer(true)}>사이드바</Button>
        <Drawer anchor="right" open={showDrawer} onClose={toggleDrawer(false)}>
          {list('right')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
