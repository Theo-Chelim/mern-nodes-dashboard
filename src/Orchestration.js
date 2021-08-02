import React from "react";

import Box from "@material-ui/core/Box";

import { Grid, Card, Button, ButtonGroup } from "@material-ui/core";

export default function Orchestration() {
  return (
    <Box>
      <h1 className={"fontTitle"}> Orchestration algorithms </h1>
      <Grid container justifyContent="center">
        <Button variant="contained">Exact solution</Button>
      </Grid> <br/ >
      <Grid container justifyContent="center">
        <Button variant="contained">Heuristics approach</Button>
      </Grid> <br/ >
      <Grid container justifyContent="center">
        <Button variant="contained">Renforcement learning</Button>
      </Grid> <br/ >
    </Box>
  );
}
