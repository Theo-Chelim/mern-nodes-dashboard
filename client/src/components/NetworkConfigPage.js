import React, { Component } from "react";

import { Link } from "react-router-dom";

import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";

import { blue, grey } from "@material-ui/core/colors";

import EdgeVariantConfig from "./EdgeVariantConfig";

export default class ConfigurationNetworkPage extends Component {
  constructor(props) {
    super(props);
    this.referentials = [];
    this.arch_values = ["arm32", "arm64", "x86", "x86_64", "mips", "powerpc"];
    this.cpu_values = ["cortex-a53", "cortex-a57"];
    this.core_values = [1, 2, 3, 4];
    this.memory_values = [256, 512, 1024, 2048];
    this.state = {
      variants: [],
      open: false,
    };
  }

  componentDidMount() {
    this.getEdges();
  }

  getEdges = () => {
    fetch(process.env.REACT_APP_BASE_URL + "/api/edge/")
      .then((res) => res.json())
      .then(
        (result) => {
          this.referentials = [];
          let edgeVariants = new Set();
          result.forEach((edge) => {
            edgeVariants.add(
              JSON.stringify([edge.arch, edge.cpu, edge.smp, edge.memory])
            );
          });

          let variants = [];
          for (let variant of edgeVariants) {
            let count = 0;
            let variant_values = JSON.parse(variant);
            result.forEach((edge) => {
              if (
                JSON.stringify([edge.arch, edge.cpu, edge.smp, edge.memory]) ===
                variant
              ) {
                count++;
              }
            });

            let arch = this.arch_values.findIndex(
              (x) => x === variant_values[0]
            );
            let cpu = this.cpu_values.findIndex((x) => x === variant_values[1]);
            let core = this.core_values.findIndex(
              (x) => x === variant_values[2]
            );
            let memory = this.memory_values.findIndex(
              (x) => x === variant_values[3]
            );

            let ref = React.createRef();
            this.referentials = [...this.referentials, ref];

            variants = [
              ...variants,
              <EdgeVariantConfig
                arch={arch}
                cpu={cpu}
                core={core}
                memory={memory}
                clone={count}
                ref={ref}
              />,
            ];
          }

          if (variants.length > 0) {
            this.setState({ variants: [] });
            this.setState({ variants: variants });
          } else {
            this.setState({
              variants: [
                <EdgeVariantConfig
                  arch={0}
                  cpu={0}
                  core={0}
                  memory={0}
                  clone={1}
                />,
              ],
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  handleSubmit = () => {
    let edges_data = [];
    let count = 1;

    this.referentials.forEach((ref) => {
      [...Array(parseInt(ref.current.state.clone)).keys()].forEach((_) => {
        const new_edge = {
          id: count + 10,
          arch: this.arch_values[ref.current.state.arch],
          machine: "virt",
          cpu: this.cpu_values[ref.current.state.cpu],
          smp: this.core_values[ref.current.state.core],
          memory: this.memory_values[ref.current.state.memory],
        };
        edges_data = [...edges_data, new_edge];
        count++;
      });
    });

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edges_data),
    };

    fetch(process.env.REACT_APP_BASE_URL + "/api/edge/", requestOptions).then(
      (response) => {
        response.json();
        this.setState({ open: true });
        this.getEdges();
      }
    );
  };

  addVariant = () => {
    let ref = React.createRef();
    this.referentials = [...this.referentials, ref];
    this.setState({
      variants: [
        ...this.state.variants,
        <EdgeVariantConfig
          arch={0}
          cpu={0}
          core={0}
          memory={0}
          clone={1}
          ref={ref}
        />,
      ],
    });
  };

  render() {
    return (
      <Box>
        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="success"
          >
            Configuration validated successfuly
          </MuiAlert>
        </Snackbar>
        <h2 className={"fontTitle"}>
          <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/">
            <Tooltip
              title="Back to dashboard"
              placement="right"
              aria-label="dashboard"
            >
              <IconButton aria-label="dashboard">
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          </Link>
          Configure virtual edges network
        </h2>
        <Grid container justifyContent="center">
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              style={{ backgroundColor: blue[500] }}
              onClick={this.handleSubmit}
            >
              Validate configuration
            </Button>
          </Grid>
        </Grid>

        <br />

        {this.state.variants.map((variant, key) => variant)}

        <br />

        <Grid container justifyContent="center">
          <Tooltip
            title="Add new edge variant"
            placement="right"
            aria-label="add"
          >
            <Fab
              size="small"
              aria-label="add"
              style={{ backgroundColor: blue[500] }}
              onClick={this.addVariant}
            >
              <AddIcon style={{ color: grey[50] }} />
            </Fab>
          </Tooltip>
        </Grid>
      </Box>
    );
  }
}
