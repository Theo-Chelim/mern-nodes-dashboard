import React, { Component } from "react";

import { Link } from "react-router-dom";

import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";

export default class ConfigNetwork extends Component {
  constructor(props) {
    super(props);
    this.referentials = [];
    this.state = {
      variants: [],
    };
  }

  componentDidMount() {
    this.getEdges();
  }

  getEdges = () => {
    fetch(process.env.REACT_APP_BASE_URL + "/api/edge/", { importance: "high" })
      .then((res) => res.json())
      .then(
        (result) => {
          let edgeVariants = new Set();
          let variants = [];

          result.forEach((edge) => {
            edgeVariants.add(
              JSON.stringify([edge.arch, edge.cpu, edge.smp, edge.memory])
            );
          });

          for (let variant of edgeVariants) {
            let count = 0;
            let tuple = JSON.parse(variant);
            result.forEach((edge) => {
              if (
                edge.arch === tuple[0] &&
                edge.cpu === tuple[1] &&
                edge.smp === tuple[2] &&
                edge.memory === tuple[3]
              ) {
                count++;
              }
            });

            let arch = 0;
            switch (tuple[0]) {
              case "arm32":
                arch = 1;
                break;
              case "arm64":
                arch = 2;
                break;
              default:
                break;
            }

            let cpu = 0;
            switch (tuple[1]) {
              case "cortex-a53":
                cpu = 1;
                break;
              case "cortex-a57":
                cpu = 2;
                break;
              default:
                break;
            }

            let core = tuple[2];

            let memory = 0;
            switch (tuple[3]) {
              case 256:
                memory = 1;
                break;
              case 512:
                memory = 2;
                break;
              case 1024:
                memory = 3;
                break;
              case 2048:
                memory = 4;
                break;
              default:
                break;
            }

            let ref = React.createRef();
            this.referentials = [...this.referentials, ref];

            variants = [
              ...variants,
              <ConfigVariant
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
            this.setState({ variants: variants });
          } else {
            this.setState({
              variants: [
                <ConfigVariant
                  arch={1}
                  cpu={1}
                  core={1}
                  memory={1}
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

  handleSubmit = () => {
    let edges_data = [];
    let count = 1;
    this.referentials.forEach((ele) => {
      [...Array(parseInt(ele.current.state.clone)).keys()].forEach((_) => {
        edges_data = [
          ...edges_data,
          {
            id: count,
            arch: "arm64",
            machine: "virt",
            cpu: "cortex-a57",
            smp: 2,
            memory: 256,
          },
        ];
        count++;
      });
    });
    console.log(edges_data);
  };

  addVariant = () => {
    let ref = React.createRef();
    this.referentials = [...this.referentials, ref];
    this.setState({
      variants: [
        ...this.state.variants,
        <ConfigVariant
          arch={1}
          cpu={1}
          core={1}
          memory={1}
          clone={1}
          ref={ref}
        />,
      ],
    });
  };

  render() {
    return (
      <Box>
        <h2 className={"fontTitle"}>
          {" "}
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
          Configure virtual edges network{" "}
        </h2>
        <Grid container justifyContent="center">
          <Grid item>
            <Button
              color="primary"
              variant="contained"
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
            title="Add new edge Variant"
            placement="right"
            aria-label="add"
          >
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={this.addVariant}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Box>
    );
  }
}

class ConfigVariant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arch: props.arch,
      cpu: props.cpu,
      core: props.core,
      memory: props.memory,
      clone: props.clone,
    };
  }

  handleArch = (event) => {
    this.setState({ arch: event.target.value });
  };

  handleCpu = (event) => {
    this.setState({ cpu: event.target.value });
  };

  handleCore = (event) => {
    this.setState({ core: event.target.value });
  };

  handleMemory = (event) => {
    this.setState({ memory: event.target.value });
  };

  handleClone = (event) => {
    this.setState({ clone: event.target.value });
  };

  render() {
    return (
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={6} sm={6} md={6}>
          <Card variant="outlined" style={{ backgroundColor: "#f0f0f0" }}>
            <CardContent>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item md={2}>
                  <InputLabel id="arch" shrink>
                    Architecture
                  </InputLabel>
                  <Select
                    value={this.state.arch}
                    labelId="arch"
                    onChange={this.handleArch}
                  >
                    <MenuItem value={1}>ARM 32bits</MenuItem>
                    <MenuItem value={2}>ARM 64bits</MenuItem>
                    <MenuItem value={3}>x86 </MenuItem>
                    <MenuItem value={4}>x86_64 </MenuItem>
                    <MenuItem value={5}>Mips </MenuItem>
                  </Select>
                </Grid>
                <Grid item md={2}>
                  <InputLabel id="cpu" shrink>
                    CPU
                  </InputLabel>
                  <Select
                    value={this.state.cpu}
                    labelId="cpu"
                    onChange={this.handleCpu}
                  >
                    <MenuItem value={1}> Cortex A53 </MenuItem>
                    <MenuItem value={2}> Cortex A57 </MenuItem>
                  </Select>
                </Grid>
                <Grid item md={1}>
                  <InputLabel id="core" shrink>
                    Core
                  </InputLabel>
                  <Select
                    value={this.state.core}
                    labelId="core"
                    onChange={this.handleCore}
                  >
                    <MenuItem value={1}> 1 </MenuItem>
                    <MenuItem value={2}> 2 </MenuItem>
                    <MenuItem value={3}> 3 </MenuItem>
                    <MenuItem value={4}> 4 </MenuItem>
                  </Select>
                </Grid>
                <Grid item md={2}>
                  <InputLabel id="memory" shrink>
                    Memory
                  </InputLabel>
                  <Select
                    value={this.state.memory}
                    labelId="memory"
                    onChange={this.handleMemory}
                  >
                    <MenuItem value={1}> 256 Mb</MenuItem>
                    <MenuItem value={2}> 512 Mb </MenuItem>
                    <MenuItem value={3}> 1024 Mb </MenuItem>
                    <MenuItem value={4}> 2048 Mb </MenuItem>
                  </Select>
                </Grid>
                <Grid item md={2}>
                  <InputLabel id="Clone" shrink>
                    # of clone
                  </InputLabel>
                  <TextField
                    id="standard-number"
                    variant="standard"
                    value={this.state.clone}
                    onChange={this.handleClone}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <br />
      </Grid>
    );
  }
}
