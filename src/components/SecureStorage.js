import React, { Component } from "react";

import Moment from "moment";

import axios from "axios";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Typography } from "@material-ui/core";
export default class SecureStorage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      myfiles: [],
      open: false,
      openInfos: false,
      fileInfosName: "",
      fileInfosStrategy: [],
    };
  }

  componentDidMount() {
    this.getAllFiles();
  }

  getAllFiles = () => {
    axios.get("http://192.168.26.1:9000/api/files", {}).then((res) => {
      this.setState({
        myfiles: [],
      });
      for (var i = 0; i < res.data.length; i++) {
        this.setState({
          myfiles: [
            {
              name: res.data[i].name,
              id: res.data[i]._id,
              date: res.data[i].updated_at,
            },
            ...this.state.myfiles,
          ],
        });
      }
    });
  };

  handleSelectedFile = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleSubmit = (event) => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("nb_chunks", 3);
    data.append("algo", "bestfit");
    console.log(data);
    axios.post("http://192.168.26.1:9000/api/file", data, {}).then((res) => {
      console.log(res.statusText);
    });
    this.setState({ selectedFile: null });
    this.setState({ open: true });
    setTimeout(this.getAllFiles.bind(this), 1000);
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  handleCloseInfos = () => {
    this.setState({ openInfos: false });
  };

  handleOpenInfos = (id) => {
    axios
      .get("http://192.168.26.1:9000/api/file/" + id + "/infos", {})
      .then((res) => {
        this.setState({
          fileInfosName: res.data.name,
          fileInfosStrategy: [...res.data.strategy],
        });
      });
    this.setState({ openInfos: true });
  };

  render() {
    return (
      <Grid container style={{ padding: 10 }}>
        <h1 className="fontTitle"> Secure storage </h1>
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
            Uploaded and secured file successfuly on edges
          </MuiAlert>
        </Snackbar>
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
                    <input
                      ref="fileInput"
                      onChange={this.handleSelectedFile}
                      type="file"
                      style={{ display: "none" }}
                      multiple={false}
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => this.refs.fileInput.click()}
                    >
                      {this.state.selectedFile === null
                        ? "Choose file"
                        : this.state.selectedFile.name.substring(0, 20) +
                              (this.state.selectedFile.name.length >= 20 ? "..." : "")}
                    </Button>
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
                      defaultValue={3}
                      step={1}
                      min={3}
                      max={20}
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
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={this.handleSubmit}
                    >
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
              <Grid container spacing={2}>
                {this.state.myfiles.map((file, index) => {
                  return (
                    <Grid item md={3}>
                      <Box
                        borderRadius="16px"
                        style={{ backgroundColor: "#dedede" }}
                        marginBottom={2}
                      >
                        <ListItem>
                          <ListItemText
                            primary={
                              file.name.substring(0, 35) +
                              (file.name.length >= 35 ? "..." : "")
                            }
                            secondary={Moment(file.date).fromNow()}
                          />
                          <Button
                            variant="outlined"
                            onClick={() => this.handleOpenInfos(file.id)}
                          >
                            Infos
                          </Button>
                        </ListItem>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Dialog
          onClose={this.handleCloseInfos}
          aria-labelledby="simple-dialog-title"
          open={this.state.openInfos}
        >
          <DialogTitle id="simple-dialog-title">
            <h6 className="fontTitle">Fichier {this.state.fileInfosName}</h6>
          </DialogTitle>
          <ul style={{ padding: "35px" }}>
            {this.state.fileInfosStrategy.map((item) => {
              return (
                <li style={{ listStyleType: "none" }}>
                  {item.chunk} : {item.edge}
                </li>
              );
            })}
          </ul>
          <br />
          <br />
          <Grid container justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: "5px" }}
            >
              Download
            </Button>
          </Grid>
        </Dialog>
      </Grid>
    );
  }
}
