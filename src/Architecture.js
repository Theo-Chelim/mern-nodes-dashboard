import React from "react";

import Box from "@material-ui/core/Box";

import architecture_image from "./architecture.jpg";
import { Grid, Card } from "@material-ui/core";

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
