import React, { useContext } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AuthGlobal from "../context/AuthGlobal";
import { logoutUser } from "../services/login.action.js";


export default function MenuDashboard() {
  const context = useContext(AuthGlobal);
  const cerrarSesion = () => {
      logoutUser(context.dispatch);
  };
  const url_poll="/poll"
  const [anchorEl, setAnchorEl] = React.useState(null);

 const handleClick = (event) => {
   setAnchorEl(event.currentTarget);
 };

 const handleClose = () => {
   setAnchorEl(null);
 };

  return (
  <div id="app">

    <section className="main-content columns is-fullheight">
      <aside className="column is-12 is-narrow-mobile is-fullheight section is-hidden-mobile">
        <p className="menu-label is-hidden-touch">Navigation</p>
        <ul className="menu-list">
          <li>
            <a href={url_poll} className="is-active-menu">
              <span class="icon"><i class="fa fa-home"></i></span> Dashboard
            </a>
          </li>
          <li>
          <div class="navbar-link"  onClick={handleClick}>
              <SupervisedUserCircleIcon style={{marginRight :"10px"}}/>
                Authority
          </div>
        </li>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <a href={url_poll}>
          <span className="icon is-small"><i className="fa fa-link"></i></span> Add
        </a>
      </MenuItem>
        <MenuItem onClick={handleClose}>
          <a href={url_poll}>
          <span className="icon is-small"><i className="fa fa-link"></i></span> List
        </a>
        </MenuItem>

      </Menu>
      <ul>
        <li>
        <div class="navbar-link"  onClick={handleClick}>
            <SettingsBrightnessIcon style={{marginRight :"10px"}}/>
              Configuration UI
        </div>
      </li>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <a href={url_poll}>
          <span className="icon is-small"><i className="fa fa-link"></i></span> Add
        </a>
      </MenuItem>
        <MenuItem onClick={handleClose}>
          <a href={url_poll}>
          <span className="icon is-small"><i className="fa fa-link"></i></span> List
        </a>
        </MenuItem>

      </Menu>
      </ul>
      <ul>
        <li>
        <div class="navbar-link"  onClick={handleClick}>
            <HowToVoteIcon style={{marginRight :"10px"}}/>
               Poll
        </div>
      </li>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <a href={url_poll}>
          <span className="icon is-small"><i className="fa fa-link"></i></span> Add
        </a>
      </MenuItem>
        <MenuItem onClick={handleClose}>
          <a href={url_poll}>
          <span className="icon is-small"><i className="fa fa-link"></i></span> List
        </a>
        </MenuItem>

      </Menu>
      </ul>

      <ul>
        <li>
        <div class="navbar-link"  onClick={handleClick}>
            <BarChartIcon style={{marginRight :"10px"}}/>
               Reports
        </div>
      </li>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <a href={url_poll}>
          <span className="icon is-small"><i className="fa fa-link"></i></span> Add
        </a>
      </MenuItem>
        <MenuItem onClick={handleClose}>
          <a href={url_poll}>
          <span className="icon is-small"><i className="fa fa-link"></i></span> List
        </a>
        </MenuItem>

      </Menu>
      </ul>
      <ul>
        <li>
            <div class="navbar-link" onClick={cerrarSesion}>
          <ExitToAppIcon style={{marginRight :"10px"}}/> Logout
          </div>
        </li>
      </ul>

        </ul>

      </aside>
    </section>

<footer className="footer is-hidden">
  <div className="container">
    <div className="content has-text-centered">
      <p>Hello</p>
    </div>
  </div>
</footer>

  </div>

  );
}
