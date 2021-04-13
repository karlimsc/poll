import React, { useContext } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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

  const url_dash="/";
  const url_poll="/poll";
  const url_listPoll="/polls";
  const url_auth="/authority";
  const url_listAuth="/authorities";
  const url_config="/configurationUI";
  const url_listConfig="/configurationUIList";
  const url_reports="/reports";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorAuth, setAnchorAuth] = React.useState(null);
  const [anchorConfig, setAnchorConfig] = React.useState(null);

 const handleClick = (event) => {
   setAnchorEl(event.currentTarget);
 };

 const handleClose = () => {
   setAnchorEl(null);
 };

 const handleClickAuth = (event) => {
   setAnchorAuth(event.currentTarget);
 };

 const handleCloseAuth = () => {
   setAnchorAuth(null);
 };

 const handleClickConfig = (event) => {
   setAnchorConfig(event.currentTarget);
 };

 const handleCloseConfig = () => {
   setAnchorConfig(null);
 };

  return (
  <div id="app">

    <section className="main-content columns is-fullheight">
      <aside className="column is-12 is-narrow-mobile is-fullheight section is-hidden-mobile">
        <p className="menu-label is-hidden-touch">Navigation</p>
        <ul className="menu-list">
          {(sessionStorage.getItem("email") === 'admin@gmail.com') &&
            <li>
              <div className="navbar-link"  onClick={handleClickAuth}>
                  <AccountCircleIcon style={{marginRight :"10px"}}/>
                    Admin
              </div>
            </li>
          }
            <li>
            <a href={url_dash} className="is-active-menu">
              <HomeIcon style={{marginRight :"10px"}}/> Dashboard
            </a>
          </li>
          <li>
          <div className="navbar-link"  onClick={handleClickAuth}>
              <SupervisedUserCircleIcon style={{marginRight :"10px"}}/>
                Authority
          </div>
        </li>
      <Menu
        id="menu-authority"
        anchorEl={anchorAuth}
        keepMounted
        open={Boolean(anchorAuth)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCloseAuth}>
          <a href={url_auth}>   <span className="icon is-small"><i className="fa fa-link"></i></span>  Add </a>
      </MenuItem>
        <MenuItem onClick={handleCloseAuth}>
          <a href={url_listAuth}>
          <span className="icon is-small"><i className="fa fa-link"></i></span> List
        </a>
        </MenuItem>

      </Menu>
      <ul>
        <li>
        <div className="navbar-link"  onClick={handleClickConfig}>
            <SettingsBrightnessIcon style={{marginRight :"10px"}}/>
              Configuration UI
        </div>
      </li>
      <Menu
        id="menu-configuration"
        anchorEl={anchorConfig}
        keepMounted
        open={Boolean(anchorConfig)}
        onClose={handleCloseConfig}
      >
        <MenuItem onClick={handleCloseConfig}>
          <a href={url_config}>
          <span className="icon is-small"><i className="fa fa-link"></i></span> Add
        </a>
      </MenuItem>
        <MenuItem onClick={handleCloseConfig}>
          <a href={url_listConfig}>
          <span className="icon is-small"><i className="fa fa-link"></i></span> List
        </a>
        </MenuItem>

      </Menu>
      </ul>
      <ul>
        <li>
        <div className="navbar-link"  onClick={handleClick}>
            <HowToVoteIcon style={{marginRight :"10px"}}/>
               Poll
        </div>
      </li>
      <Menu
        id="menu-poll"
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
          <a href={url_listPoll}>
          <span className="icon is-small"><i className="fa fa-link"></i></span> List
        </a>
        </MenuItem>

      </Menu>
      </ul>

      <ul>
        <li>
            <a href={url_reports}>
            <BarChartIcon style={{marginRight :"10px"}}/>
               Reports
             </a>
      </li>
      </ul>
      <ul>
        <li>
            <div className="navbar-link" onClick={cerrarSesion}>
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
