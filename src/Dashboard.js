import React, { Component } from "react";

import clsx from "clsx";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import { red, orange, green } from "@material-ui/core/colors";

import DoneIcon from "@material-ui/icons/Done";
import ErrorIcon from "@material-ui/icons/Error";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IoIosPower, IoIosFlash, IoIosLogIn } from "react-icons/io";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  typography: {
    fontFamily: "Arial",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {},
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const i = 1;

  return (
    <Box>
      <h1 className={(classes.typography, "fontTitle")}> Dashboard </h1>

      <h2 className={(classes.typography, "fontTitle")}> Physical edges </h2>
      <Grid container spacing={2}>
        <Grid container spacing={2}>
          {[...new Array(10)].map((key, item) => (
            <EdgeCard identifier={item + 1} />
          ))}
        </Grid>
      </Grid>

      <br />
      <br />
      <Divider />

      <h2 className={(classes.typography, "fontTitle")}> Virtual edges </h2>
      <Grid container spacing={2}>
        {[...new Array(100)].map((key, item) => (
          <EdgeCard identifier={item + 11} />
        ))}
      </Grid>
    </Box>
  );
}

class EdgeCard extends Component {
  intervalID;

  constructor(props) {
    super(props);
    this.state = {
      available: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  getData = () => {
    fetch("http://localhost:5000/api/available/" + this.props.identifier)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ available: result.available });
        },
        (error) => {
          this.setState({ available: false });
        }
      );
    this.intervalID = setTimeout(this.getData.bind(this), 5000);
  };

  render() {
    return (
      <Grid item xs={12} sm={6} md={2}>
        <Card variant="outlined" style={{backgroundColor: "#f0f0f0"}}>
          <CardContent>
            <Typography variant="h6" component="h2">
              Edge {this.props.identifier}
            </Typography>
            <Typography color="textSecondary">
              172.16.100.{this.props.identifier}
            </Typography>
            <br />
            <Grid container justifyContent="center" spacing={1}>
                {this.state.available === null ? (
                  <Chip
                    style={{ backgroundColor: orange[200] }}
                    size="medium"
                    label="Pending"
                    icon={<DataUsageIcon />}
                  />
                ) : this.state.available ? (
                  <Chip
                    style={{ backgroundColor: green[200] }}
                    size="medium"
                    label="Available"
                    icon={<DoneIcon />}
                  />
                ) : (
                  <Chip
                    style={{ backgroundColor: red[200] }}
                    size="medium"
                    label="Unavailable"
                    icon={<ErrorIcon />}
                  />
                )}
              </Grid>
          </CardContent>
          {this.state.available ? (
            <CardActions disableSpacing>
              <IconButton aria-label="Power off">
                <IoIosPower />
              </IconButton>
              <IconButton aria-label="Stress">
                <IoIosFlash />
              </IconButton>
              <IconButton aria-label="Stress">
                <IoIosLogIn />
              </IconButton>
              <Grid container justifyContent="flex-end">
                <IconButton aria-label="show more">
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
            </CardActions>
          ) : (
            ""
          )}
        </Card>
      </Grid>
    );
  }
}
