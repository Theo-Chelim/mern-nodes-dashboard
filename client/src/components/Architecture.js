import React, { Component } from "react";

import Graph from "react-graph-vis";

import { Box, Grid, Card } from "@material-ui/core";

import architecture_image from "../images/architecture.jpg";

export default class Architecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 5,
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
          { id: 1004, label: "SUMO", color: "#41e0c9" },
          { id: 1005, label: "Dashboard", color: "#41e0c9" },
          { id: 1006, label: "Secure storage module", color: "#41e0c9" },
          { id: 1007, label: "Orchestration algorithms", color: "#41e0c9" },

          /*           { id: 2, label: "Node 2", color: "#e09c41" },
          { id: 4, label: "Node 4", color: "#7be041" },
          { id: 5, label: "Node 5", color: "#41e0c9" }, */
        ],
        edges: [
          { from: 0, to: 1, arrows: { to: { scaleFactor: 0 } } },
          { from: 0, to: 2, arrows: { to: { scaleFactor: 0 } } },
          { from: 0, to: 3, arrows: { to: { scaleFactor: 0 } } },
          { from: 0, to: 4, arrows: { to: { scaleFactor: 0 } } },
          { from: 0, to: 5, arrows: { to: { scaleFactor: 0 } } },
          { from: 0, to: 6, arrows: { to: { scaleFactor: 0 } } },
          { from: 0, to: 7, arrows: { to: { scaleFactor: 0 } } },
          { from: 0, to: 8, arrows: { to: { scaleFactor: 0 } } },
          { from: 0, to: 9, arrows: { to: { scaleFactor: 0 } } },
          { from: 0, to: 10, arrows: { to: { scaleFactor: 0 } } },
          {
            from: 0,
            to: 1000,
            length: 600,
            arrows: { to: { scaleFactor: 0 } },
          },
          {
            from: 1000,
            to: 1001,
            dashes: true,
            length: 300,
            arrows: { to: { scaleFactor: 0 } },
          },
          {
            from: 1000,
            to: 1002,
            dashes: true,
            length: 300,
            arrows: { to: { scaleFactor: 0 } },
          },
          {
            from: 1000,
            to: 1003,
            dashes: true,
            length: 300,
            arrows: { to: { scaleFactor: 0 } },
          },
          {
            from: 1000,
            to: 1004,
            dashes: true,
            length: 300,
            arrows: { to: { scaleFactor: 0 } },
          },
          {
            from: 1000,
            to: 1005,
            dashes: true,
            length: 300,
            arrows: { to: { scaleFactor: 0 } },
          },
          {
            from: 1000,
            to: 1006,
            dashes: true,
            length: 300,
            arrows: { to: { scaleFactor: 0 } },
          },
          {
            from: 1000,
            to: 1007,
            dashes: true,
            length: 300,
            arrows: { to: { scaleFactor: 0 } },
          },
        ],
        events: {
          select: ({ nodes, edges }) => {
            console.log("Selected nodes:");
            console.log(nodes);
            console.log("Selected edges:");
            console.log(edges);
            alert("Selected node: " + nodes);
          },
        },
      },
    };

    [...Array(120).keys()].map((i) => {
      this.state.graph.nodes = [
        ...this.state.graph.nodes,
        { id: i + 11, label: "E" + (i + 11), color: "#7be041" },
      ];
      this.state.graph.edges = [
        ...this.state.graph.edges,
        {
          to: 1000,
          from: i + 11,
          length: 200,
          arrows: { to: { scaleFactor: 0 } },
        },
      ];
    });
  }

  render() {
    return (
      <Box>
        <h1 className={"fontTitle"}> Network architecture </h1>
        <Grid container justifyContent="center">
          <Graph
            graph={this.state.graph}
            options={this.state.options}
            events={this.state.events}
            style={{ height: "100vh" }}
          />
          {/*             <img src={architecture_image} alt="architecture IONet" />
           */}
        </Grid>
      </Box>
    );
  }
}
