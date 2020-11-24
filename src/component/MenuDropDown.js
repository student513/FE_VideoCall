import React from 'react';
//import Video from 'twilio-video';
//import Participant from '../Participant';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';

export default function MenuDropDown({ handleLogout }) {
  //menu drop down
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button
        aria-controls="simpleMenu"
        aria-haspopup="true"
        onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simpleMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleLogout}>LogOut</MenuItem>
        {/* <MenuItem onClick={handleClose}>menu2</MenuItem> */}
        {/* <MenuItem onClick={handleClose}>menu3</MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}
