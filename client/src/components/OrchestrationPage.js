import React from "react";

import Box from "@material-ui/core/Box";

import { Grid, Button, Typography } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";


import { blue, grey } from "@material-ui/core/colors";

export default function Orchestration() {
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
                    defaultValue={10}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <br />
                <Grid item md={12}>
                  <InputLabel id="bandwith" shrink>
                    Bandwith requirements
                  </InputLabel>

                  <TextField
                    id="standard-number"
                    variant="standard"
                    type="number"
                    defaultValue={10}
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
                    defaultValue={10}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <br />
                <Grid item md={12}>
                  <InputLabel id="bandwith" shrink>
                    Bandwith requirements
                  </InputLabel>

                  <TextField
                    id="standard-number"
                    variant="standard"
                    type="number"
                    defaultValue={10}
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
                    defaultValue={10}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <br />
                <Grid item md={12}>
                  <InputLabel id="bandwith" shrink>
                    Bandwith requirements
                  </InputLabel>

                  <TextField
                    id="standard-number"
                    variant="standard"
                    type="number"
                    defaultValue={10}
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
                    defaultValue={10}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <br />
                <Grid item md={12}>
                  <InputLabel id="bandwith" shrink>
                    Bandwith requirements
                  </InputLabel>

                  <TextField
                    id="standard-number"
                    variant="standard"
                    type="number"
                    defaultValue={10}
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
              <Button variant="contained" style={{backgroundColor: blue[100]}}>Exact solution</Button>
            </center>
          </Grid>{" "}
          <br />
          <Grid item md={4}>
            <center>
              <Button variant="contained" style={{backgroundColor: blue[100]}}>Heuristics approach</Button>
            </center>
          </Grid>{" "}
          <br />
          <Grid item md={4}>
            <center>
              <Button variant="contained" style={{backgroundColor: blue[500]}}>Renforcement learning</Button>
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
                    <b>Edge A</b>
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
                    <b>Edge B</b>
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
                    <b>Edge C</b>
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
                    <b>Edge D</b>
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
