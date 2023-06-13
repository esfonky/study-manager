import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotesIcon from '@mui/icons-material/Notes';
import ChecklistIcon from '@mui/icons-material/Checklist';
import TimerIcon from '@mui/icons-material/Timer';


function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const drawerWidth = 240;

function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <TimelapseIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1 }}>
            Study Manager
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function SideBar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>

        <List aria-label="main sidebar menu">
          <ListItemLink to="/calendar" primary="Calendar" icon={<CalendarMonthIcon />} />
          <ListItemLink to="/notes" primary="Notes" icon={<NotesIcon />} />
          <ListItemLink to="/todo" primary="To-Do" icon={<ChecklistIcon />} />
          <ListItemLink to="/timer" primary="Study Timer" icon={<TimerIcon />} />
        </List>
      </Box>
    </Drawer>
  );
}

function Navigation() {
  return (
    <div>
      <TopBar />
      <SideBar />
    </div>
  );
}

export default Navigation;