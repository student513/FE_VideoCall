import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Playlist from './Playlist';
import './Drawer.css';

export default function TemporaryDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && ['Tab', 'Shift'].includes(event.key)) {
      return;
    }
    setShowDrawer(open);
  };

  const list = () => (
    <div role="presentation">
      <div className="divider">채팅</div>
      <Divider />
      <div className="divider">재생목록</div>
      <Divider />
      <div className="listContainer">
        <Playlist />
      </div>
    </div>
  );

  return (
    <div className="sideBar" onMouseEnter={toggleDrawer(true)}  >
      .
      <React.Fragment>
        <Drawer anchor="right" open={showDrawer} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
