import React, { Component } from "react";
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

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import CategoryIcon from "@material-ui/icons/Category";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Dashboard from "./Dashboard";
import SecureStorage from "./SecureStorage";
import Orchestration from "./Orchestration";
import Architecture from "./Architecture";

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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
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
            work (IONet)
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        variant="primary"
        open={open}
        onClick={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Grid container>
            <Grid xs={4} md={4}>
              <Avatar alt="IRT Logo" src="/systemx_logo.png" />
            </Grid>
            <Grid xs={8} md={8}>
              <Typography variant="h6"> IRT SytemX </Typography>
            </Grid>
          </Grid>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/">
            <ListItem button divider selected={location.pathname === "/"}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/secure_storage"
          >
            <ListItem
              button
              divider
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
              selected={location.pathname === "/orchestration"}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Orchestration algorithms" />
            </ListItem>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/architecture"
          >
            <ListItem
              button
              divider
              selected={location.pathname === "/architecture"}
            >
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary="Architecture" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box color="text.primary">
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
            <Route path="/Architecture">
              <Architecture />
            </Route>
          </Switch>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
