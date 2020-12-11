import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles({
  root: {
    width: 230,
  },
});

export default function TypographyMenu() {

  const classes = useStyles();
  const url_poll="/poll"

  return (
    <Paper className={classes.root} style={{background:'#f8f9fa', height:'100%' }}>
      <MenuList>
        <MenuItem>
        <Typography variant="inherit">General</Typography>
        </MenuItem>
        <MenuItem>
        <li><a href={url_poll}>Dashboard</a></li>
        </MenuItem>
          <MenuItem>
          <ListItemIcon>
            <SupervisedUserCircleIcon fontSize="small" />
          </ListItemIcon>
      <Typography variant="inherit"> Authority</Typography>
        </MenuItem>
        <Menu>
            <MenuItem>Add</MenuItem>
            <MenuItem>List</MenuItem>
        </Menu>
        <MenuItem>
          <ListItemIcon>
            <SettingsBrightnessIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Configuration UI</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <HowToVoteIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Poll
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BarChartIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Reports</Typography>
        </MenuItem>
        <div className="padding-logout">
        </div>
        <MenuItem>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Logout</Typography>
        </MenuItem>

      </MenuList>
    </Paper>
  );
}
