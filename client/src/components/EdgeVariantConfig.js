import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

export default class EdgeVariantConfig extends Component {

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
                    name="arch"
                    onChange={this.handleArch}
                  >
                    <MenuItem value={0}>ARM 32bits</MenuItem>
                    <MenuItem value={1}>ARM 64bits</MenuItem>
                    <MenuItem value={2}>x86 </MenuItem>
                    <MenuItem value={3}>x86_64 </MenuItem>
                    <MenuItem value={4}>MIPS </MenuItem>
                    <MenuItem value={5}>PowerPC </MenuItem>
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
                    <MenuItem value={0}> Cortex A53 </MenuItem>
                    <MenuItem value={1}> Cortex A57 </MenuItem>
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
                    <MenuItem value={0}> 1 </MenuItem>
                    <MenuItem value={1}> 2 </MenuItem>
                    <MenuItem value={2}> 3 </MenuItem>
                    <MenuItem value={3}> 4 </MenuItem>
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
                    <MenuItem value={0}> 256 Mb</MenuItem>
                    <MenuItem value={1}> 512 Mb </MenuItem>
                    <MenuItem value={2}> 1024 Mb </MenuItem>
                    <MenuItem value={3}> 2048 Mb </MenuItem>
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
      </Grid>
    );
  }
}
