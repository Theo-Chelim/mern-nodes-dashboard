import React, { Component } from "react";

import Box from "@material-ui/core/Box";

import { Grid, Button, Typography } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

import { blue, grey } from "@material-ui/core/colors";

export default class Orchestration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: ["?", "?", "?", "?"],
      selected: null,
    };
  }

  componentDidMount() {
    this.processAlgorithm();
  }

  processAlgorithm() {
    console.log("test");
    switch(String(this.state.selected)) {

      case "heuristic":
        fetch("http://localhost:9000/api/algorithm/heuristic", {
          method: "POST",
        })
          .then((res) => res.json())
          .then(
            (res) => {
              let results = [];
              res.forEach((element) => {
                results.push("Edge " + element.substr(1));
              });
              this.setState({ results });
            },
            (error) => {
              console.log(error);
            }
          );
        break;
    }
  }

  handleExact = () => {
    this.setState({ selected: "exact" });
  };
  
  handleHeuristic = () => {
    this.setState({ selected: "heuristic" });
    this.processAlgorithm();
  };

  handleRenforcement = () => {
    this.setState({ selected: "renforcement" });
  };

  render() {
    return (
      <Box>
        <h1 className={"fontTitle"}>
          {" "}
          Orchestration algorithms : Object detection{" "}
        </h1>
        <br />
        <h2 className={"fontTitle"} align="center">
          {" "}
          Virtual functions specifications
        </h2>
        <Box
          sx={{ border: "dashed" }}
          border={2}
          borderColor={grey[500]}
          borderRadius={5}
          style={{ padding: 10 }}
          width="100%"
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item md={2}>
              <Box
                display="flex"
                border={2}
                borderColor={blue[500]}
                bgcolor={blue[100]}
                borderRadius="100%"
                width="280px"
                height="280px"
                alignItems="center"
                justifyContent="center"
              >
                <Grid spacing={1}>
                  <Grid item md={12}>
                    <Typography variant="h4" align="center">
                      <b>Function 1</b>
                    </Typography>
                  </Grid>
                  <br />
                  <Grid item md={12}>
                    <InputLabel id="cpu" shrink>
                      CPU requirements
                    </InputLabel>

                    <TextField
                      id="standard-number"
                      variant="standard"
                      type="number"
                      defaultValue={0.1}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={1} alignItems="center" justifyContent="center">
              <Box
                display="flex"
                width="50px"
                height="50px"
                alignItems="center"
                justifyContent="center"
              >
                <DoubleArrowIcon
                  style={{ fontSize: "60px", paddingLeft: "100px" }}
                />
              </Box>
              <br />
              <InputLabel id="bandwith" shrink>
                Bandwith requirements
              </InputLabel>
              <TextField
                id="standard-number"
                variant="standard"
                type="number"
                defaultValue={0.1}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={2}>
              <Box
                display="flex"
                border={2}
                borderColor={blue[500]}
                bgcolor={blue[100]}
                borderRadius="100%"
                width="280px"
                height="280px"
                alignItems="center"
                justifyContent="center"
              >
                <Grid spacing={1}>
                  <Grid item md={12}>
                    <Typography variant="h4" align="center">
                      <b>Function 2</b>
                    </Typography>
                  </Grid>
                  <br />
                  <Grid item md={12}>
                    <InputLabel id="cpu" shrink>
                      CPU requirements
                    </InputLabel>

                    <TextField
                      id="standard-number"
                      variant="standard"
                      type="number"
                      defaultValue={0.1}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={1} alignItems="center" justifyContent="center">
              <Box
                display="flex"
                width="50px"
                height="50px"
                alignItems="center"
                justifyContent="center"
              >
                <DoubleArrowIcon
                  style={{ fontSize: "60px", paddingLeft: "100px" }}
                />
              </Box>
              <br />
              <InputLabel id="bandwith" shrink>
                Bandwith requirements
              </InputLabel>
              <TextField
                id="standard-number"
                variant="standard"
                type="number"
                defaultValue={0.1}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={2}>
              <Box
                display="flex"
                border={2}
                borderColor={blue[500]}
                bgcolor={blue[100]}
                borderRadius="100%"
                width="280px"
                height="280px"
                alignItems="center"
                justifyContent="center"
              >
                <Grid spacing={1}>
                  <Grid item md={12}>
                    <Typography variant="h4" align="center">
                      <b>Function 3</b>
                    </Typography>
                  </Grid>
                  <br />
                  <Grid item md={12}>
                    <InputLabel id="cpu" shrink>
                      CPU requirements
                    </InputLabel>

                    <TextField
                      id="standard-number"
                      variant="standard"
                      type="number"
                      defaultValue={0.1}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={1} alignItems="center" justifyContent="center">
              <Box
                display="flex"
                width="50px"
                height="50px"
                alignItems="center"
                justifyContent="center"
              >
                <DoubleArrowIcon
                  style={{ fontSize: "60px", paddingLeft: "100px" }}
                />
              </Box>
              <br />
              <InputLabel id="bandwith" shrink>
                Bandwith requirements
              </InputLabel>
              <TextField
                id="standard-number"
                variant="standard"
                type="number"
                defaultValue={0.1}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={2}>
              <Box
                display="flex"
                border={2}
                borderColor={blue[500]}
                bgcolor={blue[100]}
                borderRadius="100%"
                width="280px"
                height="280px"
                alignItems="center"
                justifyContent="center"
              >
                <Grid spacing={1}>
                  <Grid item md={12}>
                    <Typography variant="h4" align="center">
                      <b>Function 4</b>
                    </Typography>
                  </Grid>
                  <br />
                  <Grid item md={12}>
                    <InputLabel id="cpu" shrink>
                      CPU requirements
                    </InputLabel>

                    <TextField
                      id="standard-number"
                      variant="standard"
                      type="number"
                      defaultValue={0.1}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <br />
        <h2 className={"fontTitle"} align="center">
          {" "}
          Algorithm selection
        </h2>
        <Box
          sx={{ border: "dashed" }}
          border={2}
          borderColor={grey[500]}
          borderRadius={5}
          style={{ padding: 10 }}
          width="100%"
        >
          <Grid container justifyContent="center">
            <Grid item md={4} justifyContent="center">
              <center>
                <Button
                  onClick={this.handleExact}
                  variant="contained"
                  style={{
                    backgroundColor:
                      this.state.selected === "exact" ? blue[500] : blue[100],
                  }}
                >
                  Exact solution
                </Button>
              </center>
            </Grid>{" "}
            <br />
            <Grid item md={4}>
              <center>
                <Button
                  onClick={this.handleHeuristic}
                  variant="contained"
                  style={{
                    backgroundColor:
                      this.state.selected === "heuristic"
                        ? blue[500]
                        : blue[100],
                  }}
                >
                  Heuristics approach
                </Button>
              </center>
            </Grid>{" "}
            <br />
            <Grid item md={4}>
              <center>
                <Button
                  onClick={this.handleRenforcement}
                  variant="contained"
                  style={{
                    backgroundColor:
                      this.state.selected === "renforcement"
                        ? blue[500]
                        : blue[100],
                  }}
                >
                  Renforcement learning
                </Button>
              </center>
            </Grid>{" "}
          </Grid>
        </Box>
        <br />
        <h2 className={"fontTitle"} align="center">
          {" "}
          Real-time results
        </h2>
        <Box
          sx={{ border: "dashed" }}
          border={2}
          borderColor={grey[500]}
          borderRadius={5}
          style={{ padding: 10 }}
          width="100%"
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item md={2}>
              <Box
                display="flex"
                border={2}
                borderColor={blue[500]}
                bgcolor={blue[100]}
                borderRadius="100%"
                width="200px"
                height="200px"
                alignItems="center"
                justifyContent="center"
              >
                <Grid spacing={1}>
                  <Grid item md={12}>
                    <Typography variant="h4" align="center">
                      <b>{this.state.results[0]}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={1} alignItems="center" justifyContent="center">
              <Box
                display="flex"
                width="50px"
                height="50px"
                alignItems="center"
                justifyContent="center"
              >
                <DoubleArrowIcon
                  style={{ fontSize: "60px", paddingLeft: "100px" }}
                />
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box
                display="flex"
                border={2}
                borderColor={blue[500]}
                bgcolor={blue[100]}
                borderRadius="100%"
                width="200px"
                height="200px"
                alignItems="center"
                justifyContent="center"
              >
                <Grid spacing={1}>
                  <Grid item md={12}>
                    <Typography variant="h4" align="center">
                      <b>{this.state.results[1]}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={1} alignItems="center" justifyContent="center">
              <Box
                display="flex"
                width="50px"
                height="50px"
                alignItems="center"
                justifyContent="center"
              >
                <DoubleArrowIcon
                  style={{ fontSize: "60px", paddingLeft: "100px" }}
                />
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box
                display="flex"
                border={2}
                borderColor={blue[500]}
                bgcolor={blue[100]}
                borderRadius="100%"
                width="200px"
                height="200px"
                alignItems="center"
                justifyContent="center"
              >
                <Grid spacing={1}>
                  <Grid item md={12}>
                    <Typography variant="h4" align="center">
                      <b>{this.state.results[2]}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={1} alignItems="center" justifyContent="center">
              <Box
                display="flex"
                width="50px"
                height="50px"
                alignItems="center"
                justifyContent="center"
              >
                <DoubleArrowIcon
                  style={{ fontSize: "60px", paddingLeft: "100px" }}
                />
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box
                display="flex"
                border={2}
                borderColor={blue[500]}
                bgcolor={blue[100]}
                borderRadius="100%"
                width="200px"
                height="200px"
                alignItems="center"
                justifyContent="center"
              >
                <Grid spacing={1}>
                  <Grid item md={12}>
                    <Typography variant="h4" align="center">
                      <b>{this.state.results[3]}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}
