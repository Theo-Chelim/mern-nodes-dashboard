import React, { Component } from "react";

import Moment from "moment";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { blue, grey } from "@material-ui/core/colors";

export default class SecureStoragePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optimization: 0,
      chunks: 3,
      selectedFile: null,
      myfiles: [],
      open: false,
      openInfos: false,
      fileInfosName: "",
      fileInfosId: null,
      fileInfosStrategy: [],
    };
  }

  componentDidMount() {
    this.getAllFiles();
  }

  getAllFiles = () => {
    fetch(process.env.REACT_APP_BASE_URL + "/api/file/")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ myfiles: [] });
        for (var i = 0; i < res.length; i++) {
          const newFile = {
            name: res[i].name,
            id: res[i]._id,
            date: res[i].updated_at,
          };
          this.setState({
            myfiles: [newFile, ...this.state.myfiles],
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
    data.append("chunks", this.state.chunks);
    data.append("optimization", this.state.optimization);

    fetch(process.env.REACT_APP_BASE_URL + "/api/file/", {
      method: "POST",
      body: data,
    }).then((res) => {
      console.log(res.statusText);
      this.setState({ open: true });
      this.setState({ selectedFile: null });
      this.getAllFiles();
    });
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
    fetch(process.env.REACT_APP_BASE_URL + "/api/file/" + id + "/infos")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          fileInfosName: res.name,
          fileInfosId: id,
          fileInfosStrategy: [...res.strategy],
        });
      });
    this.setState({ openInfos: true });
  };

  handleOptimizationChange = (event) => {
    this.setState({ optimization: event.target.value });
  };

  handleChunksChange = (_, value) => {
    this.setState({ chunks: value });
  };

  render() {
    return (
      <Grid container>
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
        <h1 className="fontTitle"> Secure storage usecase </h1>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            sx={{ border: "dashed" }}
            border={2}
            borderColor="grey.500"
            borderRadius={5}
            padding={3}
          >
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
                    style={{ color: blue[700], borderColor: blue[700] }}
                    onClick={() => this.refs.fileInput.click()}
                  >
                    {this.state.selectedFile === null
                      ? "Choose file"
                      : this.state.selectedFile.name.substring(0, 20) +
                        (this.state.selectedFile.name.length >= 20
                          ? "..."
                          : "")}
                  </Button>
                </Grid>
                <Grid item md={2}>
                  <InputLabel shrink id="len">
                    Number of chunks
                  </InputLabel>

                  <Slider
                    labelId="len"
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    value={this.state.chunks}
                    onChange={this.handleChunksChange}
                    style={{ color: blue[700], width: 150 }}
                    step={1}
                    min={3}
                    max={20}
                  />
                </Grid>
                <Grid item md={2}>
                  <InputLabel id="algo" shrink>
                    Optimization algorithm
                  </InputLabel>
                  <Select
                    value={this.state.optimization}
                    onChange={this.handleOptimizationChange}
                    labelId="algo"
                    style={{ width: "80%", color: blue[700] }}
                  >
                    <MenuItem value={0}> Random choice </MenuItem>
                    <MenuItem value={1}> BestFit - CPU metric </MenuItem>
                    <MenuItem value={2}> BestFit - Storage metric </MenuItem>
                  </Select>
                </Grid>
                <Grid item md={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ backgroundColor: blue[700] }}
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <br />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{ marginTop: 10 }}>
          <Box
            sx={{ border: "dashed" }}
            border={2}
            borderColor="grey.500"
            borderRadius={5}
            padding={3}
          >
            <h3 className="fontTitle"> My documents </h3>
            <br />
            <Grid container justifyContent="center" spacing={2}>
              {this.state.myfiles.map((file, index) => {
                return (
                  <Grid item md={2}>
                    <Box
                      border={1}
                      borderRadius={10}
                      sx={{ borderColor: "grey", backgroundColor: grey[200] }}
                      marginBottom={2}
                    >
                      <ListItem>
                        <ListItemText
                          primary={
                            file.name.substring(0, 15) +
                            (file.name.length >= 15 ? "..." : "")
                          }
                          secondary={Moment(file.date).fromNow()}
                        />
                        <Button
                          variant="outlined"
                          color={blue[700]}
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
          </Box>
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
              color={blue[700]}
              style={{ marginBottom: "5px" }}
            >
              <a
                href={
                  process.env.REACT_APP_BASE_URL +
                  "/api/file/" +
                  this.state.fileInfosId
                }
                download
              >
                Download
              </a>
            </Button>
          </Grid>
        </Dialog>
      </Grid>
    );
  }
}
