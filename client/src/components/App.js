import React from "react";

import { Route, Link, Switch, useLocation } from "react-router-dom";

import clsx from "clsx";

import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  VpnKey as VpnKeyIcon,
  AccountTree as AccountTreeIcon,
  Category as CategoryIcon,
} from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

import Dashboard from "./Dashboard";
import SecureStorage from "./SecureStorage";
import Orchestration from "./Orchestration";
import Architecture from "./Architecture";
import ConfigNetwork from "./ConfigNetwork";
import Terminal from "./Terminal";

import systemx_logo from "../images/systemx.png";

export default function App() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let location = useLocation();

  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open menu"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            <b>I</b>nternet of Things <b>O</b>rchestration and <b>Net</b>
            work (<b>IONet</b>)
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClick={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Grid container className={classes.drawerHeader}>
          <Grid item md={3}>
            <Avatar alt="IRT Logo" src={systemx_logo} />
          </Grid>
          <Grid item md={7}>
            <Typography variant="h6"> IRT SytemX </Typography>
          </Grid>
          <Grid item md={2}>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        <List>
          <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/">
            <ListItem
              button
              divider
              key="dashboard"
              selected={location.pathname === "/"}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/architecture"
          >
            <ListItem
              button
              divider
              key="architecture"
              selected={location.pathname === "/architecture"}
            >
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary="Architecture" />
            </ListItem>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/secure_storage"
          >
            <ListItem
              button
              divider
              key="secure_storage"
              selected={location.pathname === "/secure_storage"}
            >
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary="Secure data storage" />
            </ListItem>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/orchestration"
          >
            <ListItem
              button
              divider
              key="orchestration"
              selected={location.pathname === "/orchestration"}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Orchestration algorithms" />
            </ListItem>
          </Link>
        </List>
      </Drawer>

      <Box>
        <Container maxWidth="xl" style={{ padding: "6vh", height: "100%" }}>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/secure_storage">
              <SecureStorage />
            </Route>
            <Route path="/orchestration">
              <Orchestration />
            </Route>
            <Route path="/architecture">
              <Architecture />
            </Route>
            <Route path="/configNetwork">
              <ConfigNetwork />
            </Route>
          </Switch>
        </Container>
        <Grid container justifyContent="center">
          <i>
            IRT SystemX - Exploratory research 2021 - Makhlouf HADJI & Théo
            CHELIM{" "}
          </i>
        </Grid>
      </Box>
    </div>
  );
}

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#4b9bd8",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#4b9bd8",
    color: "white",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));
