import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Playlist from './Playlist';
import Chatting from './chatting/Chatting';
import useStore from '../useStore';
import './Drawer.css';

const TemporaryDrawer = ({ messages }) => {
  const { userStore } = useStore();
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && ['Tab', 'Shift'].includes(event.key)) {
      return;
    }
    setShowDrawer(open);
  };

  const list = () => (
    <div className="drawerContainer" role="presentation">
      <div className="halfSide">
        {/* height 30px */}
        <div className="dividerName">채팅</div>
        <Divider />
        <div className="chatContainer">
          <Chatting
            messages={messages}
            roomname={userStore.roomname}
            username={userStore.username}
          />
        </div>
      </div>
      <div className="halfSide">
        <Divider />
        <div className="dividerName">재생목록</div>
        <Divider />
        <div className="listContainer">
          <Playlist />
        </div>
      </div>
    </div>
  );

  return (
    <div className="sideBar" onMouseEnter={toggleDrawer(true)}>
      .
      <React.Fragment>
        <Drawer anchor="right" open={showDrawer} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default TemporaryDrawer;
