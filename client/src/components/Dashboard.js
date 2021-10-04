import React, { Component } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import Drawer from "@material-ui/core/Drawer";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
//import LinearProgress from "@material-ui/core/LinearProgress";

import { red, orange, green } from "@material-ui/core/colors";

import DoneIcon from "@material-ui/icons/Done";
import ErrorIcon from "@material-ui/icons/Error";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "@material-ui/icons/Settings";

import { IoIosPower, IoIosFlash, IoIosLogIn } from "react-icons/io";

import Terminal from "./Terminal";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.openTerminal = this.openTerminal.bind(this);
    this.state = {
      open: false,
      edges: [],
    };
    fetch(process.env.REACT_APP_BASE_URL + "/api/edge/")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ edges: result });
          console.log(this.state.edges);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  openTerminal = () => {
    this.setState({ open: true });
  };

  closeTerminal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Box>
        <Drawer
          anchor="top"
          open={this.state.open}
          onClick={this.closeTerminal}
        >
          <Grid container justifyContent="center">
            <Typography variant="h6" className="fontTitle">
              {" "}
              SSH Terminal{" "}
            </Typography>
          </Grid>
          <Terminal />
        </Drawer>
        <h1 className="fontTitle"> Dashboard </h1>
        <h2 className="fontTitle"> Physical edges </h2>
        <Grid container spacing={2}>
          <Grid container spacing={2}>
            {this.state.edges.length > 0
              ? (
                [...new Array(10)].map((_, key) => 
                  <EdgeCard
                    key={key + 1}
                    identifier={key + 1}
                    openTerminal={this.openTerminal}
                  />
                )
                )
              : "Network configuration loading ... "}
          </Grid>
        </Grid>
        <br /> <br />
        <Divider />
        <h2 className="fontTitle">
          Virtual edges
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/configNetwork"
          >
            <Tooltip
              title="IOT network configuration"
              placement="right"
              aria-label="config"
            >
              <IconButton aria-label="config">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </h2>
        <Grid container spacing={2}>
          {this.state.edges.map((edge, key) => (
            <EdgeCard
              key={edge.id}
              identifier={edge.id}
              arch={edge.arch}
              cpu={edge.cpu}
              core={edge.smp}
              memory={edge.memory}
            />
          ))}
        </Grid>
      </Box>
    );
  }
}

class EdgeCard extends Component {
  intervalID;

  constructor(props) {
    super(props);
    this.state = {
      available: null,
      cpu: 100,
      memory: 50,
    };
    this.controller = new AbortController();
  }

  componentDidMount() {
    this.getAvailability();
  }

  componentWillUnmount() {
    this.controller.abort();
    clearTimeout(this.intervalID);
  }

  getCpu = () => {
    fetch(
      process.env.REACT_APP_BASE_URL +
        "/api/edge/" +
        this.props.identifier +
        "/cpu_usage"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ cpu: result.cpu });
        },
        (error) => {
          this.setState({ cpu: 100 });
        }
      );
    this.intervalID = setTimeout(this.getCpu.bind(this), 5000);
  };

  getMemory = () => {};

  getAvailability = () => {
    const {signal} = this.controller;

    fetch(
      process.env.REACT_APP_BASE_URL +
        "/api/edge/" +
        this.props.identifier +
        "/availability", { signal, importance: 'low'},
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ available: result.available });
        },
        (error) => {
          this.setState({ available: false });
        }
      );
    this.intervalID = setTimeout(this.getAvailability.bind(this), 5000);
  };

  handleTerminal = (id) => {
    window.open("http://192.168.26.1:8888/?hostname=172.16.100." + id + "&username=root&password="+btoa("sinmao"));
  };

  handlePowerOff = (id) => {
    axios
      .post(
        process.env.REACT_APP_BASE_URL +
          "/api/edge/" +
          this.props.identifier +
          "/stop"
      )
      .then((res) => {
        console.log(res.statusText);
      });
  };

  render() {
    return (
      <Grid item xs={12} sm={6} md={2}>
        <Card variant="outlined" style={{ backgroundColor: "#f0f0f0" }}>
          <CardContent>
            <Typography variant="h6" component="h2">
              Edge {this.props.identifier}
            </Typography>
            <Typography color="textSecondary">
              172.16.100.{this.props.identifier}
            </Typography>{" "}
            {this.props.arch ? (
              <Typography color="textSecondary" variant="subtitle2">
                {this.props.arch} / {this.props.core} {this.props.cpu} /{" "}
                {this.props.memory}mb 
              </Typography>
            ) : (
              <Typography color="textSecondary" variant="subtitle2">
                Raspberry Pi 4
              </Typography>
            )}
            <br />
            <Grid container justifyContent="center" spacing={1}>
              {this.state.available === null ? (
                <Chip
                  style={{ backgroundColor: orange[200] }}
                  size="medium"
                  label="Pending"
                  icon={<DataUsageIcon />}
                />
              ) : this.state.available ? (
                <Chip
                  style={{ backgroundColor: green[200] }}
                  size="medium"
                  label="Available"
                  icon={<DoneIcon />}
                />
              ) : (
                <Chip
                  style={{ backgroundColor: red[200] }}
                  size="medium"
                  label="Unavailable"
                  icon={<ErrorIcon />}
                />
              )}
            </Grid>
          </CardContent>

          <CardActions disableSpacing>
            <Tooltip title="Power off" placement="right" aria-label="power off">
              <IconButton
                aria-label="power off"
                onClick={() => this.handlePowerOff(this.props.identifier)}
              >
                <IoIosPower />
              </IconButton>
            </Tooltip>
            <Tooltip title="Stress" placement="right" aria-label="stress">
              <IconButton aria-label="stress">
                <IoIosFlash />
              </IconButton>
            </Tooltip>
            <Tooltip title="SSH login" placement="right" aria-label="login">
              <IconButton
                aria-label="login"
                onClick={() => this.handleTerminal(this.props.identifier)}
              >
                <IoIosLogIn />
              </IconButton>
            </Tooltip>

            <Grid container justifyContent="flex-end">
              <IconButton aria-label="show more">
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}
