import React from "react";

import { Box, Grid, Card } from "@material-ui/core";

import architecture_image from "../images/architecture.jpg";

export default function Architecture() {
  return (
    <Box>
      <h1 className={"fontTitle"}> Architecture </h1>
      <Grid container justifyContent="center">
        <Card variant="outlined" style={{padding: "50px"}}>
          <img src={architecture_image} alt="architecture IONet" />
        </Card>
      </Grid>
    </Box>
  );
}