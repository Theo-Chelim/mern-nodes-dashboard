import React, { Component } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import Drawer from "@material-ui/core/Drawer";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import { red, orange, green } from "@material-ui/core/colors";

import DoneIcon from "@material-ui/icons/Done";
import ErrorIcon from "@material-ui/icons/Error";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { IoIosPower, IoIosFlash, IoIosLogIn } from "react-icons/io";

import Terminal from "./Terminal";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.openTerminal = this.openTerminal.bind(this);
    this.state = {
      open: false,
    };
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
            {[...new Array(10)].map((_, key) => (
              <EdgeCard
                key={key + 1}
                identifier={key + 1}
                openTerminal={this.openTerminal}
              />
            ))}
          </Grid>
        </Grid>
        <br /> <br />
        <Divider />
        <h2 className="fontTitle"> Virtual edges </h2>
        <Grid container spacing={2}>
          {[...new Array(100)].map((_, key) => (
            <EdgeCard key={key + 11} identifier={key + 11} />
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
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  getData = () => {
    fetch(
      process.env.REACT_APP_BASE_URL +
        "/api/edge/" + this.props.identifier + "/availability" 
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
    this.intervalID = setTimeout(this.getData.bind(this), 5000);
  };

  handleTerminal = () => {};

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
          {this.state.available ? (
            <CardActions disableSpacing>
              <IconButton aria-label="Power off">
                <IoIosPower />
              </IconButton>
              <IconButton aria-label="Stress">
                <IoIosFlash />
              </IconButton>
              <IconButton aria-label="Login" onClick={this.props.openTerminal}>
                <IoIosLogIn />
              </IconButton>
              <Grid container justifyContent="flex-end">
                <IconButton aria-label="show more">
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
            </CardActions>
          ) : (
            ""
          )}
        </Card>
      </Grid>
    );
  }
}
