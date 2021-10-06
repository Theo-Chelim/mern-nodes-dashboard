import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

import { red, orange, green } from "@material-ui/core/colors";

import DoneIcon from "@material-ui/icons/Done";
import ErrorIcon from "@material-ui/icons/Error";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { IoIosPower, IoIosFlash, IoIosLogIn } from "react-icons/io";

export default class EdgeCard extends Component {
  intervalAvailability;

  constructor(props) {
    super(props);
    this.state = {
      available: null,
    };
    this.controller = new AbortController();
  }

  componentDidMount() {
    this.getAvailability();
  }

  componentWillUnmount() {
    this.controller.abort();
    clearTimeout(this.intervalAvailability);
  }

  getAvailability = () => {
    const { signal } = this.controller;

    fetch(
      process.env.REACT_APP_BASE_URL +
        "/api/edge/" +
        this.props.identifier +
        "/availability",
      { signal }
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

  handleLoginButton = (id) => {
    window.open(
      process.env.REACT_APP_WEB_SSH_URL +
        "/?hostname=172.16.100." +
        id +
        "&username=root&password=c2lubWFv"
    );
  };

  handlePowerOffButton = (id) => {
    fetch(
      process.env.REACT_APP_BASE_URL +
        "/api/edge/" +
        this.props.identifier +
        "/stop",
      { method: "POST" }
    ).then((res) => {
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
            </Typography>
            {this.props.arch ? (
              <Typography color="textSecondary" variant="subtitle2">
                {this.props.arch} / {this.props.core} {this.props.cpu} /
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
                onClick={() => this.handlePowerOffButton(this.props.identifier)}
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
                onClick={() => this.handleLoginButton(this.props.identifier)}
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
