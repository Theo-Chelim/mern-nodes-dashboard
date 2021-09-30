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
    this.state = {
      types: [<ConfigType />],
    };
  }

  addType = () => {
    console.log("test add");
    this.setState({ types: [...this.state.types, <ConfigType />] });
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
          <Grid item >
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleSubmit}
            >
              Validate configuration
            </Button>
          </Grid>
        </Grid>
        <br/>
        {this.state.types.map((type, key) => type)}
        <br />

        <Grid container justifyContent="center">
          <Tooltip title="Add new edge type" placement="right" aria-label="add">
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={this.addType}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Box>
    );
  }
}

class ConfigType extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

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
                  <Select defaultValue={1} labelId="arch">
                    <MenuItem value={1}>ARM 32bits</MenuItem>
                    <MenuItem value={2}>ARM 64bits</MenuItem>
                    <MenuItem value={3}>x86 </MenuItem>
                    <MenuItem value={3}>x86_64 </MenuItem>
                    <MenuItem value={3}>Mips </MenuItem>
                  </Select>
                </Grid>
                <Grid item md={2}>
                  <InputLabel id="cpu" shrink>
                    CPU
                  </InputLabel>
                  <Select defaultValue={1} labelId="cpu">
                    <MenuItem value={1}>Cortex A53</MenuItem>
                    <MenuItem value={2}> ... </MenuItem>
                    <MenuItem value={3}> ... </MenuItem>
                    <MenuItem value={3}> ... </MenuItem>
                    <MenuItem value={3}> ... </MenuItem>
                  </Select>
                </Grid>
                <Grid item md={1}>
                  <InputLabel id="core" shrink>
                    Core
                  </InputLabel>
                  <Select defaultValue={1} labelId="core">
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}> 2 </MenuItem>
                    <MenuItem value={3}> 3 </MenuItem>
                    <MenuItem value={3}> 4 </MenuItem>
                  </Select>
                </Grid>
                <Grid item md={2}>
                  <InputLabel id="memory" shrink>
                    Memory
                  </InputLabel>
                  <Select defaultValue={1} labelId="memory">
                    <MenuItem value={1}> 256 Mb</MenuItem>
                    <MenuItem value={2}> 512 Mb </MenuItem>
                    <MenuItem value={3}> 1024 Mb </MenuItem>
                    <MenuItem value={3}> 2048 Mb </MenuItem>
                  </Select>
                </Grid>
                <Grid item md={2}>
                  <InputLabel id="Clone" shrink>
                    # of clone
                  </InputLabel>
                  <TextField
                    id="standard-number"
                    type="number"
                    defaultValue="1"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
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
