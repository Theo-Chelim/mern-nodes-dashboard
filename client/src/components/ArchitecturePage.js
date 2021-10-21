import React, { Component } from "react";

import Graph from "react-graph-vis";

import { Box, Grid } from "@material-ui/core";

export default class Architecture extends Component {
  constructor(props) {
    super(props);
    const arrow_conf = { to: { scaleFactor: 0 } };
    this.state = {
      options: {
        autoResize: true,
        height: "100%",
        width: "100%",
      },
      ready: false,
      graph: {
        nodes: [
          { id: 0, label: "NUC Gateway", color: "#e0df41" },
          { id: 1, label: "RPi1", color: "#e09c41" },
          { id: 2, label: "RPi2", color: "#e09c41" },
          { id: 3, label: "RPi3", color: "#e09c41" },
          { id: 4, label: "RPi4", color: "#e09c41" },
          { id: 5, label: "RPi5", color: "#e09c41" },
          { id: 6, label: "RPi6", color: "#e09c41" },
          { id: 7, label: "RPi7", color: "#e09c41" },
          { id: 8, label: "RPi8", color: "#e09c41" },
          { id: 9, label: "RPi9", color: "#e09c41" },
          { id: 10, label: "RPi10", color: "#e09c41" },
          { id: 1000, label: "IONet Server", color: "#e0df41" },
          { id: 1001, label: "Kibana", color: "#41e0c9" },
          { id: 1002, label: "Elasticsearch", color: "#41e0c9" },
          { id: 1003, label: "MongoDB", color: "#41e0c9" },
          { id: 1004, label: "Backend", color: "#41e0c9" },
          { id: 1005, label: "Dashboard", color: "#41e0c9" },
          { id: 1006, label: "Secure storage module", color: "#41e0c9" },
          { id: 1007, label: "Orchestration algorithms", color: "#41e0c9" },
        ],
        edges: [
          { from: 0, to: 1, arrows: arrow_conf },
          { from: 0, to: 2, arrows: arrow_conf },
          { from: 0, to: 3, arrows: arrow_conf },
          { from: 0, to: 4, arrows: arrow_conf },
          { from: 0, to: 5, arrows: arrow_conf },
          { from: 0, to: 6, arrows: arrow_conf },
          { from: 0, to: 7, arrows: arrow_conf },
          { from: 0, to: 8, arrows: arrow_conf },
          { from: 0, to: 9, arrows: arrow_conf },
          { from: 0, to: 10, arrows: arrow_conf },
          {
            from: 0,
            to: 1000,
            length: 600,
            arrows: arrow_conf,
          },
          {
            from: 1000,
            to: 1001,
            dashes: true,
            length: 300,
            arrows: arrow_conf,
          },
          {
            from: 1000,
            to: 1002,
            dashes: true,
            length: 300,
            arrows: arrow_conf,
          },
          {
            from: 1000,
            to: 1003,
            dashes: true,
            length: 300,
            arrows: arrow_conf,
          },
          {
            from: 1000,
            to: 1004,
            dashes: true,
            length: 300,
            arrows: arrow_conf,
          },
          {
            from: 1000,
            to: 1005,
            dashes: true,
            length: 300,
            arrows: arrow_conf,
          },
          {
            from: 1000,
            to: 1006,
            dashes: true,
            length: 300,
            arrows: arrow_conf,
          },
          {
            from: 1000,
            to: 1007,
            dashes: true,
            length: 300,
            arrows: arrow_conf,
          },
        ],
        events: {
          select: ({ nodes, edges }) => {
            console.log("Selected nodes:");
            console.log(nodes);
            console.log("Selected edges:");
            console.log(edges);
          },
        },
      },
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(process.env.REACT_APP_BASE_URL + "/api/edge/")
      .then((res) => res.json())
      .then(
        (result) => {
          let nodes = [];
          let edges = [];
          result.forEach((edge) => {
            nodes = [
              ...nodes,
              { id: edge.id, label: "E" + edge.id, color: "#7be041" },
            ];
            edges = [
              ...edges,
              {
                to: 1000,
                from: edge.id,
                length: 200,
                arrows: { to: { scaleFactor: 0 } },
              },
            ];
          });

          this.setState({
            graph: {
              ...this.state.graph,
              nodes: [...this.state.graph.nodes, ...nodes],
              edges: [...this.state.graph.edges, ...edges],
            },
          });
          this.setState({ ready: true });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <Box>
        <h1 className={"fontTitle"}> IONet architecture </h1>
        <Grid container justifyContent="center">
          {this.state.ready ? (
            <Box
              sx={{ border: "dashed" }}
              border={2}
              borderColor="grey.500"
              borderRadius={5}
              style={{ padding: 0 }}
              width="100%"
              height="80vh"
            >
              <Graph
                graph={this.state.graph}
                options={this.state.options}
                events={this.state.events}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          ) : (
            "Loading network configuration..."
          )}
        </Grid>
      </Box>
    );
  }
}
