import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Playlist from './Playlist';
import Chatting from './chatting/Chatting';
import useStore from '../useStore';
import './Drawer.css';

const chattingHeight = window.innerHeight / 2

const TemporaryDrawer = () => {
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
      <div className="halfSide" style={{height: chattingHeight}}>
        {/* height 30px */}
        <div className="dividerName">채팅</div>
        <Divider />
        <div className="chatContainer">
          <Chatting roomname={userStore.roomname} username={userStore.username}/>
        </div>
      </div>
      <Divider />
      <div className="dividerName">재생목록</div>
      <Divider />
      <div className="listContainer">
        <Playlist />
      </div>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>사이드바</Button>
        <Drawer anchor="right" open={showDrawer} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default TemporaryDrawer