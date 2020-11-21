import React, { useState } from 'react';
import Video from 'twilio-video';
import Participant from '../Participant';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function MenuDropDown({handleLogout}) {
    //menu drop down
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
    setAnchorEl(null);
    };
  
    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Open Menu
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>LogOut</MenuItem>
                {/* <MenuItem onClick={handleClose}>menu2</MenuItem> */}
                {/* <MenuItem onClick={handleClose}>menu3</MenuItem> */}
            </Menu>
        </div>
    );
}
  


