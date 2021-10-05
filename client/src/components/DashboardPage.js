import React, { Component } from "react";

import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import Tooltip from "@material-ui/core/Tooltip";

import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";

import EdgeCard from "./EdgeCard";

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edges: [],
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_BASE_URL + "/api/edge/")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ edges: result });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <Box>
        <h1 className="fontTitle"> Dashboard </h1>
        <h2 className="fontTitle"> Physical edges </h2>
        <Grid container spacing={2}>
          <Grid container spacing={2}>
            {this.state.edges.length > 0
              ? [...new Array(10)].map((_, key) => (
                  <EdgeCard key={key + 1} identifier={key + 1} />
                ))
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
