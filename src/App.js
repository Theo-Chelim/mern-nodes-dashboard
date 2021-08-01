import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Navigation from "./Navigation";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navigation />

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <Container>
              <Box>
                {[...new Array(160)]
                  .map(
                    () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                  )
                  .join("\n")}
              </Box>
            </Container>
          </Route>
          <Route path="/about">About</Route>
          <Route path="/test">Test</Route>
        </Switch>

      </Router>
    );
  }
}
