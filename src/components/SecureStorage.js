import React, { Component } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


export default class SecureStorage extends Component {
  render() {
    return (
      <Grid container style={{ padding: 10 }}>
        <h1 className="fontTitle"> Secure storage </h1>
        <Grid item xs={12} sm={12} md={12}>
          <Card variant="outlined" style={{ backgroundColor: "#f0f0f0" }}>
            <CardContent>
              <h3 className="fontTitle"> Upload new file </h3>
              <Box
                border={0}
                borderColor="grey.500"
                borderRadius={16}
                style={{ padding: 10 }}
              >
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item md={2}>
                    <InputLabel shrink id="file">
                      Upload file
                    </InputLabel>
                    <FileUploadButton />
                  </Grid>
                  <Grid item md={2}>
                    <InputLabel shrink id="len">
                      Number of chunks
                    </InputLabel>

                    <Slider
                      style={{ width: 150 }}
                      labelId="len"
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      step={1}
                      min={3}
                      max={10}
                    />
                  </Grid>
                  <Grid item md={2}>
                    <InputLabel id="algo" shrink>
                      Optimization algorithm
                    </InputLabel>
                    <Select value={1} labelId="algo">
                      <MenuItem value={1}>Random</MenuItem>
                      <MenuItem value={2}>Bestfit</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item md={2}>
                    <Button color="primary" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={12} style={{ marginTop: 10 }}>
          <Card variant="outlined" style={{ backgroundColor: "#f0f0f0" }}>
            <CardContent>
              <h3 className="fontTitle"> My documents </h3>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

class FileUploadButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fileUpload: null
    }
  }
  handleFileUpload = (event) => {
    this.setState({fileUpload: event.target.files[0].name})
  };

  render() {
    return (
      <React.Fragment>
        <input
          ref="fileInput"
          onChange={this.handleFileUpload}
          type="file"
          style={{display: "none"}}
          // multiple={false}
        />
        <Button variant="outlined" color="primary" onClick={() => this.refs.fileInput.click()}>
          {this.state.fileUpload === null ? "Choose file" : this.state.fileUpload}
        </Button>
      </React.Fragment>
    );
  }
}