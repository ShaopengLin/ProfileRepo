import React, { useState } from 'react';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
const SetP = (props) => {
    const {
        url,
        handleChange,
        handleSetProfile,
    }= props;
        const [anchorEl, setAnchorEl] = useState(null);
      
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
      
        const handleClose = () => {
          setAnchorEl(null);
        };

       return (
           <div>
           <Menu id = {url + '1'}
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}>
                      
                      <MenuItem onClick = {()=>{handleSetProfile(url);
                      handleClose();}}>Set As Profile</MenuItem>
                      <MenuItem
                        aria-label="More"
                        aria-owns="long-menu"
                        aria-haspopup="true"
                        onClick={handleClose}
                        variant="contained"
                        component="label"
                      >
                        Upload New
                        <input
                          onChange={handleChange}
                          type="file"
                          accept="image/*"
                          id="cameraInput"
                          hidden
                        />
                      </MenuItem>
                    </Menu>
            <MoreHorizIcon color="primary" onClick={handleClick} />
            </div>
       ) ;
      
  }

  export default SetP;